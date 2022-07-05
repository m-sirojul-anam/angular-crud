import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { AlertMessage } from '../../models/alert-message';
import { LoginResponse } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  alertMessage: AlertMessage
  loading: boolean = false
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required])
  })

  onSubmit(): void {

    // if(this.loginForm) {
      this.authService.login(this.loginForm.value)
        .subscribe(
          {
            next: (response: ApiResponse<LoginResponse>) => {
              console.log("Ini Response ", response);
              sessionStorage.setItem('token', response.data.token)
              this.router.navigateByUrl('/home').finally()
              alert(response.message)
            },
            error: (errorResponse: HttpErrorResponse) => {
              // console.log(errorResponse);
              
              if(errorResponse){
                if(errorResponse.status === 403){
                  this.displayAlert("Anda tidak punya sesi", "danger")
                } else if( errorResponse.status === 401) {
                  this.displayAlert("Maaf Email dan Password salah", 'warning')
                } else if( errorResponse.status === 400) {
                  this.displayAlert("Email dan Password harus di isi", 'danger')
                }
              }
            }
          }
        )
        
    // } else {
    //   this.displayAlert("Maaf Email atau Password Salah!!", 'warning');
    //   this.loginForm.reset();
    // }
  }

  private displayAlert(message: string,  status: 'primary' | 'info' | 'success' | 'secondary' | 'warning' | 'danger'): void {
    this.alertMessage = {status, text:message}
    this.loading = false
  }
}
