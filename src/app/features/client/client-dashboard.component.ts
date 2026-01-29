import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  template: `
    <h1>📦 Client Dashboard</h1>
    <p>Bienvenue CLIENT</p>

    <button (click)="logout()">Logout</button>
  `
})
export class ClientDashboardComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
