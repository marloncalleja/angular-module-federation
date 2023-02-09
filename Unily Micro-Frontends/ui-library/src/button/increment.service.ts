import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class IncrementService {
    public increment(value: number): number {
        return value+1;
    }
}