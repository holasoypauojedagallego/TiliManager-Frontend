import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from 'src/app/services/jugadores.service';
import { IonCard, IonButton, IonAlert } from "@ionic/angular/standalone";

@Component({
  selector: 'app-jugador-card',
  templateUrl: './jugador-card.component.html',
  styleUrl: './jugador-card.component.scss',
  imports: [IonCard, IonButton, IonAlert]
})
export class JugadorCard {
    @Input() jugador!: Jugador;
    @Output() onFichar: EventEmitter<Jugador> = new EventEmitter<Jugador>();
    @Input() totalJugadores: number = 0;

    fichable: boolean = true;
    alerta: boolean = false;
    alertButtons = ['Aceptar'];

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

    onClick() {
      if (this.totalJugadores >= 7 && this.fichable){
        this.alerta = true;
        return;
      }
      this.onFichar.emit(this.jugador);
      this.fichable = !this.fichable; 
    }

}
