import { Component, OnInit } from '@angular/core';
import { IonContent, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonItem, IonInput, IonButton, RouterLink,
    CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  error401: boolean = false;
  loged : boolean = false; 
  submited : boolean = false; 
  errorDesc : boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb : FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(64)]]
    });
    this.loginForm.controls['password'].reset();
  }

  onLogin() {
    this.error401 = false;
    this.errorDesc =  false;
    this.loged = false;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.auth.login(loginData).subscribe({
      next: (response) => {
        console.log('Login correcto', response);
        this.loged = true;
        this.loginForm.controls['password'].reset();
        this.router.navigate(['/home']);
      },

      error: (err) => {
        console.error('Error login', err);
        if (err.status == 401) {
          this.error401 = true;
        } else {
          this.errorDesc = true;
        }
        console.log("Email: " + this.loginForm.value.email);
        this.loged = false;
        this.loginForm.controls['password'].reset();
      }
    });
    this.submited = true;

  }

  ionViewWillLeave() {
    this.loginForm.controls['password'].reset();
  }

  goToRegister(){
    if (document.activeElement instanceof HTMLElement){
      document.activeElement.blur();
    }
    this.router.navigate(['/register']);
  }

  goToHome(){
    if (document.activeElement instanceof HTMLElement){
      document.activeElement.blur();
    }
    this.loginForm.get('password')?.markAsUntouched;
    this.router.navigate(['/']);
  }
}