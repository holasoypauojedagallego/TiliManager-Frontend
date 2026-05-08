import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Jugador {
  id: number;
  name: string;
  rating: number;
  attack: number;
  defense: number;
  teamId: number | null;
  price: number;
}

export interface Mercado {
  players: Jugador[],
  fichable: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class JugadoresService {

  private apiURL = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getJugadores() : Observable<any> {
    return this.http.get(`${this.apiURL}/jugadores`);
  }

  getJugadoresTeamIdNull(id: string) : Observable<any> {
    return this.http.get(`${this.apiURL}/jugadores_liga/liga_vacios/${id}`);
  }

  getMercadoJugadores() : Observable<Mercado> {
    return this.http.get<Mercado>(`${this.apiURL}/mercado`);
  }

}
