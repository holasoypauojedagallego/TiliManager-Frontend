import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RequireTeamGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  async canActivate(): Promise<boolean | UrlTree> {
    const teamInfo = await this.auth.getTeamSesion();

    // Nota: Revisa si en tu interface es 'players' o 'playerss' como me pasaste antes
    if (teamInfo && teamInfo.players && teamInfo.players.length > 0) {
        return true; // ¡Adelante, pasa a ver tu equipo!
    }

    // Si no tiene equipo o tiene 0 jugadores, lo rebotamos a la creación
    return this.router.parseUrl('/crearequipo');
  }
}