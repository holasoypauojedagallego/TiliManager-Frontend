import { Component, OnInit } from '@angular/core';
import { IonContent, IonItem, IonInput, IonButton, IonIcon, IonInputPasswordToggle, NavController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { AuthService, SecretUser, Team } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonItem, IonInput, IonButton,
    CommonModule, ReactiveFormsModule, IonInputPasswordToggle]
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
    private fb: FormBuilder,
    private navCtrl: NavController
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
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.auth.login(loginData).subscribe({
      next: async (response: SecretUser) => {
        await this.auth.removeSesion();
        await this.auth.setSesion(response);
        console.log(this.auth.getSesion());
        console.log(this.auth.getTeamSesion());
        this.loged = true;
        this.loginForm.controls['password'].reset();
        const currentUser : Team | null = await this.auth.getTeamSesion();
        if(currentUser && currentUser?.players.length == 0){
            this.navCtrl.navigateRoot('/crearequipo', { animated: true });
        } else {this.navCtrl.navigateRoot('/', { animated: true });}
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
      }
    });
    this.loginForm.controls['password'].reset();
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