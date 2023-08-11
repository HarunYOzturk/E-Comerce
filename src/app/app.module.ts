import {NgModule} from '@angular/core';
import { NgbModule, NgbPaginationModule ,NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule
  ],
  providers: [NgbPaginationConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
