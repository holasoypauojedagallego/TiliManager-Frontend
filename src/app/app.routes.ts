import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'partido',
    loadComponent: () => import('./partido/partido.page').then( m => m.PartidoPage)
  },


  

  {
    path: '**',
    loadComponent: () => import('./error404/error404.page').then( m => m.Error404Page)
  },
];
