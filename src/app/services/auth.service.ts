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

export interface EmailRegisteredRequest {
  email : string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiURL = "http://127.0.0.1:8080/jpa/api/v1"; // Esta va en casa, hay que cambiar esto obviamente a ver que hago para que vaya desde cualquier sitio mecachis

  constructor(private http: HttpClient) {}

  login(data : LoginRequest) : Observable<any> {
    return this.http.post(`${this.apiURL}/users/login`, data);
  }

  register(data : RegisterRequest) : Observable<any> {
    return this.http.post(`${this.apiURL}/users/register`, data);
  }

  emailRegistered(data : EmailRegisteredRequest) : Observable<any> {
     return this.http.get(`${this.apiURL}/users/email/${data}`);
  }
}
