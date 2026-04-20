import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RequireTeamGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  async canActivate(): Promise<boolean | UrlTree> {
    const currentUser = await this.auth.getTeamSesion();

    if (currentUser && currentUser.players && currentUser.players.length > 0) {
        return true;
    }

    return this.router.parseUrl('/crearequipo');
  }
}