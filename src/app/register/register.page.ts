import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonButton, IonInput, IonIcon } from '@ionic/angular/standalone';

import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonIcon, IonButton, IonInput, CommonModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  registerForm : FormGroup = new FormGroup({});
  registered : boolean = false; 
  submited : boolean = false; 
  usernameCreated: boolean = false;
  emailCreated: boolean = false;

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

    const nameExists = await firstValueFrom(this.auth.nameRegistered(registerData.name));
    if (nameExists) {
      this.submited = true;
      this.usernameCreated = true;
      this.registerForm.controls['password']?.reset();
      return;
    }
    
    const emailExists = await firstValueFrom(this.auth.emailRegistered(registerData.email));
      if (emailExists) {
      this.submited = true;
      this.emailCreated = true;
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
      }
    });
    this.registerForm.controls['password']?.reset();
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
