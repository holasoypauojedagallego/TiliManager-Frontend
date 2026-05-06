import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { League, LeaguesService, LeagueTeam } from 'src/app/services/leagues.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.page.html',
  styleUrls: ['./liga.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonButton]
})
export class LigaPage implements OnInit {

  private liga_vacia: League = {id: 0, name: '', owner: {name: '', email: ''}, teams: [], closed: false};

  id: number = 0;
  league = signal<League>(this.liga_vacia);

  constructor(private leagueService: LeaguesService, private activeRouter: ActivatedRoute) { }

  async ngOnInit() {
    this.id = Number(this.activeRouter.snapshot.paramMap.get("id"));
    try {
      this.league.set(await firstValueFrom(this.leagueService.getLeague(this.id)));
    } catch (error) {
      console.warn("Ha habido un error")
    }
  }

  diferenciaGoles(goles: number, recibidos: number): string {
    console.log(goles, recibidos);
    return (goles - recibidos).toString();
  }

  calcularPuntos(team: LeagueTeam) : number{
    return ((team.wins * 3) + team.draws);
  }

  get sortedTeams() {
    const teams = this.league()?.teams || [];
    return [...teams].sort((a, b) => {
      const pointsA = this.calcularPuntos(a);
      const pointsB = this.calcularPuntos(b);
      if (pointsB !== pointsA) return pointsB - pointsA;
      return (b.goalsScored - b.goalsRecieved) - (a.goalsScored - a.goalsRecieved);
    });
  }

}
