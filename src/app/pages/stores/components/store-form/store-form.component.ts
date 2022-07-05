import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { Store } from '../../models/store.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit, OnChanges {

  storeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    noSiup: new FormControl(null),
    name: new FormControl(null),
    address: new FormControl(null),
    phone: new FormControl(null),
    email: new FormControl(null)
  })

  store: Store;
  token: string = sessionStorage.getItem("token");

  constructor(
    private readonly storeService: StoreService,
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
      this.storeService.getStoreById(id)
        .subscribe(
          {
            next: (response: ApiResponse<Store>) => {
             this.store = response.data
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
    if(this.store){
      this.storeForm.setValue(this.store)
    }
  }

  onSubmit(): void {
    try{
      const store: Store = this.storeForm.value
      if(this.token){
        this.storeService.updateStore(store)
        .subscribe(
          {
            next: (response: ApiResponse<Store>) => {
              // console.log(response.message);
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);
            }
          }
        )
      } else{
        this.storeService.addStore(store)
          .subscribe(
            {
              next: (response: ApiResponse<Store>) => {
              
              },
              error: (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
                
              }
            }
          )
      }

      this.storeForm.reset()
      this.router.navigateByUrl("/pages/stores").then(r => "")
    } catch(error){
      console.log(error);
    }
  }
}
