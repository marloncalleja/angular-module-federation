import { Injectable } from '@angular/core';
import { IncrementService } from './increment.service';

@Injectable()
export class ButtonService {
    private _clickCount = 0;

    constructor(private readonly incrementService: IncrementService) { }

    public get clickCount(): number {
        return this._clickCount;
    }

    public incrementClickCount(): void {
        this._clickCount = this.incrementService.increment(this._clickCount);
        console.log(this._clickCount);
    }
}