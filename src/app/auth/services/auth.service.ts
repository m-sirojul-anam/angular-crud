import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { CodeServices } from 'src/app/shared/types/enum.types';
import { Login, LoginResponse, Register, RegisterResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public register(payload: Register): Observable<ApiResponse<RegisterResponse>> {
    return this.http.post<ApiResponse<RegisterResponse>>(CodeServices.AUTH_SIGNUP, payload)
  }

  public login(payload: Login): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(CodeServices.AUTH_SIGNIN, payload)
  }
}
