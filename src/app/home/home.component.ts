import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Type } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  validTypes: string[] = Object.values(Type);
  selectedTypes: Type[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap(term => this.getFilteredProducts(term))
      )
      .subscribe(
        (filteredProducts: Product[]) => {
          this.products = filteredProducts;
        },
        (error: any) => {
          console.error('Error fetching filtered products:', error);
        }
      );

    this.search('');
  }


  fetchProducts(): void {
    this.http.get<Product[]>('http://localhost:8080/products/getAllProducts').subscribe((data) => {
      this.products = data;
    });
  }

  search(term: string): void {
    this.searchSubject.next(term);
  }

  getFilteredProducts(term: string): Observable<Product[]> {
    const selectedTypeParam = this.selectedTypes.join(',');

    if (term.trim() === '') {
      if (this.selectedTypes.length === 0) {
        return this.http.get<Product[]>('http://localhost:8080/products/getAllProducts');
      } else {
        return this.http.get<Product[]>(`http://localhost:8080/products/filterProductsByTypes/${selectedTypeParam}`);
      }
    } else {
      if (this.selectedTypes.length === 0) {
        return this.http.get<Product[]>(`http://localhost:8080/products/search/${term}`);
      } else {
        return this.http.get<Product[]>(
          `http://localhost:8080/products/filterProducts?term=${term}&type=${selectedTypeParam}`
        );
      }
    }
  }

  applyFilter(): void {
    this.search(this.searchTerm);
  }
  toggleTypeSelection(type: Type): void {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
    this.applyFilter();
  }

  onSearch(): void {
    this.search(this.searchTerm);
  }

  applyFilterByType(type: Type): void {
    const index = this.selectedTypes.indexOf(type);

    if (index !== -1) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type);
    }

    this.applyFilter();
  }



  onDeleteProduct(productId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.http.delete<Product>(`http://localhost:8080/products/deleteProduct/${productId}`).subscribe(() => {
        this.products = this.products.filter(product => product.id !== productId);
      });
    }
  }
}
