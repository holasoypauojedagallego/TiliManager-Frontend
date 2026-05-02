import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService, Team, Jugador, SecretTeam } from './auth.service';
import { environment } from 'src/environments/environment';

export interface PartidoEmulado {
  minuto: number;
  equipo: Team;
  jugador: Jugador;
  local: boolean;
  sucede: number;
  golesLocal: number;
  golesVisitante: number;
}

export interface Match {
  id: number;
  date: Date;
  localTeam: Team;
  visitorTeam: Team;
  partidoEncapsulado: PartidoEmulado[];
  localTeamGoals: number;
  visitorTeamGoals: number;
}

@Injectable({
  providedIn: 'root',
})

export class PartidosService {

  private apiURL = environment.apiUrl;
  
  private varhistorialPartidos: Match[] = [];
  
  constructor(private http: HttpClient, private auth: AuthService) {}

  simularPartido() : Observable<any> {
    return this.http.get(`${this.apiURL}/partidos`);
  }

  historialPartidos() : Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiURL}/partidos/history`);
  }

  historialPartidoById(id: number) : Observable<Match> {
    return this.http.get<Match>(`${this.apiURL}/partidos/history/${id}`);
  }

  async simularPartidoTorneo1() : Promise<Observable<any>> {
    const dataTeam = await this.auth.getTeamSesion();
    const dataUser = await this.auth.getSesion();
    if (dataTeam == null || dataUser == null) {
      return new Observable<any>;
    }
    const equipo:SecretTeam = {
      id: dataTeam.id,
      name: dataTeam.name,
      owner: dataUser,
      players: dataTeam.players,
      money: dataTeam.money
    }
    return this.http.post(`${this.apiURL}/partidos/t1`, equipo);
  }

  async simularPartidoOnline() : Promise<Observable<any>> {
    const dataTeam = await this.auth.getTeamSesion();
    const dataUser = await this.auth.getSesion();
    if (dataTeam == null || dataUser == null) {
      return new Observable<any>;
    }
    const equipo:SecretTeam = {
      id: dataTeam.id,
      name: dataTeam.name,
      owner: dataUser,
      players: dataTeam.players,
      money: dataTeam.money
    }
    return this.http.post(`${this.apiURL}/partidos`, equipo);
  }

  async onCargar() {
    this.varhistorialPartidos = (await firstValueFrom(this.historialPartidos())).reverse();
  }

  getHistorialPartido(): Match[] {
    return this.varhistorialPartidos;
  }

}
