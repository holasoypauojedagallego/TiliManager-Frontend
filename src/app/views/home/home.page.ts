import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonListHeader, IonLabel, IonItem, IonAlert, NavController } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from "src/app/components/header/header.component";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent,
    IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonList,
    IonListHeader, IonLabel, IonItem, RouterLink, HeaderComponent, IonAlert],
})
export class HomePage implements OnInit {
  constructor(private auth: AuthService, private activeRoute: ActivatedRoute, private navCtrl: NavController) {}

  id = this.auth.idget;
  equipo = this.auth.team;

  alertaaEnsenar: boolean = false;
  alertaTocha: boolean = false;
  alertaTocha2: boolean = false;
  alertaTocha3: boolean = false;

  async ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
        if (params['alertaaEnsenar']) {
        this.alertaaEnsenar = true;
        }
    });
    try {
      await this.auth.setSesionTeam();
    } catch (error) {
      console.error(error);
    }
    console.log("Hola, esto es únicamente para que el backend en Render vaya iniciando", this.auth.empezarConexiónRender());
  }

  ayuda(isAyuda: boolean) {
    if (isAyuda) {
      this.alertaTocha = true;
    }
  }

  salirAlert() {
    this.alertaaEnsenar = false;
    this.navCtrl.navigateRoot('/', {animated: true});
  }
}
