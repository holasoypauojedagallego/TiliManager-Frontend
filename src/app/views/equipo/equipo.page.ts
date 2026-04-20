import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonReorderGroup, IonReorder, IonItem, ReorderEndCustomEvent } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { JugadorMiniCardComponent } from "src/app/components/jugador-mini-card/jugador-mini-card.component";
import { AuthService, Team } from 'src/app/services/auth.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, JugadorMiniCardComponent, IonList, IonReorderGroup, IonReorder, IonItem]
})
export class EquipoPage implements OnInit {

  equipo: Team = {id : 0, name: '', players: [], owner: {name: '', email: ''}, money: 0};

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    await this.cargarEquipo();
  }

  async cargarEquipo() {
    this.equipo = await this.auth.getSesionTeamCargado();
  }

  handleReorderEnd(event: ReorderEndCustomEvent) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group.
    event.detail.complete();
  }

}
