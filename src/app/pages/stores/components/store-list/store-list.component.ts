import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { Store, StoreResponse } from '../../models/store.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  constructor(
    private readonly storeService: StoreService,
    private readonly router: Router
  ) { }

    stores: Store[] = []
    store: Store
    loading: boolean = true

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false
      this.getAllStore()
    }, 1000);
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

  onDeletedStore(id: string): void{
    try{

      if(confirm(`Apakah anda yakin akan menghapus store ini?`)){
        this.storeService.deleteStore(id, this.store)
          .subscribe(
            {
              next: (response: ApiResponse<Store>) => {
                this.getAllStore()
                
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
      this.router.navigateByUrl("/pages/stores").then(r => "")
    }
  }

}
