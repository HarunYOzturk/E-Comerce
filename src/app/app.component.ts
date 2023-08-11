import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap'; // Import NgbPaginationConfig
import { Product } from './product.model';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  products: Product[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;


  constructor(
    private http: HttpClient,
    private paginationConfig: NgbPaginationConfig // Inject NgbPaginationConfig
  ) {
    // Set the default values for pagination
    paginationConfig.pageSize = this.itemsPerPage;
    paginationConfig.boundaryLinks = true;
    paginationConfig.maxSize = 5;
  }

  ngOnInit(): void {
    console.log('inside ngOnInit...');
    debugger;
    this.fetchProducts();
  }

  fetchProducts(): void {
    console.log('fetch...');
    debugger ;
    console.log('asdsadasdasdasdasdsadasdad')
    // debugger.console.log('i was here');
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.http.get<{ products: Product[], totalCount: number }>('http://localhost:8080/products/getAllProducts', {
      params: {
        start: startIndex.toString(),
        limit: this.itemsPerPage.toString()
      }
    }).subscribe(data => {
      this.products = data.products;
      this.totalItems = data.totalCount;
    });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchProducts();
  }
}
