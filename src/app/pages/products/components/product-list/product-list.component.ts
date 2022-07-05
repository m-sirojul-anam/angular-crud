import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) { }

  public products: Product[] = []
  product: Product
  loading: boolean = true

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false
      this.getAllProduct();
    }, 1000);
    
  }

  public getAllProduct(): Product[] {
    try{
      const products: Product[] = []
      this.productService.getAllData()
      .subscribe(
        {
          next: (response: ApiResponse<ProductsResponse<Product>>) => {
            for (let item of response.data.content){
              products.push(item)
            }
            this.products = products
          },
          error: (errorResponse: HttpErrorResponse) => {
            console.log("Ini ERORR ", errorResponse);
            
          }
        }
      )
      return products;
    } catch(error) {
      console.log(error);
      
    }
  }

  onDeletedProduct(id: string): void{
    try{

      this.productService.getProductById(id)
      .subscribe(
        {
          next: (response: ApiResponse<Product>) => {
           this.product = response.data
            
          },
          error: (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            
          }
        }
      )

      if(confirm(`Apakah anda yakin akan menghapus product ini?`)){
        this.productService.deleteProduct(id, this.product)
          .subscribe(
            {
              next: (response: ApiResponse<Product>) => {
                this.getAllProduct();
                
              },
              error: (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
                
              }
            }
          )
      }

    } catch(error) {
      console.log(error);
    } finally {
      this.router.navigateByUrl("/pages/products").then(r => "")
    }
  }
}
