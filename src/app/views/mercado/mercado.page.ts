import { Component, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSearchbar, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { Jugador, JugadoresService, Mercado } from 'src/app/services/jugadores.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { JugadorCardComprarComponent } from "src/app/components/jugador-card-comprar/jugador-card-comprar.component";

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.page.html',
  styleUrls: ['./mercado.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonSearchbar, IonRefresher, IonRefresherContent, JugadorCardComprarComponent]
})
export class MercadoPage implements OnInit {

  jugadoresDisponibles: Jugador[] = [];
  fichable: boolean = false;

  jugadorAFichar: Jugador = {id : 0, name : '', attack: 0, defense: 0, rating: 0, price : 0, teamId: 0};
  equipo = this.auth.team;
  numeroParaFichar: WritableSignal<number> = signal(7);
  dineroTotalJugadores: number = 0;
  alerta: boolean = false;

  constructor(private mercadoJugadores:JugadoresService, private auth: AuthService) { }

  async ngOnInit() {
    await this.onCargar();
  }

  async onCargar() {
    const c:Mercado = await firstValueFrom(this.mercadoJugadores.getMercadoJugadores());
    this.numeroParaFichar.set(this.equipo().players.length);
    this.jugadoresDisponibles = c.players;
    this.fichable = c.fichable;
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.onCargar();
      event.target.complete();
    }, 1000);
  }

  async ficharJugador(jugador: Jugador){
    if (this.equipo().players.length > 6) {
      this.alerta = true;
      console.log("equipo.size > 6 alerta true")
      return;
    }
    try {
      const response = await this.auth.buyPlayer(jugador);
      response.subscribe({
        next: (chachi) => {
          console.log("HIP HIP HURRAAA: ", chachi);
          this.auth.setSesionTeam();
        },
        error: (err) => console.error('Error en la venta', err)
      });
    } catch (error) {
      console.warn("Ha ocurrido un error al intentar vender al jugador", error);
    }
  }

}
