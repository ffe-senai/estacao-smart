"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ModuleFederation } from "@module-federation/enhanced/runtime";

/**
 * Isola os módulos remotos em um Shadow DOM.
 *
 * CSS: o host faz patch de head.appendChild/insertBefore (como o qiankun). O <link> ou
 * <style> de um módulo não entra no <head>; vira um <style> no shadow root do módulo.
 * Por ser um nó do shadow root, acompanha o painel quando o Dockview o move para um popout.
 *
 * URLs: módulos buildados com base "/" geram caminhos como "/assets/x.png", que o
 * navegador resolve contra o shell. O host os reescreve para a origem do módulo.
 */

type ModuleStyles = { styles: HTMLStyleElement[]; roots: Set<ShadowRoot> };
const modules = new Map<string, ModuleStyles>();
const moduleOf = (origin: string) => {
    if (!modules.has(origin)) modules.set(origin, { styles: [], roots: new Set() });
    return modules.get(origin)!;
};
const loaded = new Set<string>();

const ROOT_RELATIVE = /(^|,\s*)\/(?!\/)/g;
const URL_ATTRIBUTES = ["src", "srcset", "poster"];

const toShadowCss = (css: string, base: URL) =>
    css
        .replace(/(^|[\s,{}>~+])(:root|html|body)(?=[\s,{.:[>~+])/g, "$1:host")
        .replace(/url\((['"]?)([^'")]+)\1\)/g, (match, quote, path) =>
            /^(data:|blob:|https?:|\/\/|#)/.test(path) ? match : `url(${quote}${new URL(path, base).href}${quote})`,
        );

/**
 * Módulo dono do recurso: pela origem da URL ou, sem URL ou com URL apontando para o
 * shell (base "/"), pelo código que chamou o appendChild (stack).
 */
const ownerOf = (url?: URL) => {
    if (url && modules.has(url.origin)) return url.origin;
    if (url && url.origin !== location.origin) return;
    const stack = new Error().stack ?? "";
    return [...modules.keys()].find((origin) => stack.includes(origin));
};

/** Um <style> só pode estar em um shadow root: o original vai para o primeiro, os demais recebem cópias. */
const attach = (root: ShadowRoot, style: HTMLStyleElement) =>
    root.append(style.isConnected ? style.cloneNode(true) : style);

const addStyle = (origin: string, style: HTMLStyleElement) => {
    const { styles, roots } = moduleOf(origin);
    styles.push(style);
    roots.forEach((root) => attach(root, style));
};

/** <link> (Vite prod, mini-css-extract): o CSS é baixado e vira um <style> do módulo. */
const redirectLink = (node: HTMLLinkElement) => {
    const href = new URL(node.href);
    const origin = ownerOf(href);
    if (!origin) return false;

    const url = new URL(href.pathname + href.search, origin);
    const done = () => node.dispatchEvent(new Event("load")); // o preload do Vite espera o "load"
    if (loaded.has(url.href)) return done(), true;
    loaded.add(url.href);
    fetch(url)
        .then((res) => res.text())
        .then((css) => {
            const style = document.createElement("style");
            style.textContent = toShadowCss(css, url);
            addStyle(origin, style);
        })
        .finally(done);
    return true;
};

/**
 * <style> (Vite dev, style-loader, emotion, styled-components): o próprio nó é movido,
 * para que insertRule/textContent posteriores continuem funcionando.
 */
const redirectStyle = (node: HTMLStyleElement) => {
    const origin = ownerOf();
    if (!origin) return false;
    node.textContent = toShadowCss(node.textContent ?? "", new URL(origin));
    addStyle(origin, node);
    return true;
};

const redirect = (node: Node) => {
    if (node instanceof HTMLLinkElement && node.rel === "stylesheet") return redirectLink(node);
    if (node instanceof HTMLStyleElement) return redirectStyle(node);
    return false;
};

const head = document.head;
const appendChild = head.appendChild.bind(head);
const insertBefore = head.insertBefore.bind(head);
head.appendChild = <T extends Node>(node: T): T => (redirect(node) ? node : appendChild(node));
head.insertBefore = <T extends Node>(node: T, child: Node | null): T => (redirect(node) ? node : insertBefore(node, child));

const rewriteUrls = (element: Element, origin: string) => {
    for (const name of URL_ATTRIBUTES) {
        const value = element.getAttribute(name);
        if (!value) continue;
        const fixed = value.replace(ROOT_RELATIVE, `$1${origin}/`);
        if (fixed !== value) element.setAttribute(name, fixed);
    }
};

/**
 * <use href="/icons.svg#id">: o navegador não carrega <use> de outra origem (nem com CORS).
 * Como o svg4everybody, o sprite é embutido no shadow root e o href vira só "#id".
 */
const sprites = new Map<string, Promise<string>>();

const inlineSprite = (use: SVGUseElement, origin: string) => {
    const value = use.getAttribute("href") ?? use.getAttribute("xlink:href");
    if (!value || value.startsWith("#")) return;
    const url = new URL(value, `${origin}/`);
    const file = url.href.replace(url.hash, "");
    use.removeAttribute("xlink:href");
    use.setAttribute("href", url.hash);

    const root = use.getRootNode() as ShadowRoot;
    if (!sprites.has(file)) sprites.set(file, fetch(file).then((res) => res.text()));
    sprites.get(file)!.then((svg) => {
        if (root.querySelector(`[data-sprite="${CSS.escape(file)}"]`)) return;
        const holder = document.createElement("div");
        holder.hidden = true;
        holder.dataset.sprite = file;
        holder.innerHTML = svg;
        root.append(holder);
    });
};

const rewrite = (element: Element, origin: string) => {
    if (element instanceof SVGUseElement) inlineSprite(element, origin);
    rewriteUrls(element, origin);
};

const watchUrls = (root: ShadowRoot, origin: string) => {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.target instanceof Element) rewrite(mutation.target, origin);
            mutation.addedNodes.forEach((node) => {
                if (!(node instanceof Element)) return;
                rewrite(node, origin);
                node.querySelectorAll("*").forEach((el) => rewrite(el, origin));
            });
        }
    });
    observer.observe(root, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: [...URL_ATTRIBUTES, "href", "xlink:href"],
    });
    return () => observer.disconnect();
};

/** Registra o módulo da instância e retorna a origem do entry dele. */
export const registerModule = (mf: ModuleFederation) => {
    const [remote] = mf.options.remotes;
    if (!remote || !("entry" in remote) || !remote.entry) return;
    const { origin } = new URL(remote.entry, location.href);
    if (origin === location.origin) return; // entry vazio é normalizado pelo runtime para a origem do shell
    moduleOf(origin);
    return origin;
};

const LightDom = createContext<HTMLElement | null>(null);

/**
 * Renderiza no light DOM do container (exibido pelo <slot>), com os estilos do shell.
 *
 * Uma âncora fica no lugar original: o bridge renderiza o loading dentro do container do
 * módulo, que o root do módulo limpa ao montar. Quando a âncora sai do DOM, o conteúdo some.
 */
export const InLightDom = ({ children }: { children: React.ReactNode }) => {
    const host = useContext(LightDom);
    const [anchor, setAnchor] = useState<HTMLSpanElement | null>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!anchor?.parentNode) return;
        const observer = new MutationObserver(() => setVisible(anchor.isConnected));
        observer.observe(anchor.parentNode, { childList: true });
        return () => observer.disconnect();
    }, [anchor]);

    if (!host) return children;
    return (
        <>
            <span ref={setAnchor} hidden />
            {visible && createPortal(children, host)}
        </>
    );
};

export const ShadowContainer = ({ origin, children }: { origin?: string; children: React.ReactNode }) => {
    const [host, setHost] = useState<HTMLDivElement | null>(null);

    const ref = useCallback(
        (element: HTMLDivElement | null) => {
            if (!element) return;
            const shadow = element.shadowRoot ?? element.attachShadow({ mode: "open" });
            if (!shadow.querySelector("slot")) shadow.append(document.createElement("slot"));
            setHost(element);
            if (!origin) return;
            const { styles, roots } = moduleOf(origin);
            styles.forEach((style) => attach(shadow, style));
            roots.add(shadow);
            const unwatch = watchUrls(shadow, origin);
            return () => {
                roots.delete(shadow);
                unwatch();
            };
        },
        [origin],
    );

    return (
        <div ref={ref} className="w-full h-full">
            {host && <LightDom.Provider value={host}>{createPortal(children, host.shadowRoot!)}</LightDom.Provider>}
        </div>
    );
};
