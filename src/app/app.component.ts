import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from "./product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<Product[]>('http://localhost:8080/products/getAllProducts').subscribe(data => {
      this.products = data;
    });
  }
}
