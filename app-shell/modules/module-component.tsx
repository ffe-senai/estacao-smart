"use client"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { MODULE_NAME } from '@/lib/smart-modules';
import { ModuleFederation } from '@module-federation/enhanced/runtime';
import { FrownIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const ModuleLoadingError = () => (
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

const LoadingModule = () => (
    <section className="w-full h-full flex items-center justify-center">
        <Spinner />
    </section>
);

const Module = (mf: ModuleFederation) => dynamic(
    () => mf.loadRemote<{ default: React.ComponentType }>(MODULE_NAME).then((module) => {

        if (!module)
            throw new Error(`Absent Module: ${module}`);

        return module!.default;
    }).catch((error: Error) => {
        console.error("Error loading remote module:", error);

        return ModuleLoadingError;
    }),
    {
        ssr: false,
        loading: LoadingModule,
    }
);

export { Module };