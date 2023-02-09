import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { CounterService } from 'src/button/counter.service';
import { OldButtonComponent } from 'src/button/old-button.component';

@NgModule({
    imports: [BrowserModule],
    exports: [OldButtonComponent],
    declarations: [OldButtonComponent],
    providers: [
        {
            provide: 'CounterService',
            useClass: CounterService
        }
    ],
})
export default class PublicModule implements DoBootstrap {
    constructor(private readonly injector: Injector) {}

    ngDoBootstrap(): void {
        const directives = (this.constructor as any).ɵmod.exports;
        directives.forEach((directive: any) => {
            if (directive.ɵcmp) {
                directive.ɵcmp.selectors.forEach((selector: string) => {
                    const el = createCustomElement(directive, {injector: this.injector});
                    customElements.define(selector, el);
                });
            }
        });
    }

    public getProviders(token: any) {
        let services = this.injector.get(token);

        const multi = Array.isArray(services);
        if (!multi) {
            services = [services];
        }
    
        return services.map((service: any) => {
            return {
                provide: token,
                useFactory: () => service,
                multi
            };
        });
    }

    public getService(token: any): any {
        return (this.getProviders(token)[0] as any).useFactory();
    }
}
