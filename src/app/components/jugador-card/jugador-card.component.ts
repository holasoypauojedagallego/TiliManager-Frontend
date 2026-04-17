import { Component, Input } from '@angular/core';
import { Jugador } from 'src/app/services/jugadores.service';
import { IonCard, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-jugador-card',
  templateUrl: './jugador-card.component.html',
  styleUrl: './jugador-card.component.scss',
  imports: [IonCard, IonButton]
})
export class JugadorCard {
    @Input() jugador!: Jugador;

    smallerPrice(i: number) : String {
      if (!i || i == 0){
        return '0';
      }
      let comprobar:string = i.toString();
      const arrayComprobar:string[] = comprobar.split('000');
      comprobar = arrayComprobar.join('');
      if (arrayComprobar.length === 4){
        return comprobar + 'MM';
      } else if (arrayComprobar.length === 3) {
        return comprobar + 'M'
      } else if (arrayComprobar.length === 2) {
        return comprobar + 'K'
      } else {
        return comprobar;
      }
    }
}
