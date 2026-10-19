"use client"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { MODULE_NAME } from '@/lib/smart-modules';
import { ModuleFederation } from '@module-federation/enhanced/runtime';
import { FrownIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

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
        <Spinner className='size-8' />
    </section>
);

const Module = (mf: ModuleFederation, id: string = MODULE_NAME) => dynamic(
    () => mf.loadRemote<{ default: React.ComponentType }>(id).then((module) => {

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