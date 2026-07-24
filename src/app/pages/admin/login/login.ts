import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth1 } from '../../../services/auth1/auth';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  loginForm: FormGroup;


  constructor(private fb: FormBuilder,
    private auth1: Auth1,
    private router: Router
  ) {

    this.loginForm = this.fb.group({


      email: ['', Validators.required],

      password: ['', Validators.required]
    });

  }


  ingresar() {
    if (this.loginForm.invalid) return;


    //llama al servicio de autenticacion
    this.auth1.login(this.loginForm.value).subscribe({
      next: (resp: any) => {
        localStorage.setItem(
          'token',
          resp.access_token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(resp.user)
        );

        this.router.navigate([
          '/admin/dashboard'
        ]);
      },


      error: (err) => {
        console.error(err);

        alert('credenciales incorrectas')
      }
    });
  }


}
