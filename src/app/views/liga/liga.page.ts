import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonRefresher, IonRefresherContent, RefresherCustomEvent, NavController, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonBadge, IonNote, IonAvatar } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { League, LeaguesService, LeagueTeam } from 'src/app/services/leagues.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.page.html',
  styleUrls: ['./liga.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonButton, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonBadge, IonNote, IonAvatar]
})
export class LigaPage implements OnInit {

  private liga_vacia: League = {id: 0, name: '', owner: {name: '', email: ''}, teams: [], closed: false};

  id: number = 0;
  league = signal<League>(this.liga_vacia);

  constructor(private leagueService: LeaguesService, private activeRouter: ActivatedRoute, private auth: AuthService, private navCtrl: NavController) { }

  async ngOnInit() {
    await this.onCargar();
  }

  async onCargar() {
    this.id = Number(this.activeRouter.snapshot.paramMap.get("id"));
    try {
      this.league.set(await firstValueFrom(this.leagueService.getLeague(this.id)));
      this.auth.id.set(this.id);
    } catch (error) {
      console.warn("Ha habido un error")
    }
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

  get sortedTeams() {
    const teams = this.league()?.teams || [];
    return [...teams].sort((a, b) => {
      const pointsA = this.calcularPuntos(a);
      const pointsB = this.calcularPuntos(b);
      if (pointsB !== pointsA) return pointsB - pointsA;
      return (b.goalsScored - b.goalsReceived) - (a.goalsScored - a.goalsReceived);
    });
  }

}
