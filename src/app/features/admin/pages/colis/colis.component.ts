import { Component } from '@angular/core';

@Component({
    selector: 'app-admin-colis',
    standalone: true,
    template: `
    <div class="colis-container">
      <div class="header">
        <h2>Gestion des Colis</h2>
        <div class="actions">
          <input type="text" placeholder="Rechercher..." class="search-input">
          <button class="btn-primary">+ Nouveau Colis</button>
        </div>
      </div>
      
      <div class="filters">
        <select>
          <option>Tous les statuts</option>
          <option>En attente</option>
          <option>En cours</option>
          <option>Livré</option>
        </select>
        <select>
          <option>Toutes les zones</option>
          <option>Zone Nord</option>
          <option>Zone Sud</option>
        </select>
      </div>
      
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Destinataire</th>
            <th>Zone</th>
            <th>Statut</th>
            <th>Livreur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#COL-001</td>
            <td>Ahmed D.</td>
            <td>Pierre M.</td>
            <td>Zone Nord</td>
            <td><span class="status pending">En attente</span></td>
            <td>-</td>
            <td>
              <button class="btn-sm">Assigner</button>
              <button class="btn-icon">✏️</button>
            </td>
          </tr>
          <tr>
            <td>#COL-002</td>
            <td>Marie L.</td>
            <td>Jean B.</td>
            <td>Zone Sud</td>
            <td><span class="status in-progress">En cours</span></td>
            <td>Karim S.</td>
            <td>
              <button class="btn-sm">Détails</button>
              <button class="btn-icon">✏️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [`
    .colis-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .actions { display: flex; gap: 10px; }
    .search-input { padding: 10px 15px; border: 1px solid #ddd; border-radius: 6px; width: 250px; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
    .filters { display: flex; gap: 10px; margin-bottom: 20px; }
    .filters select { padding: 10px; border: 1px solid #ddd; border-radius: 6px; }
    .data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    .data-table th, .data-table td { padding: 15px; text-align: left; border-bottom: 1px solid #ecf0f1; }
    .data-table th { background: #f8f9fa; color: #2c3e50; font-weight: 600; }
    .status { padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; }
    .status.pending { background: #fff3cd; color: #856404; }
    .status.in-progress { background: #cce5ff; color: #004085; }
    .btn-sm { padding: 6px 12px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 1rem; }
  `]
})
export class AdminColisComponent { }
