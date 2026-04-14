import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton } from '@ionic/angular/standalone';

import { PartidosService } from '../../services/partidos.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export interface partidoEmulado {
  minuto: number;
  equipo: string;
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

  emulacion : partidoEmulado[] = [];
  tiempo : number = 0;
  enEjecucion : boolean = false;
  errorCode : boolean = false;
  golesLocal : number = 0;
  golesVisitante : number = 0;

  constructor(private partidos : PartidosService, private router : Router) { }

  ngOnInit() {
  }

  async correrTiempo() {
    for (let i = 1; i < 91; i++) {
      await new Promise(resolve => setTimeout(resolve, 333))
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
      const response = await firstValueFrom(this.partidos.simularPartido());
      for (let i = 0; i < response.length; i++) {
        this.emulacion[i] = response[i];
        if (this.emulacion[i].equipo.match("Local")) {
          this.golesLocal = this.emulacion[i].sucede;
        } else {
          this.golesVisitante = this.emulacion[i].sucede;
        }
      }
      console.log(response);

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
