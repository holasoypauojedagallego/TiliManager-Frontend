import { Routes } from '@angular/router';
import { CanActivateAuthGuard } from './guards/canActivateAuthGuard';
import { RequireTeamGuard } from './guards/requireTeamGuard';
import { RequireNoTeamGuard } from './guards/requiredNoTeamGuard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./views/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./views/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'historial',
    loadComponent: () => import('./views/historial/historial.page').then( m => m.HistorialPage)
  },
  {
    path: 'partido/:id',
    canActivate: [CanActivateAuthGuard],
    loadComponent: () => import('./views/partido/partido.page').then( m => m.PartidoPage)
  },
  {
    path: 'equipo/:id',
    canActivate: [CanActivateAuthGuard, RequireTeamGuard],
    loadComponent: () => import('./views/equipo/equipo.page').then( m => m.EquipoPage)
  },
  {
    path: 'crearequipo/:id',
    canActivate: [CanActivateAuthGuard, RequireNoTeamGuard],
    loadComponent: () => import('./views/crearEquipo/crearEquipo.page').then( m => m.CrearEquipoPage)
  },
  {
    path: 'partidoonline',
    canActivate: [CanActivateAuthGuard],
    loadComponent: () => import('./views/partidoonline/partidoonline.page').then( m => m.PartidoonlinePage)
  },
  {
    path: 'mercado/:id',
    canActivate: [CanActivateAuthGuard, RequireTeamGuard],
    loadComponent: () => import('./views/mercado/mercado.page').then( m => m.MercadoPage)
  },
  {
    path: 'torneo',
    canActivate: [CanActivateAuthGuard],
    loadComponent: () => import('./views/torneo/torneo.page').then( m => m.TorneoPage)
  },
  {
    path: 'ligas',
    canActivate: [CanActivateAuthGuard],
    loadComponent: () => import('./views/ligas/ligas.page').then( m => m.LigasPage)
  },
  {
    path: 'liga/:id',
    canActivate: [CanActivateAuthGuard, RequireTeamGuard],
    loadComponent: () => import('./views/liga/liga.page').then( m => m.LigaPage)
  },
  {
    path: 'partidoliga/:id',
    canActivate: [CanActivateAuthGuard, RequireTeamGuard],
    loadComponent: () => import('./views/partidoliga/partidoliga.page').then( m => m.PartidoligaPage)
  },
    {
    path: 'clasificacion/:id',
    canActivate: [CanActivateAuthGuard, RequireTeamGuard],
    loadComponent: () => import('./views/clasificacion/clasificacion.page').then( m => m.ClasificacionPage)
  },


  {
    path: '**',
    loadComponent: () => import('./views/error404/error404.page').then( m => m.Error404Page)
  }

];
