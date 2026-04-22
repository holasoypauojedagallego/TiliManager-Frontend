import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User } from './auth.service';

export interface Jugador {
  id: number;
  name: string;
  rating: number;
  attack: number;
  defense: number;
}

export interface Team {
  id: number;
  name: string;
  owner: User;
  players: Jugador[];
  money: number;
}

export interface PartidoEmulado {
  minuto: number;
  equipo: Team;
  jugador: Jugador;
  local: boolean;
  sucede: number;
}

@Injectable({
  providedIn: 'root',
})

export class PartidosService {

  private apiURL = "http://127.0.0.1:8080/jpa/api/v1"; // Esta va en casa, hay que cambiar esto obviamente a ver que hago para que vaya desde cualquier sitio mecachis
  // http://192.168.3.142:8080/jpa/api/v1 - http://192.168.1.137:8080/jpa/api/v1 - http://127.0.0.1:8080/jpa/api/v1
  constructor(private http: HttpClient, private auth: AuthService) {}

  simularPartido() : Observable<any> {
    return this.http.get(`${this.apiURL}/partidos`);
  }

  async simularPartidoTorneo1() : Promise<Observable<any>> {
    const data = await this.auth.getTeamSesion();
    if (data == null) {
      return new Observable<any>;
    }
    const equipo:Team = {
      id: data.id,
      name: data.name,
      owner: data.owner,
      players: data.players,
      money: data.money
    }
    return this.http.post(`${this.apiURL}/partidos/t1`, equipo);
  }

}
