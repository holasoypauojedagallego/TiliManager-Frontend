import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonListHeader, IonLabel, IonItem, IonRouterLinkWithHref } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonList,
    IonListHeader, IonLabel, IonItem, IonRouterLinkWithHref, RouterLink, HeaderComponent],
})
export class HomePage {
  constructor() {}
}
