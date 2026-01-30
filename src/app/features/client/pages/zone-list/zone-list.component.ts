import { Component } from '@angular/core';

@Component({
    selector: 'app-zone-list',
    standalone: true,
    template: `
    <div class="list-container">
      <h2>Zones de Livraison</h2>
      <div class="zone-info-card">
        <p>Découvrez les zones couvertes par notre service de livraison.</p>
      </div>
      
      <table class="zone-table">
        <thead>
          <tr>
            <th>Nom de la Zone</th>
            <th>Code Postal</th>
            <th>Villes Couvertes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Zone Urbaine Nord</td>
            <td>75000</td>
            <td>Paris, Saint-Denis</td>
          </tr>
          <tr>
            <td>Zone Sud</td>
            <td>13000</td>
            <td>Marseille, Aix</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [`
    .list-container { padding: 20px; }
    .zone-info-card { background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px; color: #0d47a1; }
    .zone-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .zone-table th, .zone-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
    .zone-table th { background: #f8f9fa; color: #333; }
  `]
})
export class ZoneListComponent { }
