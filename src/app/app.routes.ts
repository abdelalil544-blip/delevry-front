import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { authGuard } from './core/auth/AuthGuard';
import { roleGuard } from './core/auth/RoleGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard(['ADMIN'])],
    loadChildren: () =>
      import('./features/admin/admin.routes')
        .then(m => m.routes) 
  },

  {
    path: 'livreur',
    canActivate: [authGuard, roleGuard(['LIVREUR'])],
    loadChildren: () =>
      import('./features/livreur/livreur.routes')
        .then(m => m.routes)
  },

  {
    path: 'client',
    canActivate: [authGuard, roleGuard(['CLIENT'])],
    loadChildren: () =>
      import('./features/client/client.routes')
        .then(m => m.routes)
  },

  {
    path: 'destinataire',
    canActivate: [authGuard, roleGuard(['DESTINATAIRE'])],
    loadChildren: () =>
      import('./features/destinataire/destinataire.routes')
        .then(m => m.routes)
  },

  { path: '**', redirectTo: 'login' }
];
