import { Component } from '@angular/core';

@Component({
    selector: 'app-colis-list',
    standalone: true,
    template: `
    <div class="list-container">
      <div class="header">
        <h2>Mes Colis</h2>
        <button class="btn-primary">Nouveau Colis</button>
      </div>
      
      <table class="colis-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinataire</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#COL-123</td>
            <td>John Doe</td>
            <td><span class="status-badge pending">En attente</span></td>
            <td>2024-01-30</td>
            <td><button class="btn-sm">Détails</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [`
    .list-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-primary { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
    .colis-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .colis-table th, .colis-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
    .colis-table th { background: #f8f9fa; color: #333; }
    .status-badge { padding: 4px 8px; border-radius: 12px; font-size: 0.85rem; }
    .status-badge.pending { background: #fff3cd; color: #856404; }
    .btn-sm { padding: 5px 10px; font-size: 0.85rem; cursor: pointer; }
  `]
})
export class ColisListComponent { }
