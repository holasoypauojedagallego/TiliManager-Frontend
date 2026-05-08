import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService, DictionaryLeagueTeam } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RequireTeamGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  async canActivate(activeRoute: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const currentTeam : DictionaryLeagueTeam | null = await this.auth.getTeamSesion();
    const id = Number(activeRoute.paramMap.get("id"));

    if (!currentTeam || !id || !currentTeam[id]) {
        return this.router.parseUrl('/ligas');;
    } else if (currentTeam[id].team.players.length >=5) {
      return true;
    }
    return this.router.parseUrl(`/crearequipo/${id}`);
  }
  
}