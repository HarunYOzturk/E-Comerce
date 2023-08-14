import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Currency, Product, Type } from './product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl(Type.ELECTRONIC, Validators.required),
    price: new FormControl(0, Validators.required),
    currency: new FormControl(Currency.DOLLAR, Validators.required),
  });
  products: Product[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  newProduct: Product = {
    id: '',
    name: '',
    description: '',
    type: Type.ELECTRONIC,
    price: 0,
    currency: Currency.DOLLAR,
  };
  validTypes: string[] = Object.values(Type);

  constructor(
    private http: HttpClient,
    private paginationConfig: NgbPaginationConfig
  ) {
    paginationConfig.pageSize = this.itemsPerPage;
    paginationConfig.boundaryLinks = true;
    paginationConfig.maxSize = 3;
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.http
      .get<Product[]>('http://localhost:8080/products/getAllProducts', {
        params: {
          start: startIndex.toString(),
          limit: this.itemsPerPage.toString(),
        },
      })
      .subscribe((data) => {
        this.products = data;
      });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchProducts();
  }

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
        this.fetchProducts();
      });
  }

  populateUpdateForm(product: Product): void {
    this.updateForm.setValue(product);
  }

  onUpdateProduct(): void {
    const updatedProduct: Product = this.updateForm.value;

    this.http
      .put<Product>('http://localhost:8080/products/updateProduct', updatedProduct)
      .subscribe((response) => {
        const index = this.products.findIndex(
          (product) => product.id === updatedProduct.id
        );
        if (index !== -1) {
          this.products[index] = response;
        }

        this.updateForm.reset();
      });
  }
  onDeleteProduct(productId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.http.delete<Product>(`http://localhost:8080/products/deleteProduct/${productId}`)
        .subscribe(() => {
          // Remove the deleted product from the list
          this.products = this.products.filter(product => product.id !== productId);
        });
    }
  }
}
