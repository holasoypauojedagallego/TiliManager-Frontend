import { Component } from '@angular/core';
import { IonContent, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonListHeader, IonLabel, IonItem } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonContent,
    IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonList,
    IonListHeader, IonLabel, IonItem, RouterLink, HeaderComponent],
})
export class HomePage {
  constructor() {}
}
