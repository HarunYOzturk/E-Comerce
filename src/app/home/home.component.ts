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
  productsBeforeRanged: Product[] = [];
  searchTerm: string = '';
  validTypes: string[] = Object.values(Type);
  selectedTypes: Type[] = [];
  private searchSubject = new Subject<string>();
  sortOrder: 'lowToHigh' | 'highToLow' = 'lowToHigh';
  minPrice: number = 0;
  maxPrice: number = 10000;
  priceRange: number[] = [0, 10000];

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
          this.productsBeforeRanged = this.sortProducts(filteredProducts);
          this.applyFilterByPriceRange();
        },
        (error: any) => {
          console.error('Error fetching filtered products:', error);
        }
      );

    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('http://localhost:8080/products/getAllProducts').subscribe((data) => {
      this.productsBeforeRanged = this.sortProducts(data);
      this.applyFilterByPriceRange();
    });
  }

  search(term: string): void {
    this.searchSubject.next(term);
  }

  getFilteredProducts(term: string): Observable<Product[]> {
    const selectedTypeParam = this.selectedTypes.join(',');

    if (term.trim() === '') {
      if (this.selectedTypes.length === 0 || this.selectedTypes.sort()[0].toString() === 'All') {
        return this.http.get<Product[]>('http://localhost:8080/products/getAllProducts');
      } else {
        return this.http.get<Product[]>(`http://localhost:8080/products/filterProductsByTypes/${selectedTypeParam}`);
      }
    } else {
      if (this.selectedTypes.length === 0 || this.selectedTypes.sort()[0].toString() === 'All') {
        return this.http.get<Product[]>(`http://localhost:8080/products/search/${term}`);
      } else {
        return this.http.get<Product[]>(
          `http://localhost:8080/products/filterProducts?term=${term}&types=${selectedTypeParam}`
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
  }

  applyFilterByType(type: Type): void {
    const index = this.selectedTypes.indexOf(type);

    if (index !== -1) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type);
    }
  }

  sortByLowToHigh(): void {
    this.sortOrder = 'lowToHigh';
    this.productsBeforeRanged = this.sortProducts(this.productsBeforeRanged);
    this.applyFilterByPriceRange();
  }

  sortByHighToLow(): void {
    this.sortOrder = 'highToLow';
    this.productsBeforeRanged = this.sortProducts(this.productsBeforeRanged);
    this.applyFilterByPriceRange();
  }

  sortProducts(products: Product[]): Product[] {
    if (this.sortOrder === 'lowToHigh') {
      return products.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'highToLow') {
      return products.sort((a, b) => b.price - a.price);
    }
    return products;
  }

  filterProductsByPriceRange(products: Product[]): Product[] {
    if (this.minPrice !== null && this.maxPrice !== null) {
      return products.filter(product => product.price >= this.minPrice && product.price <= this.maxPrice);
    }
    return products;
  }


  applyFilterByPriceRange(): void {
    this.products = this.sortProducts(this.filterProductsByPriceRange(this.productsBeforeRanged));
  }

  onPriceRangeChange(): void {
    this.applyFilterByPriceRange();
  }
  onDeleteProduct(productId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.http.delete<Product>(`http://localhost:8080/products/deleteProduct/${productId}`).subscribe(() => {
        this.productsBeforeRanged = this.productsBeforeRanged.filter(product => product.id !== productId);
        this.applyFilterByPriceRange();
      });
    }
  }
}
