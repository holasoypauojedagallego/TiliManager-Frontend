import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences'

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

export interface Team {
  id: number;
  name: string;
  owner: User;
  playerss: Jugador[];
}

export interface SecretUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginRequest {
  email : string;
  password : string;
}

export interface RegisterRequest {
  name : string;
  email : string;
  password : string;
}

export interface EmailRegisteredRequest {
  email : string;
}

export interface NameRegisteredRequest {
  name : string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiURL = "http://127.0.0.1:8080/jpa/api/v1"; // Esta va en casa, hay que cambiar esto obviamente a ver que hago para que vaya desde cualquier sitio mecachis
  // http://192.168.3.142:8080/jpa/api/v1 - http://192.168.1.137:8080/jpa/api/v1 - http://127.0.0.1:8080/jpa/api/v1 - http://192.168.3.23:8080/jpa/api/v1

  constructor(private http: HttpClient) {}

  login(data : LoginRequest) : Observable<any> {
    return this.http.post(`${this.apiURL}/users/login`, data);
  }

  register(data : RegisterRequest) : Observable<any> {
    return this.http.post(`${this.apiURL}/users/register`, data);
  }

  emailRegistered(data : EmailRegisteredRequest) : Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/users/exists/email/${data}`);
  }

  nameRegistered(data : NameRegisteredRequest) : Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/users/exists/name/${data}`);
  }

  getTeam(data : SecretUser) : Observable<Team> {
    return this.http.post<Team>(`${this.apiURL}/equipos/owner`, data);
  }

  async setSesion(user: SecretUser) {
    await Preferences.set({
      key: "usuario",
      value: JSON.stringify(user)
    });
  }

  async getSesion() : Promise<SecretUser | null> {
    const {value} = await Preferences.get({key: "usuario"});
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  async removeSesion(){
    await Preferences.remove({key: "usuario"});
  }

}
