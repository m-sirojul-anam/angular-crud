import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  isNavbarCollapsed : boolean = true

  logout(): void{
    sessionStorage.removeItem("token");
    this.router.navigateByUrl("/auth/signin")
  }

}
