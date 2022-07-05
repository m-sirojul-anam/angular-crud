import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { Customer, CustomerResponse } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router
  ) { }

  customers: Customer[] = []
  customer: Customer
  loading: boolean = true

  ngOnInit(): void {
    // setTimeout(() => {
      // this.loading = !this.loading
    // }, 1000);
    const data = this.getAllCustomer()
    console.log("Data ",data);
    

  }

  getAllCustomer(): Customer[] {
    try {
      const customers: Customer[] = []
      this.onDeletedCustomer("12")
      this.customerService.getAllData()
      .subscribe(
        {
          next: (response: ApiResponse<CustomerResponse<Customer>>) => {
            
            for (const item of response.data.content) {
              customers.push(item)
            }
            this.customers = customers
            this.loading = false
          },
          error: (errorResponse: HttpErrorResponse) => {
            console.log("Get All",errorResponse);
            
          }
        }
        )
        return customers
    } catch (error) {
      console.log("Error Catch",error); 
    }
  }

  onDeletedCustomer(id: string): void{
    try {
      this.customerService.getCustomerById(id)
        .subscribe(
          {
            next: (response: ApiResponse<Customer>) => {
              this.customer = response.data
              
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log("Get By ID",errorResponse);
              
            }
          }
        )

      if(confirm(`Apakah anda yakin akan menghapus data Customer ini?`)){
        this.customerService.deleteCustomer(id, this.customer)
          .subscribe(
            {
              next: (response: ApiResponse<Customer>) => {
                this.getAllCustomer();
              },
              error: (errorResponse: HttpErrorResponse) => {
                console.log("Delete",errorResponse);
                
              }
            }
          )
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.router.navigateByUrl("/pages/customers").then(r => "")
    }
  }
}
