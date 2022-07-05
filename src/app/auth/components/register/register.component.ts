import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { Register, RegisterResponse } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges {

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    gender: new FormControl(null),
    dateOfBirth: new FormControl(null),
    phone: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    status: new FormControl(null),
    address: new FormControl(null),
    role: new FormControl(['admin'])
  })

  register: Register;

  constructor(
    private readonly registerService: AuthService,
    private readonly router: Router
  ) { }
  ngOnChanges(): void {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    try{
      const register: Register = this.registerForm.value
      this.registerService.register(register)
        .subscribe(
          {
            next: (response: ApiResponse<RegisterResponse>) => {
              console.log(response);
              this.registerForm.reset();
              alert("Berhasil Register!!")
              this.router.navigateByUrl("/auth/signin").then(r => "")
                     
            },
            error: (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);
              alert(errorResponse.error.message)
            }
          }
        )
    } catch(error) {
      console.log(error);
      
    }
  }

}
