import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { JugadorMiniCardComponent } from "src/app/components/jugador-mini-card/jugador-mini-card.component";
import { AuthService, Team } from 'src/app/services/auth.service';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';   
import { Jugador } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, JugadorMiniCardComponent, DragDropModule]
})
export class EquipoPage implements OnInit {

  equipo = this.auth.team;

  constructor(private auth: AuthService) { }

  ngOnInit() {}

  drop(event: CdkDragDrop<any>) {
    const previousIndex = event.previousContainer.data;
    const currentIndex = event.container.data;
    if (previousIndex != currentIndex) {
      const jugadorMovido = this.equipo().players[previousIndex];

      this.equipo().players[previousIndex] = this.equipo().players[currentIndex];
      this.equipo().players[currentIndex] = jugadorMovido;
    }
  }

  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  async venderJugador(jugador: Jugador) {
    console.log("Vender, ", jugador);
    try {
      const response = await this.auth.sellPlayer(jugador);
      response.subscribe({
        next: (chachi) => {
          console.log("HIP HIP HURRAAA: ", chachi);
          this.auth.setSesionTeam();
        },
        error: (err) => console.error('Error en la venta', err)
      });
    } catch (error) {
      console.warn("Ha ocurrido un error al intentar vender al jugador", error);
    }
  }
}