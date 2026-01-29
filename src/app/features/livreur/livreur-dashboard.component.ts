import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  template: `
    <h1>🚚 Livreur Dashboard</h1>
    <p>Bienvenue LIVREUR</p>

    <button (click)="logout()">Logout</button>
  `
})
export class LivreurDashboardComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
