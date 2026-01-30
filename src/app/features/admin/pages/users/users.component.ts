import { Component } from '@angular/core';

@Component({
    selector: 'app-admin-users',
    standalone: true,
    template: `
    <div class="users-container">
      <div class="header">
        <h2>Gestion des Utilisateurs</h2>
        <button class="btn-primary">+ Ajouter Utilisateur</button>
      </div>
      
      <div class="tabs">
        <button class="tab active">Clients</button>
        <button class="tab">Livreurs</button>
        <button class="tab">Destinataires</button>
      </div>
      
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#USR-001</td>
            <td>Ahmed Dupont</td>
            <td>ahmed@example.com</td>
            <td><span class="badge client">CLIENT</span></td>
            <td><span class="status active">Actif</span></td>
            <td>
              <button class="btn-icon">✏️</button>
              <button class="btn-icon">🗑️</button>
            </td>
          </tr>
          <tr>
            <td>#USR-002</td>
            <td>Marie Martin</td>
            <td>marie@example.com</td>
            <td><span class="badge livreur">LIVREUR</span></td>
            <td><span class="status active">Actif</span></td>
            <td>
              <button class="btn-icon">✏️</button>
              <button class="btn-icon">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [`
    .users-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
    .tabs { display: flex; gap: 10px; margin-bottom: 20px; }
    .tab { padding: 10px 20px; border: none; background: #ecf0f1; border-radius: 6px; cursor: pointer; }
    .tab.active { background: #3498db; color: white; }
    .data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    .data-table th, .data-table td { padding: 15px; text-align: left; border-bottom: 1px solid #ecf0f1; }
    .data-table th { background: #f8f9fa; color: #2c3e50; font-weight: 600; }
    .badge { padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; }
    .badge.client { background: #e3f2fd; color: #1976d2; }
    .badge.livreur { background: #fff3e0; color: #f57c00; }
    .status.active { color: #27ae60; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 5px; }
  `]
})
export class AdminUsersComponent { }
