import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColisService } from '../admin/services/colis.service';
import { Colis, StatutColis } from '../admin/models/colis.model';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinataire-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-wrapper">
      <header class="dashboard-header">
        <div class="header-content">
          <div class="brand">
            <span class="logo-emoji">🎁</span>
            <h1>Mes Réceptions</h1>
          </div>
          <div class="user-actions">
            <button (click)="logout()" class="logout-link">Déconnexion</button>
          </div>
        </div>
      </header>

      <main class="dashboard-main">
        <section class="welcome-banner">
          <h2>Bonjour ! 👋</h2>
          <p>Voici l'état des colis qui vous sont destinés.</p>
        </section>

        <div *ngIf="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Recherche de vos colis...</p>
        </div>

        <div *ngIf="!loading && colis.length === 0" class="empty-state">
          <div class="empty-illustration">📦</div>
          <h3>Aucun colis attendu</h3>
          <p>Nous n'avons trouvé aucun colis associé à votre adresse e-mail pour le moment.</p>
        </div>

        <div class="colis-list" *ngIf="!loading && colis.length > 0">
          <div *ngFor="let c of colis" class="colis-card" [class.delivered]="c.statut === 'LIVRE'">
            <div class="colis-header">
              <span class="tracking-number">#{{ c.id.substring(0,8) }}</span>
              <span class="status-pill" [ngClass]="c.statut.toLowerCase()">{{ c.statut }}</span>
            </div>

            <div class="colis-info">
              <h3>{{ c.description }}</h3>
              <p class="sender">Expédié par : <strong>{{ c.clientExpediteurNom || 'Expéditeur Standard' }}</strong></p>
            </div>

            <div class="tracking-timeline">
              <div class="timeline-step" [class.active]="isStepActive(c.statut, 'CREE')">
                <div class="dot"></div>
                <span>Créé</span>
              </div>
              <div class="timeline-step" [class.active]="isStepActive(c.statut, 'COLLECTE')">
                <div class="dot"></div>
                <span>Collecté</span>
              </div>
              <div class="timeline-step" [class.active]="isStepActive(c.statut, 'EN_TRANSIT')">
                <div class="dot"></div>
                <span>En transit</span>
              </div>
              <div class="timeline-step" [class.active]="isStepActive(c.statut, 'LIVRE')">
                <div class="dot"></div>
                <span>Livré</span>
              </div>
            </div>

            <div class="colis-footer">
              <div class="footer-item">
                <span class="label">Poids estimé</span>
                <span class="value">{{ c.poids }} kg</span>
              </div>
              <div class="footer-item">
                <span class="label">Priorité</span>
                <span class="value">{{ c.priorite }}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      --primary: #6366f1;
      --bg: #f3f4f6;
      --card-bg: #ffffff;
      --text: #1f2937;
      --text-light: #6b7280;
      display: block;
      min-height: 100vh;
      background: var(--bg);
      font-family: 'Inter', system-ui, sans-serif;
    }

    .dashboard-wrapper {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .dashboard-header {
      padding: 24px 0;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-emoji { font-size: 2rem; }
    .brand h1 { margin: 0; font-size: 1.5rem; font-weight: 800; color: var(--text); letter-spacing: -0.5px; }

    .logout-link { background: transparent; border: none; color: #ef4444; font-weight: 600; cursor: pointer; font-size: 0.9rem; }

    .welcome-banner { margin-bottom: 32px; }
    .welcome-banner h2 { margin: 0 0 8px 0; font-size: 2rem; font-weight: 800; color: var(--text); }
    .welcome-banner p { margin: 0; color: var(--text-light); font-size: 1.1rem; }

    /* Colis Cards */
    .colis-list { display: grid; gap: 24px; padding-bottom: 40px; }

    .colis-card { background: var(--card-bg); border-radius: 24px; padding: 32px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; transition: transform 0.2s; }
    .colis-card:hover { transform: translateY(-4px); }

    .colis-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .tracking-number { font-family: monospace; font-weight: 700; color: var(--text-light); }
    
    .status-pill { padding: 6px 16px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .status-pill.cree { background: #fef9c3; color: #854d0e; }
    .status-pill.collecte { background: #dbeafe; color: #1e40af; }
    .status-pill.en_transit { background: #e0f2fe; color: #075985; }
    .status-pill.livre { background: #dcfce7; color: #166534; }

    .colis-info h3 { margin: 0 0 12px 0; font-size: 1.25rem; font-weight: 700; color: var(--text); }
    .sender { margin: 0; color: var(--text-light); font-size: 0.95rem; }

    /* Timeline */
    .tracking-timeline { display: flex; justify-content: space-between; margin: 40px 0; position: relative; padding: 0 10px; }
    .tracking-timeline::before { content: ''; position: absolute; top: 12px; left: 10px; right: 10px; height: 4px; background: #e5e7eb; z-index: 0; }

    .timeline-step { display: flex; flex-direction: column; align-items: center; gap: 12px; z-index: 1; }
    .timeline-step .dot { width: 28px; height: 28px; background: #ffffff; border: 4px solid #e5e7eb; border-radius: 50%; transition: 0.3s; }
    .timeline-step span { font-size: 0.75rem; font-weight: 700; color: var(--text-light); text-transform: uppercase; }

    .timeline-step.active .dot { background: var(--primary); border-color: white; box-shadow: 0 0 0 4px #6366f122, 0 4px 6px rgba(0,0,0,0.1); }
    .timeline-step.active span { color: var(--primary); }

    .colis-footer { display: flex; gap: 32px; border-top: 1px solid #f3f4f6; padding-top: 24px; }
    .footer-item { display: flex; flex-direction: column; gap: 4px; }
    .footer-item .label { font-size: 0.7rem; color: var(--text-light); text-transform: uppercase; font-weight: 700; }
    .footer-item .value { font-size: 0.95rem; font-weight: 700; color: var(--text); }

    /* States */
    .loading-state, .empty-state { text-align: center; padding: 80px 0; }
    .empty-illustration { font-size: 5rem; margin-bottom: 24px; }
    .spinner { width: 48px; height: 48px; border: 5px solid #e5e7eb; border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class DestinataireDashboardComponent implements OnInit {
  colis: any[] = [];
  loading = true;

  constructor(
    private colisService: ColisService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadMyPackages();
  }

  loadMyPackages() {
    this.loading = true;
    this.colisService.getDestinataireColis(0, 50).subscribe({
      next: (page) => {
        this.colis = page.content;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading destinataire colis:', err);
        this.loading = false;
      }
    });
  }

  isStepActive(currentStatut: string, step: string): boolean {
    const statuts = ['CREE', 'COLLECTE', 'EN_TRANSIT', 'LIVRE'];
    const currentIndex = statuts.indexOf(currentStatut);
    const stepIndex = statuts.indexOf(step);
    return stepIndex <= currentIndex;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
