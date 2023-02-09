import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonService } from 'src/button/button.service';
import PublicModule from 'src/exports/public.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PublicModule
  ],
  providers: [
    ButtonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
