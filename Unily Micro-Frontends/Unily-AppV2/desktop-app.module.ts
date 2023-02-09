import { Overlay } from '@angular/cdk/overlay';
import { PlatformLocation } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule, NgZone } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, UrlSerializer } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppComponent } from '@components/app/app.component';
import { ThemeUpgradeComponent } from '@components/theme-upgrade.component';
import { UnilySpaDesktopComponent } from '@components/unily-spa-desktop.component';
import { Ng1DialogService as Ng1DialogBaseService } from '@core-downgraded-services/ng1-dialog/ng1-dialog.service';
import { EmbeddedContentFactory } from '@core-factories/embedded-content.factory';
import { confirmationDialogOverlayServiceFactory } from '@core-factories/overlay.service.factory';
import { BaseAppModule } from '@core-modules/base-app.module';
import { PipesModule } from '@core-pipes/pipes.module';
import { AppearanceRefresherService } from '@core-services/appearance-refresher/appearance-refresher.service';
import { BaseConfirmationDialogService } from '@core-services/confirmation-dialog/base-confirmation-dialog.service';
import { DIALOG_SERVICE_TOKEN, WIZARD_DIALOG_SERVICE_TOKEN } from '@core-services/dialog/dialog-injection-tokens';
import { NavigationEventBaseService } from '@core-services/event/navigation-event/navigation-event-base.service';
import { NavigationEventService } from '@core-services/event/navigation-event/navigation-event.service';
import { UserInteractionEventService } from '@core-services/event/user-interaction-event/user-interaction-event.service';
import { InitialLoadService } from '@core-services/initial-load/initial-load.service';
import { InitialMarkupTypes } from '@core-services/initial-load/initial-load.types';
import { CONFIRMATION_DIALOG_OVERLAY_SERVICE_TOKEN, DIALOG_OVERLAY_SERVICE_TOKEN, WIZARD_OVERLAY_SERVICE_TOKEN } from '@core-services/overlay/overlay-injection-tokens';
import { SPA_RESOLVING } from '@core-services/spa/spa-injection-tokens';
import { SpaLifeCycleEventsService } from '@core-services/spa/spa-lifecycle-events.service';
import { SpaService } from '@core-services/spa/spa.service';
import { TOAST_SERVICE_TOKEN } from '@core-services/toast/toast-injection-token';
import { TrackedNavigationService } from '@core-services/tracked-navigation/tracked-navigation.service';
import UnilyUrlSerializer from '@core-services/url/unily-url-serializer.service';
import { UserService } from '@core-services/user/user.service';
import { locationProvider, LocationToken, windowProvider, WindowToken } from '@core-services/window';
import { WizardService } from '@core-services/wizard/wizard.service';
import { DesktopCoreModule } from '@modules/desktop-core.module';
import { ErrorHandlingModule } from '@modules/error-handling.module';
import { ConfirmationDialogService } from '@services/confirmation-dialog/confirmation-dialog.service';
import { DialogService } from '@services/dialog/dialog.service';
import { PopupService } from '@services/popup/popup.service';
import { DesktopSpaService } from '@services/spa/desktop-spa.service';
import { DesktopSpaLifeCycleEventsService } from '@services/spa/spa-life-cycle-events.desktop.service';
import { ToastService } from '@services/toast/toast.service';
import { WizardDialogService } from '@services/wizard/wizard-dialog.service';
import { UnilyApiDowngradeModule } from '@unily-apis/downgrade/modules/unily-api-downgrade.module';
import { UdlComponents } from '@unily-ui-library/components/udl-components';
import { Ng1DialogService } from '@unily/downgraded-services/ng1-dialog/ng1-dialog.service';
import { Ng1AwardGamificationService } from '@unily/downgraded-services/ng1-gamification/ng1-award-gamification.service';
import { Ng1InjectableModule } from '@unily/downgraded-services/ng1-injectable.module';
import { DesktopEmbeddedContentFactory } from '@unily/factories/desktop-embedded-content.factory';
import { DesktopRoutingModule } from '@unily/modules/desktop-routing.module';
import { DesktopReuseStrategy } from '@unily/route-reuse-strategy';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ToastContainerModule, ToastrModule, ToastrService } from 'ngx-toastr';
import { importModule } from '../../../remote.service';
import { CustomDomEventsPlugin } from './custom-dom-events-plugin';

// Asynchronously import remote modules using the importModule helper
const uiLibrary = await importModule('uiLibrary');
const oldUiLibrary = await importModule('oldUiLibrary');

@NgModule({
    declarations: [
        AppComponent,
        ThemeUpgradeComponent,
        UnilySpaDesktopComponent
    ],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    imports: [
        UnilyApiDowngradeModule,
        Ng1InjectableModule,
        ErrorHandlingModule,
        DesktopCoreModule,
        DesktopRoutingModule,
        UpgradeModule,
        HttpClientModule,
        PipesModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ToastContainerModule,
        MalihuScrollbarModule.forRoot()
    ],
    providers: [
        /* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
        {
            provide: '$scope',
            useFactory: i => i.get('$rootScope'),
            deps: ['$injector']
        },
        {
            provide: 'angularModernDependencyResolver',
            useFactory: i => i.get('angularModernDependencyResolver'),
            deps: ['$injector']
        },
        /* eslint-enable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
        {
            provide: RouteReuseStrategy,
            useClass: DesktopReuseStrategy
        },
        {
            provide: WindowToken,
            useFactory: windowProvider
        },
        {
            provide: LocationToken,
            useFactory: locationProvider
        },
        {
            provide: EmbeddedContentFactory,
            useClass: DesktopEmbeddedContentFactory
        },
        {
            provide: SpaLifeCycleEventsService,
            useExisting: DesktopSpaLifeCycleEventsService
        },
        {
            provide: SpaService,
            useClass: DesktopSpaService
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: CustomDomEventsPlugin,
            multi: true
        },
        {
            provide: NavigationEventBaseService,
            useClass: NavigationEventService
        },
        {
            provide: DIALOG_SERVICE_TOKEN,
            useClass: DialogService,
            deps: [DIALOG_OVERLAY_SERVICE_TOKEN]
        },
        {
            provide: WIZARD_DIALOG_SERVICE_TOKEN,
            useClass: WizardDialogService,
            deps: [WIZARD_OVERLAY_SERVICE_TOKEN]
        },
        {
            provide: CONFIRMATION_DIALOG_OVERLAY_SERVICE_TOKEN,
            useFactory: confirmationDialogOverlayServiceFactory,
            deps: [Overlay, Injector, NgZone, PlatformLocation]
        },
        {
            provide: Ng1DialogBaseService,
            useClass: Ng1DialogService
        },
        {
            provide: BaseConfirmationDialogService,
            useClass: ConfirmationDialogService
        },
        {
            provide: TOAST_SERVICE_TOKEN,
            useClass: ToastService,
            deps: [ToastrService, NgZone, UserService]
        },
        {
            provide: UrlSerializer,
            useClass: UnilyUrlSerializer
        },
        Ng1DialogService,
        DialogService,
        PopupService,
        WizardDialogService,
        WizardService,
        ConfirmationDialogService,
        ToastService,
        Ng1AwardGamificationService,
        // Provide services from remote modules using the getProviders helper
        uiLibrary.getProviders('ButtonService'),
        uiLibrary.getProviders(HTTP_INTERCEPTORS),
        oldUiLibrary.getProviders('CounterService'),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DesktopAppModule extends BaseAppModule implements DoBootstrap {
    constructor(
        upgrade: UpgradeModule,
        initialLoadService: InitialLoadService,
        embeddedContentFactory: EmbeddedContentFactory,
        appearanceRefresherService: AppearanceRefresherService,
        userInteractionEventService: UserInteractionEventService,
        trackedNavigationService: TrackedNavigationService,
        injector: Injector,
        private readonly popupService: PopupService,
        ngZone: NgZone) {
        super(
            upgrade,
            initialLoadService,
            embeddedContentFactory,
            appearanceRefresherService,
            userInteractionEventService,
            trackedNavigationService,
            injector,
            ngZone);
    }

    public async ngDoBootstrap(appRef: ApplicationRef): Promise<void> {
        const bootstrapMarkupTypes = [
            InitialMarkupTypes.Header,
            InitialMarkupTypes.SiteNav,
            InitialMarkupTypes.Spa,
            InitialMarkupTypes.Footer
        ];

        await this.init(bootstrapMarkupTypes);
        this.popupService.Init();
        appRef.bootstrap(AppComponent);
        appRef.bootstrap(ThemeUpgradeComponent);

        UdlComponents.forEach(component => {
            const el = createCustomElement(component.component, { injector: DesktopAppModule.injector });
            customElements.define(component.selector, el);
        });
    }
}
