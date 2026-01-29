import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  template: `
    <h1>🛠️ Admin Dashboard</h1>
    <p>Bienvenue ADMIN</p>

    <button (click)="logout()">Logout</button>
  `
})
export class AdminDashboardComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
