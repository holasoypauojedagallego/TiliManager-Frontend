import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonButton, IonInput, IonIcon, IonInputPasswordToggle } from '@ionic/angular/standalone';

import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonIcon, IonButton, IonInput, CommonModule, ReactiveFormsModule, IonInputPasswordToggle]
})
export class RegisterPage implements OnInit {

  registerForm : FormGroup = new FormGroup({});
  registered : boolean = false; 
  submited : boolean = false; 
  usernameCreated: boolean = false;
  emailCreated: boolean = false;

  usernameRegistered : boolean = false;
  emailRegistered : boolean = false;

  constructor(private router : Router, private auth : AuthService, private fb : FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
     username : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9._+-]+$')]],
     email : ['',[Validators.required, Validators.email]],
     password : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(64)]]
    });
  }

  async onRegister(){
    this.usernameCreated = false;
    this.emailCreated = false;
    this.registered = false;
    this.submited = false;
    if (this.registerForm.invalid) {
      this.registerForm.markAsTouched();
    }

    const registerData = {
      name : this.registerForm.value.username,
      email : this.registerForm.value.email,
      password : this.registerForm.value.password
    };

    this.usernameCreated = await firstValueFrom(this.auth.nameRegistered(registerData.name));
    if (this.usernameCreated) {
      this.submited = true;
      this.registerForm.controls['password']?.reset();
      return;
    }
    this.emailCreated = await firstValueFrom(this.auth.emailRegistered(registerData.email));
      if (this.emailCreated) {
      this.submited = true;
      this.registerForm.controls['password']?.reset();
      return;
    }

    this.auth.register(registerData).subscribe({
      next : (response) => {
        console.log("YUJUUUUUU : ", response);
        this.registered = true;
      },
      error : (error) => {
        console.log("Username: " + this.registerForm.value.username);
        console.log("no ba, jo " + error);
        this.registered = false;
        this.usernameRegistered = true;
      }
    });
    this.registerForm.controls['password']?.reset();
    this.registerForm.controls['password'].markAsUntouched();
    this.submited = true;
  }

  ionViewWillLeave() {
    this.registerForm.controls['password']?.reset();
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
