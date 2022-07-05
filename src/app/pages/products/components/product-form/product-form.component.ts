import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {

  productForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    productImage: new FormControl(null)
  })

  product: Product;
  token: string = sessionStorage.getItem("token");

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnChanges(): void {}

  ngOnInit(): void {
      this.activatedRoute.params.pipe(
        map((params: Params) => {
          return params['id'] ? params['id'] : null
        })
      ).subscribe((id: string) => {
        this.productService.getProductById(id)
          .subscribe(
            {
              next: (response: ApiResponse<Product>) => {
               this.product = response.data
               this.setFormValue()
                
              },
              error: (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
                
              }
            }
          )
      });
  }

  setFormValue(): void {
    if(this.product){
      this.productForm.setValue(this.product)
    }
  }

  onSubmit(): void {
    try{
      const product: Product = this.productForm.value
      if(this.token){
        this.productService.updateProduct(product)
        .subscribe(
          {
            next: (response: ApiResponse<Product>) => {
              // console.log(response.message);
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);
            }
          }
        )
      } else{
        this.productService.addProduct(product)
        .subscribe(
          {
            next: (response: ApiResponse<Product>) => {
              // console.log(response.message);
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);
            }
          }
        )
      }

      this.productForm.reset()
      this.router.navigateByUrl("/pages/products").then(r => "")
    } catch(error){
      console.log(error);
    }
  }
}
