import { DoBootstrap, Injector } from '@angular/core';
export default class PublicModule implements DoBootstrap {
    private readonly injector;
    constructor(injector: Injector);
    ngDoBootstrap(): void;
    getProviders(token: any): any;
    getService(token: any): any;
}
