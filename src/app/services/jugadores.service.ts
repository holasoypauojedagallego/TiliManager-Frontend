import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JugadorLeague } from './auth.service';

export interface Mercado {
  id: number,
  players: JugadorLeague[],
  fichable: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class JugadoresService {

  private apiURL = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getJugadoresTeamIdNull(id: string) : Observable<any> {
    return this.http.get(`${this.apiURL}/jugadores_liga/liga_vacios/${id}`);
  }

  getMercadoJugadores(id: number) : Observable<Mercado> {
    return this.http.get<Mercado>(`${this.apiURL}/mercado/${id}`);
  }

}
