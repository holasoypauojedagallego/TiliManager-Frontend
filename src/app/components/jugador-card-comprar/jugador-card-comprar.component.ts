import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from 'src/app/services/jugadores.service';
import { IonCard, IonButton, IonAlert, IonImg, IonModal } from "@ionic/angular/standalone";

@Component({
  selector: 'app-jugador-card-comprar',
  templateUrl: './jugador-card-comprar.component.html',
  styleUrl: './jugador-card-comprar.component.scss',
  imports: [IonCard, IonButton, IonAlert, IonImg, IonModal] // <-- Añadido IonModal
})
export class JugadorCardComprar {
    @Input() jugador!: Jugador;
    @Output() onFichar: EventEmitter<Jugador> = new EventEmitter<Jugador>();
    @Input() totalJugadores: number = 0;
    @Input() dineroEquipo: number = 0;
    alerta44: boolean = false
    
    // Si viene del padre y es true, el mercado está cerrado
    @Input() isFichable: boolean = false; 

    alerta: boolean = false;
    alertButtons = ['Aceptar'];
    
    // Nuevas variables para el flujo del modal
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
      // 1. Validamos antes de abrir el modal
      if (this.totalJugadores >= 7) {
        this.alerta = true;
        return;
      }
      // 2. Abrimos el modal
      this.isModalOpen = true;
    }

    cerrarModal() {
      this.isModalOpen = false;
    }

    confirmarFichaje() {
      if (this.jugador.price >this.dineroEquipo) {
        this.alerta44 = true;
        return;
        // Activar alerta o algo
      }
      // 1. Emitimos al padre
      this.onFichar.emit(this.jugador);
      // 2. Cambiamos el estado visual
      this.fichajeEnviado = true; 
      // 3. Cerramos el modal
      this.isModalOpen = false;
    }
}