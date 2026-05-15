import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, NavController } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { JugadorMiniCardComponent } from "src/app/components/jugador-mini-card/jugador-mini-card.component";
import { AuthService, Jugador, JugadorLeague } from 'src/app/services/auth.service';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';   
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, JugadorMiniCardComponent, DragDropModule]
})
export class EquipoPage implements OnInit {

  id: number = 0;
  equipo = this.auth.team;

  constructor(private auth: AuthService, private activeRoute: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.id = Number(this.activeRoute.snapshot.paramMap.get("id"));
    if (!this.equipo()[this.id]) {
      this.navCtrl.navigateRoot('/', { animated: true });
      return;
    }
    this.auth.id.set(this.id);
  }

  drop(event: CdkDragDrop<any>) {
    const previousIndex = event.previousContainer.data;
    const currentIndex = event.container.data;
    if (previousIndex != currentIndex) {
      const jugadorMovido = this.equipo()[this.id].team.players[previousIndex];

      this.equipo()[this.id].team.players[previousIndex] = this.equipo()[this.id].team.players[currentIndex];
      this.equipo()[this.id].team.players[currentIndex] = jugadorMovido;
    }
  }

  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  async venderJugador(jugador: Jugador) {
    console.log("Vender, ", jugador);
    let jugadorFinal!: JugadorLeague;
    for(const jugadorcitos of this.equipo()[this.id].team.players) {
        if (jugadorcitos.player.id === jugador.id) {
            jugadorFinal = jugadorcitos;
        }
    }
    if (!jugadorFinal) {
        console.warn("Em supongo que ese jugador no existe, lo cual es raro porque la lista de jugadores ha pasado por aqui de antemano");
        return;
    }
    try {
      const response = await firstValueFrom(await this.auth.sellPlayer(jugadorFinal, this.id));
      console.log("HIP HIP HURRAAA: ", response);
      await this.auth.setSesionTeam();
    } catch (error) {
      console.warn("Ha ocurrido un error al intentar vender al jugador", error);
    }
  }
}