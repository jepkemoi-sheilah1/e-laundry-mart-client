import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/register', pathMatch: 'full' },
  { 
    path: 'auth/register', 
    loadComponent: () => import('./pages/auth/register/register').then(m => m.RegisterComponent)
  },
  // Add other routes here
];