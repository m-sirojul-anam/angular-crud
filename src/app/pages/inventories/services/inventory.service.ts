import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { CodeServices } from 'src/app/shared/types/enum.types';
import { Inventory, InventoryResponse } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  
  token: string = sessionStorage.getItem("token")

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllData(): Observable<ApiResponse<InventoryResponse<Inventory>>> {
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get<ApiResponse<InventoryResponse<Inventory>>>(CodeServices.INVETORIES + "?size=10", { headers: headers })
  }

  public getInventoryById(id: string): Observable<ApiResponse<Inventory>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get<ApiResponse<Inventory>>(CodeServices.INVETORIES + `/${id}`, { headers: headers })
  }

  public addInventory(payload: Inventory): Observable<ApiResponse<Inventory>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.post<ApiResponse<Inventory>>(CodeServices.INVETORIES, payload, { headers: headers })
  }

  public deleteInventory(id: string, payload: Inventory):
  Observable<ApiResponse<Inventory>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.put<ApiResponse<Inventory>>(CodeServices.INVETORIES + `/${id}`, payload, { headers: headers })
  }

  public updateInventory(payload: Inventory): Observable<ApiResponse<Inventory>>{
    const headers = new HttpHeaders({
      'Contentype': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.put<ApiResponse<Inventory>>(CodeServices.INVETORIES, payload, { headers: headers })
  }
}
