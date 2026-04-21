import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { JugadorMiniCardComponent } from "src/app/components/jugador-mini-card/jugador-mini-card.component";
import { AuthService, Team } from 'src/app/services/auth.service';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';   

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, JugadorMiniCardComponent, DragDropModule]
})
export class EquipoPage implements OnInit {

  equipo: Team = {id : 0, name: '', players: [], owner: {name: '', email: ''}, money: 0};
  list: number = 5;

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    await this.cargarEquipo();
  }

  async cargarEquipo() {
    this.equipo = await this.auth.getSesionTeamCargado();
  }

  drop(event: CdkDragDrop<any>) {
    const previousIndex = event.previousContainer.data;
    const currentIndex = event.container.data;
    if (previousIndex != currentIndex) {
      const jugadorMovido = this.equipo.players[previousIndex];

      this.equipo.players[previousIndex] = this.equipo.players[currentIndex];
      this.equipo.players[currentIndex] = jugadorMovido;
    }
  }

  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }
}