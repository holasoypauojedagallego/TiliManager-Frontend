import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton } from '@ionic/angular/standalone';

import { Jugador, PartidosService, Team } from '../../services/partidos.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export interface partidoEmulado {
  minuto: number;
  equipo: Team;
  jugador: Jugador;
  local: boolean;
  sucede: number;
}

@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton]
})
export class PartidoPage implements OnInit {

  enEjecucion : boolean = false;
  errorCode : boolean = false;

  emulacion : partidoEmulado[] = [];
  tiempo : number = 0;

  ownerLocal : string = '';
  ownerVisitante : string = '';
  nombreLocal : string = '';
  nombreVisitante : string = '';
  golesLocal : number = 0;
  golesVisitante : number = 0;

  constructor(private partidos : PartidosService, private router : Router) { }

  ngOnInit() {
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
      let local :boolean = false;
      let visitor :boolean = false;
      const response = await firstValueFrom(this.partidos.simularPartido());
      for (let i = 0; i < response.length; i++) {
        this.emulacion[i] = response[i];
        if(this.emulacion[i].local && !local){
          this.nombreLocal = this.emulacion[i].equipo.name;
          this.ownerLocal = this.emulacion[i].equipo.owner;
          local = true;
        } else if (!this.emulacion[i].local && !visitor) {
          this.nombreVisitante = this.emulacion[i].equipo.name;
          this.ownerVisitante = this.emulacion[i].equipo.owner;
          visitor = true;
        }
      }
      console.log(this.emulacion);  
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
