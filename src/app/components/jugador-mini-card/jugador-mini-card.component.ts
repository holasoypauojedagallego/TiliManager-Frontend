import { Component, Input, OnInit } from '@angular/core';
import { Jugador } from 'src/app/services/auth.service';
import { IonImg, IonModal, IonButton } from "@ionic/angular/standalone";
import { JugadorCard } from "../jugador-card/jugador-card.component";
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-jugador-mini-card',
  templateUrl: './jugador-mini-card.component.html',
  styleUrls: ['./jugador-mini-card.component.scss'],
  imports: [IonImg, JugadorCard, IonModal, CdkDragPlaceholder, IonButton],
})
export class JugadorMiniCardComponent  implements OnInit {
  @Input() jugador!: Jugador;
  alerta = false;

  constructor() { }

  ngOnInit() {}

}
