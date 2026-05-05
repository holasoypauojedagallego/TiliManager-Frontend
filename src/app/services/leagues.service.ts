import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService, SecretTeam, SecretUser, Team, User } from './auth.service';

export interface League {
    id: number,
    name: string,
    owner: User,
    teams: LeagueTeam[],
    closed: boolean
}

export interface LeagueTeam {
    id: number,
    league: number,
    team: Team,
    wins: number,
    losses: number,
    draws: number,
    goalsScored: number,
    goalsRecieved: number,
}

export interface DeleteLeague {
    id: number,
    name: string,
    owner: SecretUser
}

export interface CreateLeague {
    name: string,
    owner: SecretUser
    closed: boolean
}

@Injectable({
  providedIn: 'root',
})

export class LeaguesService {

  private apiURL = environment.apiUrl;
  
  constructor(private http: HttpClient, private auth:AuthService) {}

  getLeagues() : Observable<League[]> {
    return this.http.get<League[]>(`${this.apiURL}/ligas`);
  }

  async createLeague(name: string, privado: boolean): Promise<any> {
    const user = await this.auth.getSesion();
    if (user == null) {
        throw new Error("No hay sesión de usuario");
    }

    const league: CreateLeague = {
        name: name,
        owner: user,
        closed: privado
    };

    return await lastValueFrom(this.http.post(`${this.apiURL}/ligas`, league));
  }

  async deleteLeague(id: number, name: string): Promise<any> {
    const user = await this.auth.getSesion();
    if (user == null) {
        throw new Error("No hay sesión de usuario");
    }

    const delLeague: DeleteLeague = {
        id: id,
        name: name,
        owner: user,
    };

    // JS e TS es loco, no puedo pasar un 'body' como en un Post, hay que hacer una locura, un options y el body dentro
    const options = {
        body: delLeague
    };

    return await lastValueFrom(this.http.delete(`${this.apiURL}/ligas`, options));
  }

  async addTeamToLeague(id: number, equipo: Team): Promise<any> {
    const user = await this.auth.getSesion();
    if (user == null) {
        throw new Error("No hay sesión de usuario");
    }

    const team: SecretTeam = {
        id: equipo.id,
        name: equipo.name,
        owner: user,
        players: equipo.players,
        money: equipo.money
    };

    return await lastValueFrom(this.http.post(`${this.apiURL}/ligas/add/${id}`, team));
  }


}
