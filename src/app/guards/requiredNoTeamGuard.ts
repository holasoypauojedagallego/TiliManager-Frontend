import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService, DictionaryLeagueTeam } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RequireNoTeamGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  async canActivate(activeRoute: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const id = Number(activeRoute.paramMap.get("id"));
    const currentTeam : DictionaryLeagueTeam | null = await this.auth.getTeamSesion();

    if(!currentTeam || !id || !currentTeam[id] ){
        return this.router.parseUrl('/ligas');
    } else if (currentTeam[id].team.players.length === 0) {
        return true;
    }
    return this.router.parseUrl(`/equipo/${id}`);
  }
}