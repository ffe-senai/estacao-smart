
"use client"
import * as mf from "@module-federation/enhanced/runtime";


const createInstance = (name: string, entry: string) => mf.createInstance({
    name,
    remotes: [
        {
            type: 'module',
            name: 'smart',
            entry,
        }
    ],
});


export default createInstance;
export { createInstance };