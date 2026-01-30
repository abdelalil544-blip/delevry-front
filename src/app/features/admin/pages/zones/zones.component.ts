import { Component } from '@angular/core';

@Component({
    selector: 'app-admin-zones',
    standalone: true,
    template: `
    <div class="zones-container">
      <div class="header">
        <h2>Gestion des Zones</h2>
        <button class="btn-primary">+ Ajouter Zone</button>
      </div>
      
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de la Zone</th>
            <th>Code Postal</th>
            <th>Villes</th>
            <th>Livreurs Assignés</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#ZN-001</td>
            <td>Zone Urbaine Nord</td>
            <td>75000</td>
            <td>Paris, Saint-Denis</td>
            <td>5</td>
            <td>
              <button class="btn-icon">✏️</button>
              <button class="btn-icon">🗑️</button>
            </td>
          </tr>
          <tr>
            <td>#ZN-002</td>
            <td>Zone Sud</td>
            <td>13000</td>
            <td>Marseille, Aix</td>
            <td>3</td>
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
    .zones-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
    .data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    .data-table th, .data-table td { padding: 15px; text-align: left; border-bottom: 1px solid #ecf0f1; }
    .data-table th { background: #f8f9fa; color: #2c3e50; font-weight: 600; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 5px; }
  `]
})
export class AdminZonesComponent { }
