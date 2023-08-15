import {NgModule} from '@angular/core';
import { NgbModule, NgbPaginationModule ,NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AppComponent } from './app.component';

// import {provideRouter, RouterModule, Routes} from '@angular/router';
import { FeatureRoutingModule } from './feature-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
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
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    FeatureRoutingModule
  ],
  providers: [NgbPaginationConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }

