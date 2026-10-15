"use client"
import dynamic from 'next/dynamic';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FrownIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import createInstance from '@/lib/module-federation';

// eslint-disable-next-line import/no-anonymous-default-export
export default (name: string, entry: string, remote: string = "smart") => {
    const Module = () => dynamic(
        () => createInstance(name, entry).loadRemote<{ default: React.ComponentType }>(remote).then((module) => {
            console.log("Remote Module Exports:", module);

            return module!.default;

        }).catch((error: Error) => {
            console.error("Error loading remote module:", error);

            const LoadingError = () => (
                <section className="w-full h-full flex items-center justify-center">
                    <Alert variant="destructive">
                        <FrownIcon />
                        <AlertTitle>Error Loading Remote Module</AlertTitle>
                        <AlertDescription>
                            There was an error loading the remote module. Please check the console for more details.
                        </AlertDescription>
                    </Alert>
                </section>
            );
            return LoadingError;
        }),
        {
            ssr: false,
            loading: () =>
                <section className="w-full h-full flex items-center justify-center">
                    <Spinner />
                </section>
            ,
        }
    )
    Module.displayName = `RemoteModule-${name}`;
    return Module;
}