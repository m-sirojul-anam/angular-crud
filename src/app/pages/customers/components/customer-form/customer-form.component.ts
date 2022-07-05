import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, OnChanges {

  customerForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    gender: new FormControl(null),
    dateOfBirth: new FormControl(null),
    email: new FormControl(null),
    phone: new FormControl(null),
    address: new FormControl(null),
    roleSet: new FormControl(null)
  })

  customer: Customer;
  token: string = sessionStorage.getItem("token")

  constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

    ngOnChanges(): void {
        
    }

  ngOnInit(): void {
    let paramId: string;
    this.activatedRoute.params.pipe(
      map((params: Params) => {
        paramId = params['id'];
        return params['id'] ? params['id'] : null
      })
    ).subscribe((id: string) => {
      this.customerService.getCustomerById(id)
        .subscribe(
          {
            next: (response: ApiResponse<Customer>) => {
              this.customer = response.data
              this.setFormValue()
              
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);
              
            }
          }
        )
    })
    if(!paramId){
      this.router.navigateByUrl("/pages/customers/form").then(r => "")
    }
  }

  setFormValue(): void{
    if(this.customer){
      this.customerForm.setValue(this.customer)
    }
  }

  onSubmit(): void {
    try{
      const customer: Customer = this.customerForm.value
      if(this.token){
        this.customerService.updateCustomer(customer)
        .subscribe(
          {
            next: (response: ApiResponse<Customer>) => {
              // console.log(response.message);
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);
            }
          }
        )
      } else{
        this.customerService.addCustomer(customer)
        .subscribe(
          {
            next: (response: ApiResponse<Customer>) => {
              // console.log(response.message);
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);
            }
          }
        )
      }

      this.customerForm.reset()
      this.router.navigateByUrl("/pages/customers").then(r => "")
    } catch(error){
      console.log(error);
    }
  }

}
