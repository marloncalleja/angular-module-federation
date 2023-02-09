import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { CounterService } from '@mf-types/oldUiLibrary/_types/button/counter.service.d';
import { importModule } from 'remote.service';

const oldUiLibrary = await importModule('oldUiLibrary/Public');

@Component({
    selector: 'ui-button',
    templateUrl: 'button.component.html',
    styleUrls: ['button.component.less'],
    providers: [oldUiLibrary.getProviders('CounterService')]
})

export class ButtonComponent implements OnInit {
    @Output() clickEvent = new EventEmitter();
    @Input() text!: string;

    public oldText = '0';

    constructor(
        @Inject('CounterService') public counterService: CounterService,
        private readonly cd: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.counterService.counterAction$.subscribe({
            next: (counter: string) => {
                console.log(counter);
                this.oldText = counter;
                this.cd.detectChanges();
            }
        });
    }

    click(): void {
        this.clickEvent.emit();
    }

    clickOld(): void {
        this.counterService.incrementCounter();
    }
}