import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ProduitService } from '../../services/produit.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overview-container">
      <h2>Vue d'ensemble</h2>

      <!-- Loading -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        Chargement des statistiques...
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid" *ngIf="!loading">
        <div class="stat-card clients">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <h3>{{ stats.clients }}</h3>
            <p>Clients</p>
          </div>
        </div>
        <div class="stat-card livreurs">
          <div class="stat-icon">🚚</div>
          <div class="stat-info">
            <h3>{{ stats.livreurs }}</h3>
            <p>Livreurs</p>
          </div>
        </div>
        <div class="stat-card destinataires">
          <div class="stat-icon">📍</div>
          <div class="stat-info">
            <h3>{{ stats.destinataires }}</h3>
            <p>Destinataires</p>
          </div>
        </div>
        <div class="stat-card produits">
          <div class="stat-icon">📦</div>
          <div class="stat-info">
            <h3>{{ stats.produits }}</h3>
            <p>Produits</p>
          </div>
        </div>
        <div class="stat-card zones">
          <div class="stat-icon">🗺️</div>
          <div class="stat-info">
            <h3>{{ stats.zones }}</h3>
            <p>Zones</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section" *ngIf="!loading">
        <h3>Actions rapides</h3>
        <div class="actions-grid">
          <a routerLink="../users" class="action-card">
            <span class="action-icon">👥</span>
            <span>Gérer les utilisateurs</span>
          </a>
          <a routerLink="../produits" class="action-card">
            <span class="action-icon">📦</span>
            <span>Gérer les produits</span>
          </a>
          <a routerLink="../zones" class="action-card">
            <span class="action-icon">🗺️</span>
            <span>Gérer les zones</span>
          </a>
          <a routerLink="../colis" class="action-card">
            <span class="action-icon">📋</span>
            <span>Gérer les colis</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overview-container { padding: 20px; }
    h2 { color: #2c3e50; margin-bottom: 25px; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .stat-card { background: white; padding: 25px; border-radius: 12px; display: flex; align-items: center; gap: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); transition: transform 0.3s; }
    .stat-card:hover { transform: translateY(-5px); }
    .stat-icon { font-size: 2.5rem; }
    .stat-info h3 { margin: 0; font-size: 2rem; color: #2c3e50; }
    .stat-info p { margin: 5px 0 0; color: #7f8c8d; }
    
    .stat-card.clients { border-left: 4px solid #3498db; }
    .stat-card.livreurs { border-left: 4px solid #e74c3c; }
    .stat-card.destinataires { border-left: 4px solid #9b59b6; }
    .stat-card.produits { border-left: 4px solid #27ae60; }
    .stat-card.zones { border-left: 4px solid #f39c12; }
    
    .section { margin-top: 30px; }
    .section h3 { color: #2c3e50; margin-bottom: 20px; }
    
    .actions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
    .action-card { background: white; padding: 20px; border-radius: 10px; text-align: center; text-decoration: none; color: #2c3e50; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s; display: flex; flex-direction: column; gap: 10px; }
    .action-card:hover { background: #3498db; color: white; transform: translateY(-3px); }
    .action-icon { font-size: 1.5rem; }
    
    .loading { text-align: center; padding: 60px; color: #7f8c8d; }
    .spinner { width: 40px; height: 40px; border: 4px solid #ecf0f1; border-top-color: #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class AdminOverviewComponent implements OnInit {
  stats = {
    clients: 0,
    livreurs: 0,
    destinataires: 0,
    produits: 0,
    zones: 0
  };
  loading = true;
  private loadedCount = 0;

  constructor(
    private userService: UserService,
    private produitService: ProduitService,
    private zoneService: ZoneService
  ) { }

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.loadedCount = 0;

    // Load clients count
    this.userService.getAllClients(0, 1).subscribe({
      next: (page) => {
        this.stats.clients = page.totalElements;
        this.checkComplete();
      },
      error: () => this.checkComplete()
    });

    // Load livreurs count
    this.userService.getAllLivreurs(0, 1).subscribe({
      next: (page) => {
        this.stats.livreurs = page.totalElements;
        this.checkComplete();
      },
      error: () => this.checkComplete()
    });

    // Load destinataires count
    this.userService.getAllDestinataires(0, 1).subscribe({
      next: (page) => {
        this.stats.destinataires = page.totalElements;
        this.checkComplete();
      },
      error: () => this.checkComplete()
    });

    // Load produits count
    this.produitService.getAll(0, 1).subscribe({
      next: (page) => {
        this.stats.produits = page.totalElements;
        this.checkComplete();
      },
      error: () => this.checkComplete()
    });

    // Load zones count
    this.zoneService.getAll(0, 1).subscribe({
      next: (page) => {
        this.stats.zones = page.totalElements;
        this.checkComplete();
      },
      error: () => this.checkComplete()
    });
  }

  private checkComplete() {
    this.loadedCount++;
    if (this.loadedCount >= 5) {
      this.loading = false;
    }
  }
}
