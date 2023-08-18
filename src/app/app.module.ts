import {NgModule} from '@angular/core';
import { NgbModule, NgbPaginationModule ,NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// import {provideRouter, RouterModule, Routes} from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {TableModule} from "primeng/table";
import {SliderModule} from "primeng/slider";

//
// const appRoutes: Routes = [
//   { path: 'product/new', component: AddProductComponent },
//   { path: 'product/:id/update', component: UpdateProductComponent },
//   // { path: '', component: AppComponent ,pathMatch: 'full' },
// ];


@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    UpdateProductComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    MultiSelectModule,
    TableModule,
    SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

