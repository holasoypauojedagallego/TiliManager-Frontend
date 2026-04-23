import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';

import { Match, PartidoEmulado, PartidosService, } from '../../services/partidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, HeaderComponent, IonImg]
})
export class PartidoPage implements OnInit {

  enEjecucion : boolean = false;
  errorCode : boolean = false;

  emulacion : PartidoEmulado[] = [];
  tiempo : number = 0;

  id: number = 0;

  ownerLocal : string = '';
  ownerVisitante : string = '';
  nombreLocal : string = '';
  nombreVisitante : string = '';
  golesLocal : number = 0;
  golesVisitante : number = 0;

  constructor(private partidos : PartidosService, private router : Router, private activeRouter: ActivatedRoute) {}

  ngOnInit() {
    this.id = Number(this.activeRouter.snapshot.paramMap.get("id"));
  }

  async correrTiempo() {
    for (let i = 1; i < 91; i++) {
      await new Promise(resolve => setTimeout(resolve, 333));
      this.emulacion.forEach(e => {
        if (e.minuto == i) {
          if (e.equipo.name.match(this.nombreLocal)) {
            this.golesLocal = e.sucede;
          } else {
            this.golesVisitante = e.sucede;
          }
        }
      });
      this.tiempo = i;
    }
  }

  async codigo() {
    if (this.enEjecucion) {
      console.warn("Ya hay una ejecución en curso")
      return;
    }
    this.enEjecucion = true;
    this.errorCode = false;
    this.tiempo = 0;
    this.golesLocal = 0;
    this.golesVisitante = 0;
    this.emulacion = [];

    try {
      const response: Match = await firstValueFrom(this.partidos.historialPartidoById(this.id));
      console.log(response);
      for (let i = 0; i < response.partidoEncapsulado.length; i++) {
        this.emulacion[i] = response.partidoEncapsulado[i];
      }
      this.nombreLocal = response.localTeam.name;
      this.ownerLocal = response.localTeam.owner.name;
      this.nombreVisitante = response.visitorTeam.name;
      this.ownerVisitante = response.visitorTeam.owner.name;
      await this.correrTiempo();

    } catch (error) {
      this.errorCode = true;
    } finally {this.enEjecucion = false;}

  }

  goToHome(){
    if (document.activeElement instanceof HTMLElement){
      document.activeElement.blur();
    }
    this.router.navigate(['/']);
  }
}
