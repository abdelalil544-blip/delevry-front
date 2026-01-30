import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminOverviewComponent } from './pages/overview/overview.component';
import { AdminUsersComponent } from './pages/users/users.component';
import { AdminColisComponent } from './pages/colis/colis.component';
import { AdminProduitsComponent } from './pages/produits/produits.component';
import { AdminZonesComponent } from './pages/zones/zones.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: AdminOverviewComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'colis', component: AdminColisComponent },
      { path: 'produits', component: AdminProduitsComponent },
      { path: 'zones', component: AdminZonesComponent }
    ]
  }
];
