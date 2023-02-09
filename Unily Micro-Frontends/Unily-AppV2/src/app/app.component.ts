import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BFCacheService } from '@core-services/bfcache/bfcahce.service';
import { NoConnectionService } from '@core-services/no-connection/no-connection.service';
import { CounterService } from '@mf-types/oldUiLibrary/_types/button/counter.service';
import { ButtonService } from '@mf-types/uiLibrary/_types/src/button/button.service.d';
import { ToastService } from '@services/toast/toast.service';
import { ToastContainerDirective } from 'ngx-toastr';
import { importModule } from '../../../../remote.service';

const oldUiLibrary = await importModule('oldUiLibrary');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    @ViewChild(ToastContainerDirective, { static: true })
    public readonly toastContainer: ToastContainerDirective;

    public connectionAlive = true;

    public pokemonStats = '';

    private readonly counterService: CounterService;

    public oldClickCount = '0';

    constructor(
        bfCacheService: BFCacheService,
        noConnectionService: NoConnectionService,
        private readonly toastService: ToastService,
        // Inject provided services just like you would any other tokenised service
        @Inject('ButtonService') private readonly buttonService: ButtonService,
        private readonly httpClient: HttpClient
    ) {
        noConnectionService.subscribe(connectionAlive => {
            this.connectionAlive = connectionAlive;
        });

        bfCacheService.disableBFCache();

        // Or get a service from a remote module directly
        this.counterService = oldUiLibrary.getService('CounterService');
        this.counterService.counterAction$.subscribe({ next: counter => { this.oldClickCount = counter.toString(); } });
    }

    public ngOnInit(): void {
        this.toastService.registerToastContainer(this.toastContainer);
    }

    public async onNewClick(): Promise<void> {
        this.buttonService.incrementClickCount();

        const result = await this.httpClient.get('https://pokeapi.co/api/v2/pokemon/pikachu').toPromise();
        this.pokemonStats = (result as any).name as string;
    }

    public async onOldClick(): Promise<void> {
        this.counterService.incrementCounter();
        const result = await this.httpClient.get('https://pokeapi.co/api/v2/pokemon/charizard').toPromise();
        this.pokemonStats = (result as any).name as string;
    }

    public getNewClickCount(): string {
        return this.buttonService.clickCount.toString();
    }

    public getOldClickCount(): string {
        return this.counterService.counter.toString();
    }
}
