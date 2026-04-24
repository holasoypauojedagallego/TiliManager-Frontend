import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSearchbar, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { JugadorCard } from "src/app/components/jugador-card/jugador-card.component";
import { Jugador, JugadoresService, Mercado } from 'src/app/services/jugadores.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.page.html',
  styleUrls: ['./mercado.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonSearchbar, JugadorCard, IonRefresher, IonRefresherContent]
})
export class MercadoPage implements OnInit {

  jugadoresDisponibles: Jugador[] = [];
  fichable: boolean = false;

  constructor(private mercadoJugadores:JugadoresService) { }

  async ngOnInit() {
    await this.onCargar();
  }

  async onCargar() {
    const c:Mercado = await firstValueFrom(this.mercadoJugadores.getMercadoJugadores());
    console.log(c); 
    this.jugadoresDisponibles = c.players;
    this.fichable = c.fichable;
  }

    handleRefresh(event: RefresherCustomEvent) {
      setTimeout(() => {
        this.onCargar();
        event.target.complete();
      }, 1000);
    }


}
