import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences'
import { environment } from 'src/environments/environment';

export interface User {
  name: string;
  email: string;
}

export interface Jugador {
  id: number;
  name: string;
  rating: number;
  attack: number;
  defense: number;
  teamId: number | null;
  price: number;
}

export interface LeagueTeamIdDTO {
  id: number
}

export interface Team {
  id: number;
  name: string;
  owner: User;
  players: Jugador[];
  money: number;
  leagueTeam: LeagueTeamIdDTO;
}

export interface LeagueTeam {
  id: number,
  league: { id: number, name: string },
  team: Team,
  wins: number,
  losses: number,
  draws: number,
  points: number,
  goalsScored: number,
  goalsRecieved: number,
}

export interface League {
  id: number,
  name: string,
  owner: User,
  teams: LeagueTeam[],
  closed: boolean
}

export interface DictionaryLeagueTeam {
  [leagueId: number]: LeagueTeam;
}

export interface SecretTeam {
  id: number;
  name: string;
  owner: SecretUser;
  players: Jugador[];
  money: number;
}

export interface SecretUser {
  id: string;
  name: string;
  email: string;
}

export interface SellTeam {
  teamUpdateDTO: SecretTeam;
  player: Jugador;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiURL = environment.apiUrl;

  private pereza_UserVacio: User = {
    name: '',
    email: ''
  };

  private userSignal = signal<User>(this.pereza_UserVacio);
  public user = this.userSignal.asReadonly();

  private pereza_teamVacio: Team = {
    id: 0,
    name: '',
    owner: this.user(),
    players: [],
    money: 0,
    leagueTeam: { id: 0 }
  };

  private pereza_LeagueTeamVacio: LeagueTeam = {
    id: 0,
    league: { id: 0, name: '' },
    team: this.pereza_teamVacio,
    wins: 0,
    draws: 0,
    losses: 0,
    points: 0,
    goalsScored: 0,
    goalsRecieved: 0
  };

  private teamSignal = signal<DictionaryLeagueTeam>({});
  public team = this.teamSignal.asReadonly();

  constructor(private http: HttpClient) {
    this.initUserFromStorage();
  }

  private async initUserFromStorage() {
    const user = await this.getSesion();
    const leagueTeam = await this.getTeamSesion();
    if (user == null || leagueTeam == null) {
      return;
    }
    this.userSignal.set(user);
    this.teamSignal.set(leagueTeam);
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiURL}/users/login`, data);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiURL}/users/register`, data);
  }

  emailRegistered(data: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/users/exists/email/${data}`);
  }

  nameRegistered(data: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/users/exists/name/${data}`);
  }

  getTeam(data: SecretUser): Observable<Team> {
    return this.http.post<Team>(`${this.apiURL}/equipos/owner`, data);
  }

  getLeagueTeam(data: SecretUser): Observable<LeagueTeam[]> {
    return this.http.post<LeagueTeam[]>(`${this.apiURL}/equipo-ligas`, data);
  }

  teamNameRegistered(data: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/equipos/exists/name/${data}`);
  }

  async sellPlayer(player: Jugador): Promise<Observable<Team>> {
    const dictionaryLeagueTeam = await this.getTeamSesion();
    const user = await this.getSesion();

    if (!dictionaryLeagueTeam || !user) {
      throw new Error("No se encontró el equipo o el usuario en la sesión para realizar la venta.");
    }
    const team: Team = dictionaryLeagueTeam[676767].team; // ARREGLAR EN UN FUTURO TODO
    const teamUpdateDTO: SecretTeam = {
      id: team.id,
      name: team.name,
      owner: user,
      players: team.players,
      money: team.money
    };

    const data: SellTeam = {
      teamUpdateDTO: teamUpdateDTO,
      player: player
    };

    return this.http.put<Team>(`${this.apiURL}/equipos/vender`, data);
  }

  async buyPlayer(player: Jugador): Promise<Observable<Team>> {
    const dictionaryLeagueTeam = await this.getTeamSesion();
    const user = await this.getSesion();

    if (!dictionaryLeagueTeam || !user) {
      throw new Error("No se encontró el equipo o el usuario en la sesión para realizar la venta.");
    }
    const team: Team = dictionaryLeagueTeam[676767].team; // ARREGLAR EN UN FUTURO TODO
    const teamUpdateDTO: SecretTeam = {
      id: team.id,
      name: team.name,
      owner: user,
      players: team.players,
      money: team.money
    };

    const data: SellTeam = {
      teamUpdateDTO: teamUpdateDTO,
      player: player
    };

    return this.http.put<Team>(`${this.apiURL}/equipos/comprar`, data);
  }

  async updateTeam(name: string, players: Jugador[], money: number): Promise<Observable<any> | undefined> {
    const dictionaryLeagueTeam: DictionaryLeagueTeam | null = await this.getTeamSesion();
    let user: SecretUser | null = await this.getSesion();
    if (dictionaryLeagueTeam == null || user == null) {
      console.warn("No hay usuario o equipo");
      return;
    }
    const team: Team = dictionaryLeagueTeam[676767].team; // ARREGLAR EN UN FUTURO TODO
    const teamFinal: SecretTeam = {
      id: team.id = team.id,
      name: name = name,
      owner: user = user,
      players: players = players,
      money: team.money = team.money - money
    }

    const t = await this.http.put<SecretTeam>(`${this.apiURL}/equipos`, teamFinal);
    await this.removeTeamSesion();
    this.setSesionTeam();
    return t;
  }

  async setSesion(user: SecretUser) {
    await this.removeSesion();
    await Preferences.set({
      key: "usuario",
      value: JSON.stringify(user)
    });
    const normalUsere: User = {
      name: user.name,
      email: user.email
    }
    this.userSignal.set(normalUsere);
    await this.setSesionTeam();
  }

  async setSesionTeam() {
    const secretUser: SecretUser | null = await this.getSesion();
    if (secretUser == null) {
      return;
    }
    const leagueTeam: LeagueTeam[] = await firstValueFrom(this.getLeagueTeam(secretUser));
    const dictionaryLeagueTeam: DictionaryLeagueTeam = {};
    for (const lteam of leagueTeam) {
      const idleague = lteam.league.id;
      dictionaryLeagueTeam[idleague] = lteam;
    }
    await Preferences.set({
      key: "equipo_por_liga",
      value: JSON.stringify(dictionaryLeagueTeam)
    });
    this.teamSignal.set(dictionaryLeagueTeam);
  }

  async getSesion(): Promise<SecretUser | null> {
    const { value } = await Preferences.get({ key: "usuario" });
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  async getTeamSesion(): Promise<DictionaryLeagueTeam | null> {
    const { value } = await Preferences.get({ key: "equipo_por_liga" });
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  async getMoney(): Promise<number> {
    const teamreciencogido = await this.getTeamSesion();
    let team: Team = this.pereza_teamVacio;
    if (teamreciencogido && teamreciencogido != null) {
      team = teamreciencogido[676767].team; // NECESITARA REVISION TODO !! (basicamente, se le tendra que pasar el valor del id de la liga)
    }
    return team.money;
  }

  async removeSesion() {
    await Preferences.remove({ key: "usuario" });
    await Preferences.remove({ key: "equipo_por_liga" });
    this.userSignal.set(this.pereza_UserVacio);
    this.teamSignal.set({});
  }

  async removeTeamSesion() {
    await Preferences.remove({ key: "equipo_por_liga" });
    this.teamSignal.set({});
  }

  async clear() {
    await Preferences.clear();
    this.userSignal.set(this.pereza_UserVacio);
    this.teamSignal.set({});
  }

}
