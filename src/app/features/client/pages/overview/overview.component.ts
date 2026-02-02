import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColisService } from '../../../admin/services/colis.service';
import { Colis, StatutColis, Page } from '../../../admin/models/colis.model';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overview-container">
      <h2>Vue d'ensemble</h2>
      
      <div *ngIf="loading" class="loading">Chargement des statistiques...</div>
      
      <div class="stats-grid" *ngIf="!loading">
        <div class="stat-card">
          <h3>Colis en cours</h3>
          <p class="value">{{ stats.enCours }}</p>
        </div>
        <div class="stat-card">
          <h3>Livrés</h3>
          <p class="value">{{ stats.livres }}</p>
        </div>
        <div class="stat-card">
          <h3>Total Commandes</h3>
          <p class="value">{{ stats.total }}</p>
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
    .loading { text-align: center; padding: 40px; color: #666; }
  `]
})
export class OverviewComponent implements OnInit {
  loading = false;
  stats = {
    enCours: 0,
    livres: 0,
    total: 0
  };

  constructor(private colisService: ColisService) { }

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.colisService.getMyClientColis(0, 1000).subscribe({
      next: (page: Page<Colis>) => {
        const colis = page.content;
        this.stats.total = page.totalElements;
        this.stats.enCours = colis.filter(c => c.statut !== StatutColis.LIVRE && c.statut !== StatutColis.ANNULE).length;
        this.stats.livres = colis.filter(c => c.statut === StatutColis.LIVRE).length;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading stats:', err);
        this.loading = false;
      }
    });
  }
}
