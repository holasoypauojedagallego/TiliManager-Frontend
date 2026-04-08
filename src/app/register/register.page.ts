import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonButton, IonInput, IonNote } from '@ionic/angular/standalone';

import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonButton, IonInput, IonNote, CommonModule, FormsModule]
})
export class RegisterPage {
  username : string = '';
  email : string = '';
  password : string = '';
  constructor(private router : Router, private auth : Auth) { }

  onRegister(){
    const registerData = {
      name : this.username,
      email : this.email,
      password : this.password
    }

    this.auth.register(registerData).subscribe({
      next : (response) => {
        console.log("YUJUUUUUU : " + response);
      },
      error : (error) => {
        console.log("Username: " + this.username);
        console.log("NOVA jo " + error);
      }
    });
  }

  goToLogin() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.router.navigate(['/login']);
  }

  goToHome(){
    if (document.activeElement instanceof HTMLElement){
      document.activeElement.blur();
    }
    this.router.navigate(['/']);
  }

}
