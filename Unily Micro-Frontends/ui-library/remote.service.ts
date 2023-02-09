import { loadRemoteModule } from '@angular-architects/module-federation';
import { Provider } from '@angular/core';

const remotes = await import('./remotes');

interface RemoteNgModule {
    getProviders: (token: any) => (Provider)[];
    getService: <T>(token: any) => T;
}

export const importModule = async (remotePath: string): Promise<RemoteNgModule> => {
    const slashIndex = remotePath.indexOf('/');
    const moduleName = slashIndex >= 0 ? remotePath.substring(0, slashIndex) : remotePath;
    const exposedModule = slashIndex >= 0 ? `.${remotePath.substring(slashIndex)}` : './Public';
    
    try {
        const remoteModule = await loadRemoteModule({
            type: 'module',
            remoteEntry: remotes[moduleName as keyof typeof remotes] as string,
            exposedModule
        });

        return remoteModule.default as RemoteNgModule;
    } catch (err) {
        console.error(`Failed to load remote module from path: ${remotePath}. Error: ${err}`);

        return {} as RemoteNgModule;
    }
};