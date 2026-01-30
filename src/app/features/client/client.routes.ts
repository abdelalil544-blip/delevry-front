import { Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ColisListComponent } from './pages/colis-list/colis-list.component';
import { ColisCreateComponent } from './pages/colis-create/colis-create.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'colis', component: ColisListComponent },
      { path: 'colis/create', component: ColisCreateComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];
