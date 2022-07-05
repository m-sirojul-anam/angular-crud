import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { Product, ProductsResponse } from 'src/app/pages/products/models/product.model';
import { ProductService } from 'src/app/pages/products/services/product.service';
import { Store, StoreResponse } from 'src/app/pages/stores/models/store.model';
import { StoreService } from 'src/app/pages/stores/services/store.service';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { Inventory } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit, OnChanges {

  tempProducts: Product[] = [];
  tempStores: Store[] = [];
  product: Product;
  store: Store;
  products: Product[] = [];
  stores: Store[] = [];
  inventory: Inventory;
  token: string = sessionStorage.getItem("token");
  id: string;

  constructor(
    private readonly inventoryService: InventoryService,
    private readonly productService: ProductService,
    private readonly storeService: StoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    ) { }
    
    inventoryForm: FormGroup = new FormGroup({
      id: new FormControl(null),
      product: new FormControl(null),
      store: new FormControl(null),
      productPrice: new FormControl(null),
      stock: new FormControl(null),
    })
  

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllProduct();
      this.getAllStore();
    }, 1000);
      
      this.activatedRoute.params.pipe(
        map((params: Params) => {
          this.id = params['id'];
          return params['id'] ? params['id'] : null
        })
      ).subscribe((id: string) => {
        this.inventoryService.getInventoryById(id)
          .subscribe(
            {
              next: (response: ApiResponse<Inventory>) => {
                this.inventory = response.data

                this.product = this.inventory.product
                this.tempProducts.push(this.product)

                this.store = this.inventory.store
                this.tempStores.push(this.store)

                this.setFormValue()
                
              },
              error: (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
                
              }
            }
          )
      });
  }

  getAllProduct(): Product[] {
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
            console.log(errorResponse);
            
          }
        }
      )
      return products;
    } catch(error) {
      console.log(error);
      
    }
  }

  getAllStore(): Store[]{
    try{
      const stores: Store[] = []
      this.storeService.getAllData()
      .subscribe(
        {
          next: (response: ApiResponse<StoreResponse<Store>>) => {
            for (let item of response.data.content){
              stores.push(item)
            }
            this.stores = stores
          },
          error: (errorResponse: HttpErrorResponse) => {
            console.log("Ini ERORR ", errorResponse);
            
          }
        }
      )
      return stores;
    } catch(error) {
      console.log(error);
    }
    
  }

  setFormValue(): void {
    if(this.inventory){
      this.inventoryForm.setValue(this.inventory)
    }
  }

  onSubmit(): void {
    try{
      const inventory: Inventory = this.inventoryForm.value
      
      if(this.id){
        this.inventoryService.updateInventory(inventory)
        .subscribe(
          {
            next: (response: ApiResponse<Inventory>) => {
              // console.log(response.message);
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);
            }
          }
        )
      } else{
        console.log(this.inventoryForm);
        
        this.inventoryService.addInventory(inventory)
        .subscribe(
          {
            next: (response: ApiResponse<Inventory>) => {
              // console.log(response.message);
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);
            }
          }
        )
      }

      this.inventoryForm.reset()
      this.router.navigateByUrl("/pages/inventories").then(r => "")
    } catch(error){
      console.log(error);
    }
  }

}
