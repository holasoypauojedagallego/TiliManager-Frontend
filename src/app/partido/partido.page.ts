import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton } from '@ionic/angular/standalone';

import { PartidosService } from '../services/partidos.service';
import { window } from 'rxjs';
import { Router } from '@angular/router';

export interface partidoEmulado {
  minuto: number;
  sucede: string;
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

  constructor(private partidos : PartidosService, private router : Router) { }

  ngOnInit() {
  }

  async correrTiempo() {
    for (let i = 1; i < 91; i++) {
      await new Promise(resolve => setTimeout(resolve, 400))
      this.tiempo = i;
    }
  }

  async codigo() {
    if (this.enEjecucion) {
      console.warn("Ya hay una ejecución en curso");
      return;
    }
    this.enEjecucion = true;
    this.tiempo = 0;
    this.partidos.simularPartido().subscribe({
      next: (response) => {
        for (let i = 0; i < response.length; i++) {
          this.emulacion[i] = response[i];
          console.log("Respuesta: ", response[i]);
          console.log("Emulacion: ", this.emulacion[i]);
        }
      }
    });
    await this.correrTiempo();
    this.enEjecucion = false;
  }

  reload() {
    this.emulacion = [];
    this.tiempo = 0;
    this.codigo();
  }

}
