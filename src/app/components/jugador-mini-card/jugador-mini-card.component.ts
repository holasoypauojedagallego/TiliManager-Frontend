import { Component, Input, OnInit } from '@angular/core';
import { Jugador } from 'src/app/services/auth.service';
import { IonImg } from "@ionic/angular/standalone";

@Component({
  selector: 'app-jugador-mini-card',
  templateUrl: './jugador-mini-card.component.html',
  styleUrls: ['./jugador-mini-card.component.scss'],
  imports: [IonImg],
})
export class JugadorMiniCardComponent  implements OnInit {
  @Input() jugador!: Jugador;

  constructor() { }

  ngOnInit() {}

}
