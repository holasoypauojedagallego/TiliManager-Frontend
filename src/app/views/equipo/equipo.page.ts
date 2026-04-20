import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonReorderGroup, IonReorder, IonItem, ReorderEndCustomEvent, IonItemDivider, IonLabel } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { JugadorMiniCardComponent } from "src/app/components/jugador-mini-card/jugador-mini-card.component";
import { AuthService, Jugador, Team } from 'src/app/services/auth.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';   

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItemDivider, IonContent, CommonModule, FormsModule, HeaderComponent, JugadorMiniCardComponent, IonList, IonReorderGroup, IonReorder, DragDropModule, IonItem]
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.equipo.players, event.previousIndex, event.currentIndex);
  }
}