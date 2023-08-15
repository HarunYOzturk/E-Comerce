import { NgModule } from '@angular/core';
import {provideRouter, RouterModule, Routes} from '@angular/router';

import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const featureRoutes: Routes = [
  { path: 'product/new', component: AddProductComponent },
  { path: 'product/:id/update', component: UpdateProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(featureRoutes)],
  exports: [RouterModule],
  providers: [provideRouter(featureRoutes)]
})
export class FeatureRoutingModule { }
