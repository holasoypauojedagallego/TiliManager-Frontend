import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Jugador {
  id: number;
  name: string;
  rating: number;
  attack: number;
  defense: number;
  teamId: number | null;
  price: number;
}

@Injectable({
  providedIn: 'root',
})

export class JugadoresService {

  private apiURL = "http://192.168.3.142:8080/jpa/api/v1"; // Esta va en casa, hay que cambiar esto obviamente a ver que hago para que vaya desde cualquier sitio mecachis
  // http://192.168.3.142:8080/jpa/api/v1 - http://192.168.1.137:8080/jpa/api/v1 - http://127.0.0.1:8080/jpa/api/v1
  constructor(private http: HttpClient) {}

  getJugadores() : Observable<any> {
    return this.http.get(`${this.apiURL}/jugadores`);
  }

}
