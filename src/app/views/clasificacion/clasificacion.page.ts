import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRefresher, IonRefresherContent, RefresherCustomEvent, NavController, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { League, LeaguesService, LeagueTeam } from 'src/app/services/leagues.service';
import { firstValueFrom } from 'rxjs';
import { AuthService, JugadorLeague } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.page.html',
  styleUrls: ['./clasificacion.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonRefresher, IonRefresherContent, IonRow, IonCol, IonGrid]
})
export class ClasificacionPage implements OnInit {

    private liga_vacia: League = {id: 0, name: '', owner: {name: '', email: ''}, teams: [], closed: false};
  
    id: number = 0;
    league = signal<League>(this.liga_vacia);
  
    jugadores: JugadorLeague[] = [];
  
    constructor(private leagueService: LeaguesService, private activeRouter: ActivatedRoute, private auth: AuthService, private navCtrl: NavController) { }
  
    async ngOnInit() {
      await this.onCargar();
    }
  
    async onCargar() {
      this.id = Number(this.activeRouter.snapshot.paramMap.get("id"));
      try {
        this.league.set(await firstValueFrom(this.leagueService.getLeague(this.id)));
        this.goleadores();
        this.auth.id.set(this.id);
      } catch (error) {
        console.warn("Ha habido un error")
      }
      this.equiposOrden();
    }
  
      handleRefresh(event: RefresherCustomEvent) {
        setTimeout(async () => {
          await this.onCargar();
          event.target.complete();
        }, 1000);
      }
  
    diferenciaGoles(goles: number, recibidos: number): string {
      return (goles - recibidos).toString();
    }
  
    calcularPuntos(team: LeagueTeam) : number{
      return ((team.wins * 3) + team.draws);
    }
  
    jugarPartido() {
      this.navCtrl.navigateForward(`/partidoliga/${this.id}`, {animated: true});
    }
  
    equipoJugador(teamid: number) : string | undefined {
      return this.league().teams.find(team => teamid === team.team.id)?.team.name;
    }
  
    equiposOrden() {
      this.league().teams.sort((a, b) => {
        const pointsA = this.calcularPuntos(a);
        const pointsB = this.calcularPuntos(b);
        if (pointsB !== pointsA) return pointsB - pointsA;
        return (b.goalsScored - b.goalsReceived) - (a.goalsScored - a.goalsReceived);
      });
    }
  
    goleadores() {
      this.jugadores = [];
      this.league().teams.forEach(team => {
        if (team.team.players) {
        team.team.players.map( player => {
          this.jugadores.push(player);
        });
        }
      });
  
      this.jugadores.sort((a, b) => (b.goles) - (a.goles));
      this.jugadores.splice(12,9999);
    }

}
