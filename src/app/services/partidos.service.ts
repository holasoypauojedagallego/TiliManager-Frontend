import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService, Team, Jugador, SecretTeam } from './auth.service';

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

  private apiURL = "http://192.168.1.137:8080/jpa/api/v1"; // Esta va en casa, hay que cambiar esto obviamente a ver que hago para que vaya desde cualquier sitio mecachis
  // http://192.168.3.142:8080/jpa/api/v1 - http://192.168.1.137:8080/jpa/api/v1 - http://127.0.0.1:8080/jpa/api/v1
  private varhistorialPartidos: Match[] = [];
  
  constructor(private http: HttpClient, private auth: AuthService) {}

  simularPartido() : Observable<any> {
    return this.http.get(`${this.apiURL}/partidos`);
  }

  historialPartidos() : Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiURL}/partidos/history`);
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

    async onCargar() {
      this.varhistorialPartidos = (await firstValueFrom(this.historialPartidos())).reverse();
    }

    getHistorialPartido(): Match[] {
      return this.varhistorialPartidos;
    }

}
