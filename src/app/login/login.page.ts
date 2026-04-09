import { Component, OnInit } from '@angular/core';
import { IonContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../services/auth';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, RouterLink,
    CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private auth: Auth,
    private router: Router,
    private fb : FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.auth.login(loginData).subscribe({
        next: (response) => {
          console.log('Login correcto', response);
          this.router.navigate(['/home']);
          this.loginForm.value.password = '';
        },
        error: (err) => {
          console.error('Error login', err);
          console.log("Email: " + this.loginForm.value.email);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
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
    this.router.navigate(['/']);
  }
}