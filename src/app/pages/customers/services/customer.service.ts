import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { CodeServices } from 'src/app/shared/types/enum.types';
import { Customer, CustomerResponse } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  token: string = sessionStorage.getItem("token")
  public customer: Customer

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllData(): Observable<ApiResponse<CustomerResponse<Customer>>> {
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    throw new Error('error service');

    // return this.http.get<ApiResponse<CustomerResponse<Customer>>>(CodeServices.CUSTOMERS + "?size=10", { headers: headers })
  }

  public getCustomerById(id: string): Observable<ApiResponse<Customer>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get<ApiResponse<Customer>>(CodeServices.CUSTOMERS + `/${id}`, { headers: headers })
  }

  public addCustomer(payload: Customer): Observable<ApiResponse<Customer>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.post<ApiResponse<Customer>>(CodeServices.CUSTOMERS, payload, { headers: headers })
  }

  public deleteCustomer(id: string, payload: Customer):
  Observable<ApiResponse<Customer>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.put<ApiResponse<Customer>>(CodeServices.CUSTOMERS + `/${id}`, payload, { headers: headers })
  }

  public updateCustomer(customer: Customer): Observable<ApiResponse<Customer>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.put<ApiResponse<Customer>>(CodeServices.CUSTOMERS, customer, { headers: headers })
  }
}

