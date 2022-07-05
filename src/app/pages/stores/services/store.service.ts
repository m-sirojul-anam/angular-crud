import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { CodeServices } from 'src/app/shared/types/enum.types';
import { Store, StoreResponse } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  
  token: string = sessionStorage.getItem("token")

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllData(): Observable<ApiResponse<StoreResponse<Store>>> {
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get<ApiResponse<StoreResponse<Store>>>(CodeServices.STORES + "?size=10", { headers: headers })
  }

  public getStoreById(id: string): Observable<ApiResponse<Store>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get<ApiResponse<Store>>(CodeServices.STORES + `/${id}`, { headers: headers })
  }

  public addStore(payload: Store): Observable<ApiResponse<Store>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.post<ApiResponse<Store>>(CodeServices.STORES, payload, { headers: headers })
  }

  public deleteStore(id: string, payload: Store):
  Observable<ApiResponse<Store>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.put<ApiResponse<Store>>(CodeServices.STORES + `/${id}`, payload, { headers: headers })
  }

  public updateStore(store: Store): Observable<ApiResponse<Store>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.put<ApiResponse<Store>>(CodeServices.STORES, store, { headers: headers })
  }
}
