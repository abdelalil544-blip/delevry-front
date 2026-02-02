import { Routes } from '@angular/router';
import { LivreurDashboardComponent } from './livreur-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LivreurDashboardComponent,
    children: [
      {
        path: 'mes-colis',
        loadComponent: () => import('./pages/mes-colis/mes-colis.component').then(m => m.MesColisComponent)
      },
      {
        path: 'ma-tournee',
        loadComponent: () => import('./pages/ma-tournee/ma-tournee.component').then(m => m.MaTourneeComponent)
      },
      {
        path: '',
        redirectTo: 'mes-colis',
        pathMatch: 'full'
      }
    ]
  }
];
