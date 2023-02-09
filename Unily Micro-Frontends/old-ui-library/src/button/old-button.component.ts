import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'old-ui-button',
    templateUrl: 'old-button.component.html',
    styleUrls: ['./old-button.component.less']
})

export class OldButtonComponent {
    @Output() clickEvent = new EventEmitter();
    @Input() text!: string;

    click(): void {
        this.clickEvent.emit();
    }
}