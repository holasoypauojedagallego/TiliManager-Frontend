import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginRequest{
  email : string;
  password : string;
}

export interface RegisterRequest{
  name : string;
  email : string;
  password : string;
}

@Injectable({
  providedIn: 'root',
})

export class Auth {

  private apiURL = "http://192.168.3.142:8080/jpa/api/v1"; // Esta va en casa, hay que cambiar esto obviamente a ver que hago para que vaya desde cualquier sitio mecachis

  constructor(private http: HttpClient) {}

  login(data : LoginRequest) : Observable<any> {
    return this.http.post(`${this.apiURL}/users/login`, data);
  }

  register(data : RegisterRequest) : Observable<any> {
    return this.http.post(`${this.apiURL}/users/register`, data);
  }
}
