import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Mfe1RoutingModule } from './mfe1-routing.module';

import { Mfe1Component } from './mfe1.component';

@NgModule({
    imports: [
        CommonModule,
        Mfe1RoutingModule
    ],
    declarations: [
        Mfe1Component
    ]
})
export class Mfe1Module { }
