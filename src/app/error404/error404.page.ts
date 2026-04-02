import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, RouterLink, IonIcon]
})
export class Error404Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
