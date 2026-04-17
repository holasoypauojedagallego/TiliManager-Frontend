import { Routes } from '@angular/router';

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
    path: 'partido',
    loadComponent: () => import('./views/partido/partido.page').then( m => m.PartidoPage)
  },
  {
    path: 'crearequipo',
    loadComponent: () => import('./views/crearEquipo/crearEquipo.page').then( m => m.CrearEquipoPage)
  },

  

  {
    path: '**',
    loadComponent: () => import('./views/error404/error404.page').then( m => m.Error404Page)
  },
];
