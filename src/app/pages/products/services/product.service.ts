import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { CodeServices } from 'src/app/shared/types/enum.types';
import { Product, ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token: string = sessionStorage.getItem("token")

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllData(): Observable<ApiResponse<ProductsResponse<Product>>> {
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get<ApiResponse<ProductsResponse<Product>>>(CodeServices.PRODUCTS + "?size=10", { headers: headers })
  }

  public getProductById(id: string): Observable<ApiResponse<Product>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get<ApiResponse<Product>>(CodeServices.PRODUCTS + `/${id}`, { headers: headers })
  }

  public addProduct(payload: Product): Observable<ApiResponse<Product>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.post<ApiResponse<Product>>(CodeServices.PRODUCTS, payload, { headers: headers })
  }

  public deleteProduct(id: string, payload: Product):
  Observable<ApiResponse<Product>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.put<ApiResponse<Product>>(CodeServices.PRODUCTS + `/${id}`, payload, { headers: headers })
  }

  public updateProduct(product: Product): Observable<ApiResponse<Product>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.put<ApiResponse<Product>>(CodeServices.PRODUCTS, product, { headers: headers })
  }
}
