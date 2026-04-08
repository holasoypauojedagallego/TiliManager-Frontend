import { Component } from '@angular/core';
import { IonContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../services/auth';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, RouterLink,
    CommonModule, FormsModule]
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.auth.login(loginData).subscribe({
      next: (response) => {
        console.log('Login correcto', response);
        this.router.navigate(['/home']);
        this.password = '';
      },
      error: (err) => {
        console.error('Error login', err);
        console.log("Email: " + this.email);
      }
    });
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