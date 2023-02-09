export declare class CounterService {
    private _counter;
    private counterSubject;
    counterAction$: import("rxjs").Observable<string>;
    get counter(): number;
    incrementCounter(): void;
}
