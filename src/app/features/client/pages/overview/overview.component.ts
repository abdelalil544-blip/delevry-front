import { Component } from '@angular/core';

@Component({
    selector: 'app-overview',
    standalone: true,
    template: `
    <div class="overview-container">
      <h2>Vue d'ensemble</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Colis en cours</h3>
          <p class="value">5</p>
        </div>
        <div class="stat-card">
          <h3>Livrés</h3>
          <p class="value">12</p>
        </div>
        <div class="stat-card">
          <h3>Total Commandes</h3>
          <p class="value">17</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .overview-container { padding: 20px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px; }
    .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
    .stat-card h3 { color: #666; font-size: 1rem; margin-bottom: 10px; }
    .stat-card .value { font-size: 2rem; font-weight: bold; color: #007bff; }
  `]
})
export class OverviewComponent { }
