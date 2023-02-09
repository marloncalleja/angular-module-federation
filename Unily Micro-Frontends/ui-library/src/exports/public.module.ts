import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonTwoInterceptor } from 'src/button/button-two.interceptor';
import { ButtonComponent } from 'src/button/button.component';
import { ButtonInterceptor } from 'src/button/button.interceptor';
import { ButtonService } from 'src/button/button.service';
import { IncrementService } from 'src/button/increment.service';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        ButtonComponent
    ],
    exports: [
        ButtonComponent
    ],
    providers: [
        {
            provide: 'ButtonService',
            useClass: ButtonService,
            deps: [IncrementService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ButtonInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ButtonTwoInterceptor,
            multi: true
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class PublicModule implements DoBootstrap {
    constructor(private readonly injector: Injector) {}

    ngDoBootstrap(): void {
        const directives = (this.constructor as any).ɵmod.exports;
        directives.forEach((directive: any) => {
            if (directive.ɵcmp) {
                directive.ɵcmp.selectors.forEach((selector: string) => {
                    console.log(selector);
                    const el = createCustomElement(directive, {injector: this.injector});
                    customElements.define(selector, el);
                });
            }
        });
    }

    public getProviders(token: any): any[] {
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