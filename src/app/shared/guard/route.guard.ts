import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {

  constructor(
    private readonly router: Router
  ){ }

  canActivateChild(): boolean{
    return this.authorize();
  }

  canActivate(): boolean {
    return this.authorize();
  }
  
  private authorize(): boolean {
    const auth: boolean = (sessionStorage.getItem('token')) != null
    if(!auth) {
      alert("Kamu tidak ada akses di halaman ini")
      this.router.navigateByUrl('/auth/signin')
    }
    return auth
  }
}
