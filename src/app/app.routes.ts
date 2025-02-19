import { AboutComponent } from './about/about.component';
import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
