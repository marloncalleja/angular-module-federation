import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CounterService {
    private _counter = 0;

    private counterSubject = new BehaviorSubject('0');
    public counterAction$ = this.counterSubject.asObservable();
    
    public get counter(): number {
        return this._counter;
    }

    public incrementCounter(): void {
        this._counter++;
        this.counterSubject.next(this._counter.toString());
    }
}