import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService, Team } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RequireNoTeamGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

    async canActivate(): Promise<boolean> {

    const currentUser : Team | null = await this.auth.getTeamSesion();

    if(currentUser && currentUser?.players.length === 0){
        return true;
    }
    this.router.navigate(['/equipo']);
    return false;
  }
}