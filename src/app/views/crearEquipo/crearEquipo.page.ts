import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonAlert, IonIcon } from '@ionic/angular/standalone';
import { Jugador, JugadoresService } from '../../services/jugadores.service';
import { firstValueFrom } from 'rxjs';
import { JugadorCard } from "src/app/components/jugador-card/jugador-card.component";
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crearEquipo.page.html',
  styleUrls: ['./crearEquipo.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, JugadorCard, IonItem, IonInput, IonButton, IonAlert, IonIcon, HeaderComponent]
})
export class CrearEquipoPage implements OnInit {

  jugadoresSinEquipo: Jugador[] = [];

  alerta: boolean = true;
  alertButtons = ['Aceptar'];

  constructor(private jugadores : JugadoresService) { }

  async ngOnInit() {
    try {
      const response : Jugador[] = await firstValueFrom(this.jugadores.getJugadores());
      for (let i = 0 ; i < response.length; i++) {  
        if (response[i].teamId === null) {
          this.jugadoresSinEquipo.push(response[i]);
        }
      }
    } catch (error) {
      console.error("Ha ocurrido un error")
    }
  }

  acabarAlerta(){
    this.alerta = false;
  }

}
