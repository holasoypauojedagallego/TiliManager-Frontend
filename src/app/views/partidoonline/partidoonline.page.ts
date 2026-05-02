import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, NavController, IonButton, IonImg, IonIcon } from '@ionic/angular/standalone';
import { PartidoEmulado, PartidosService } from 'src/app/services/partidos.service';
import { firstValueFrom } from 'rxjs';
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: 'app-partidoonline',
  templateUrl: './partidoonline.page.html',
  styleUrls: ['./partidoonline.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, IonButton, IonImg, IonIcon, HeaderComponent]
})
export class PartidoonlinePage implements OnInit {

  enEjecucion : boolean = false;
  errorCode : boolean = false;

  emulacion : PartidoEmulado[] = [];
  tiempo : number = 0;

  ownerLocal : string = '';
  ownerVisitante : string = '';
  nombreLocal : string = '';
  nombreVisitante : string = '';
  golesLocal : number = 0;
  golesVisitante : number = 0;

  @ViewChild('scroll') scroll!: ElementRef; 

  constructor(private partidos : PartidosService, private navCtrl : NavController) { }

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
      const response = await firstValueFrom(await this.partidos.simularPartidoOnline());
      for (let i = 0; i < response.length; i++) {
        this.emulacion[i] = response[i];
        if(this.emulacion[i].local && !local){
          this.nombreLocal = this.emulacion[i].equipo.name;
          this.ownerLocal = this.emulacion[i].equipo.owner.name;
          local = true;
        } else if (!this.emulacion[i].local && !visitor) {
          this.nombreVisitante = this.emulacion[i].equipo.name;
          this.ownerVisitante = this.emulacion[i].equipo.owner.name;
          visitor = true;
        }
      }
      await this.correrTiempo();

    } catch (error) {
      this.errorCode = true;
    } finally {this.enEjecucion = false;}

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    } catch (error) {
      console.warn(error);
    }
  }

  goToHome(){
    if (document.activeElement instanceof HTMLElement){
      document.activeElement.blur();
    }
    this.navCtrl.navigateRoot('/', {animated : true});
  }
}
