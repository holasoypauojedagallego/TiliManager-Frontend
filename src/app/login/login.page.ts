import { Component } from '@angular/core';
import { IonContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonContent, IonItem, IonInput, IonButton, RouterLink ]
})
export class LoginPage {
  constructor(private router: Router) {}

  login() {
    // Aquí iría tu lógica de validación
    console.log('Intentando entrar...');
    // Si es correcto, navegamos al home o a los tabs
    this.router.navigate(['/tabs/tab1']);
  }
}