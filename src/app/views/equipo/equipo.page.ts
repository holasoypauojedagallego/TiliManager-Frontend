import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { Jugador, JugadoresService } from '../../services/jugadores.service';
import { firstValueFrom } from 'rxjs';
import { PruebaComponent } from "src/app/components/jugador-card/jugador-card.component";

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PruebaComponent, IonItem, IonInput, IonButton]
})
export class EquipoPage implements OnInit {

  jugadoresSinEquipo: Jugador[] = [];

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

}
