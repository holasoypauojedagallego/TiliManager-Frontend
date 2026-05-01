import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from 'src/app/services/jugadores.service';
import { IonCard, IonButton, IonAlert, IonImg, IonModal } from "@ionic/angular/standalone";

@Component({
  selector: 'app-jugador-card-comprar',
  templateUrl: './jugador-card-comprar.component.html',
  styleUrl: './jugador-card-comprar.component.scss',
  imports: [IonCard, IonButton, IonAlert, IonImg, IonModal]
})
export class JugadorCardComprarComponent {
    @Input() jugador!: Jugador;
    @Output() onFichar: EventEmitter<Jugador> = new EventEmitter<Jugador>();
    @Input() totalJugadores: number = 0;
    @Input() dineroEquipo: number = 0;
    alerta44: boolean = false
    

    alerta: boolean = false;
    alertButtons = ['Aceptar'];
    
    isModalOpen: boolean = false;
    fichajeEnviado: boolean = false;

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

    abrirModal() {
      if (this.totalJugadores >= 7) {
        this.alerta = true;
        return;
      }
      this.isModalOpen = true;
    }

    cerrarModal() {
      this.isModalOpen = false;
    }

    confirmarFichaje() {
      if (this.jugador.price > this.dineroEquipo) {
        this.alerta44 = true;
        return;
      }
      this.onFichar.emit(this.jugador);
      this.fichajeEnviado = true; 
      this.isModalOpen = false;
    }
}