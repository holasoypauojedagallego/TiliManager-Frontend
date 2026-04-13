import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PartidosService {

  private apiURL = "http://192.168.3.142:8080/jpa/api/v1"; // Esta va en casa, hay que cambiar esto obviamente a ver que hago para que vaya desde cualquier sitio mecachis http://127.0.0.1:8080/jpa/api/v1

  constructor(private http: HttpClient) {}

  simularPartido() : Observable<any> {
    return this.http.get(`${this.apiURL}/jugadores/codigo`);
  }

}
