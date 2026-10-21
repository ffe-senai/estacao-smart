"use client";
import React from "react";
import { createRemoteAppComponent } from "@module-federation/modern-js-v3/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { FrownIcon } from "lucide-react";
import { loadRemote } from "@module-federation/enhanced/runtime";

const ModuleLoadingError = () => (
    <section className="w-full h-full flex items-center justify-center px-6">
        <Alert variant="destructive">
            <FrownIcon />
            <AlertTitle>Error Loading Remote Module</AlertTitle>
            <AlertDescription>
                There was an error loading the remote module.<br />
                <small>Please check the console for more details.</small>
            </AlertDescription>
        </Alert>
    </section>
);

const LoadingModule = () => (
    <section className="w-full h-full flex items-center justify-center">
        <Spinner className="size-8" />
    </section>
);

/**
 * Native Modern.js v3 Bridge wrapper
 */
export const Module = (remote: string) => {
    return createRemoteAppComponent({
        loader: () => loadRemote(remote + "/teste"),
        fallback: ModuleLoadingError,
        loading: <ModuleLoadingError />,
    });
};