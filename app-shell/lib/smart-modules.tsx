"use client"

import { createInstance } from "@module-federation/enhanced/runtime";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as JSXRuntime from 'react/jsx-runtime';

const v = React.version;
const cfg = { singleton: true, requiredVersion: false as const };

export const rastreabilidade = createInstance({
    name: "smart-modules",
    remotes: [
        {
            type: 'module',
            name: 'smart40_g4',
            alias: "rastreabilidade-qrcode",
            entry: 'https://rastreabilidade-qrcode.vercel.app/remoteEntry.js',
        }
    ],
    shared: {
        react: { version: v, lib: () => React, shareConfig: cfg },
        'react-dom': { version: v, lib: () => ReactDOM, shareConfig: cfg },
        'react-dom/client': { version: v, lib: () => ReactDOMClient, shareConfig: cfg },
        'react/jsx-runtime': { version: v, lib: () => JSXRuntime, shareConfig: cfg },
    },
});


export const expedicao = createInstance({
    name: "smart-modules",
    remotes: [
        {
            type: 'module',
            name: 'smart40_g5',
            alias: "rastreabilidade-qrcode",
            entry: 'https://expedicao-nu.vercel.app/remoteEntry.js',
        }
    ],
    shared: {
        react: { version: v, lib: () => React, shareConfig: cfg },
        'react-dom': { version: v, lib: () => ReactDOM, shareConfig: cfg },
        'react-dom/client': { version: v, lib: () => ReactDOMClient, shareConfig: cfg },
        'react/jsx-runtime': { version: v, lib: () => JSXRuntime, shareConfig: cfg },
    },
});
