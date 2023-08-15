import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency, Product, Type } from './product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  newProduct: Product = {
    id: '',
    name: '',
    description: '',
    type: Type.ELECTRONIC,
    price: 0,
    currency: Currency.DOLLAR,
  };
  validTypes: string[] = Object.values(Type);


  constructor(private http: HttpClient) {}

  onAddProduct(): void {
    this.http
      .post<Product>('http://localhost:8080/products/addProduct', this.newProduct)
      .subscribe(() => {
        this.newProduct = {
          id: '',
          name: '',
          description: '',
          type: Type.ELECTRONIC,
          price: 0,
          currency: Currency.DOLLAR,
        };
      });
  }
}
