import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Currency, Product, Type} from "../product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html'
})
export class UpdateProductComponent {
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl(Type.ELECTRONIC, Validators.required),
    price: new FormControl(0, Validators.required),
    currency: new FormControl(Currency.DOLLAR, Validators.required),
  });
  products: Product[] = [];




  validTypes: string[] = Object.values(Type);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.http.get<Product>(`http://localhost:8080/products/getProductById/${productId}`)
          .subscribe(
            (productToUpdate: Product) => {
              this.populateUpdateForm(productToUpdate);
            },
            (error: any) => {
              // Handle error when product is not found
              console.error(`Product with ID ${productId} not found.`);
            }
          );
      }
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
    this.router.navigate(['/Home']);

  }
}
