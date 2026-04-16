import { Component, Input } from '@angular/core';
import { Jugador } from 'src/app/services/jugadores.service';
import { IonCard } from "@ionic/angular/standalone";

@Component({
  selector: 'app-jugador-card',
  templateUrl: './jugador-card.component.html',
  styleUrl: './jugador-card.component.scss',
  imports: [IonCard]
})
export class PruebaComponent {
    @Input() jugador!: Jugador;

    splitName(s: string) : string {
      return s.split(' ')[0];
    }
}
