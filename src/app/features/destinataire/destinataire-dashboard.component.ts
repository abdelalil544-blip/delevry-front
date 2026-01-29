import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  template: `
    <h1>📨 Destinataire Dashboard</h1>
    <p>Bienvenue DESTINATAIRE</p>

    <button (click)="logout()">Logout</button>
  `
})
export class DestinataireDashboardComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
