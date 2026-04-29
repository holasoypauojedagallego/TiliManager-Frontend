import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Jugador } from 'src/app/services/auth.service';
import { IonImg, IonModal, IonButton } from "@ionic/angular/standalone";
import { JugadorCard } from "../jugador-card/jugador-card.component";

@Component({
  selector: 'app-jugador-mini-card',
  templateUrl: './jugador-mini-card.component.html',
  styleUrls: ['./jugador-mini-card.component.scss'],
  imports: [IonImg, JugadorCard, IonModal, IonButton],
})
export class JugadorMiniCardComponent  implements OnInit {
  @Input() jugador!: Jugador;
  @Output() onVender: EventEmitter<Jugador> = new EventEmitter<Jugador>();
  @Input() totalJugadores: number = 0;
  alerta = false;
  alerta2 = false;

  constructor() { }

  ngOnInit() {}

  onSell() {
    if (this.totalJugadores <=  5){
      this.alerta2 = true;
      return;
    }
    this.onVender.emit(this.jugador);
    this.alerta = false;
  }

}
