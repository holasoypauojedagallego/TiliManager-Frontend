import { Component, Input } from '@angular/core';
import { Jugador } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-jugador-card',
  templateUrl: './jugador-card.component.html',
  styleUrl: './jugador-card.component.scss'
})
export class PruebaComponent {
    @Input() jugador!: Jugador;
}
