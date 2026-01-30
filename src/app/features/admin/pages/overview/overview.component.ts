import { Component } from '@angular/core';

@Component({
    selector: 'app-admin-overview',
    standalone: true,
    template: `
    <div class="overview-container">
      <h2>Vue d'ensemble - Admin</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Utilisateurs</h3>
          <p class="value">156</p>
          <span class="subtitle">Total inscrits</span>
        </div>
        <div class="stat-card">
          <h3>Colis</h3>
          <p class="value">342</p>
          <span class="subtitle">En circulation</span>
        </div>
        <div class="stat-card">
          <h3>Livreurs</h3>
          <p class="value">28</p>
          <span class="subtitle">Actifs</span>
        </div>
        <div class="stat-card">
          <h3>Zones</h3>
          <p class="value">12</p>
          <span class="subtitle">Couvertes</span>
        </div>
      </div>
      
      <div class="charts-section">
        <div class="chart-card">
          <h3>Activité récente</h3>
          <ul class="activity-list">
            <li>Nouveau client inscrit - il y a 5 min</li>
            <li>Colis #COL-456 livré - il y a 15 min</li>
            <li>Livreur assigné à Zone Nord - il y a 30 min</li>
          </ul>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .overview-container { padding: 20px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .stat-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); text-align: center; }
    .stat-card h3 { color: #7f8c8d; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; }
    .stat-card .value { font-size: 2.5rem; font-weight: bold; color: #2c3e50; margin: 0; }
    .stat-card .subtitle { font-size: 0.85rem; color: #95a5a6; }
    .chart-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    .chart-card h3 { margin-bottom: 15px; color: #2c3e50; }
    .activity-list { list-style: none; padding: 0; margin: 0; }
    .activity-list li { padding: 12px 0; border-bottom: 1px solid #ecf0f1; color: #34495e; }
  `]
})
export class AdminOverviewComponent { }
