import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService, SecretUser } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateAuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  async canActivate(): Promise<boolean> {

    const currentUser:SecretUser | null = await this.auth.getSesion();

    if(currentUser && currentUser.id){
        return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}