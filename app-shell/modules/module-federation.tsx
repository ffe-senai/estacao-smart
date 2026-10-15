"use client"
import dynamic from 'next/dynamic';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FrownIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import createInstance from '@/lib/module-federation';

export default (name: string, entry: string, remote: string = "smart") => dynamic(
    () => createInstance(name, entry).loadRemote<{ default: React.ComponentType }>(remote).then((module) => {
        console.log("Remote Module Exports:", module);

        return module!.default;

    }).catch((error: any) => {
        console.error("Error loading remote module:", error);

        return () => (
            <section className="w-full h-full flex items-center justify-center">
                <Alert variant="destructive">
                    <FrownIcon/>
                    <AlertTitle>Error Loading Remote Module</AlertTitle>
                    <AlertDescription>
                        There was an error loading the remote module. Please check the console for more details.
                    </AlertDescription>
                </Alert>
            </section>
        );
    }),
    {
        ssr: false,
        loading: () => 
            <section className="w-full h-full flex items-center justify-center">
                <Spinner/>
            </section>
        ,
    }
);