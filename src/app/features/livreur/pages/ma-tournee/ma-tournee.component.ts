import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColisService } from '../../../admin/services/colis.service';

@Component({
    selector: 'app-ma-tournee',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="page-header">
      <h2 class="title">Ma Tournée d'Aujourd'hui</h2>
      <p class="subtitle">Visualisez l'ordre optimal de vos livraisons.</p>
    </div>

    <div *ngIf="loading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <div *ngIf="!loading && tournee.length === 0" class="empty-state">
      <div class="empty-icon">📍</div>
      <h3>Aucune tournée planifiée</h3>
      <p>Commencez par charger vos colis ou attendez de nouvelles assignations.</p>
    </div>

    <div class="tournee-container" *ngIf="!loading && tournee.length > 0">
      <div class="timeline">
        <div *ngFor="let step of tournee; let i = index" class="timeline-item" [class.completed]="step.statut === 'LIVRE'">
          <div class="timeline-marker">
            <span class="marker-index">{{ i + 1 }}</span>
          </div>
          <div class="timeline-content">
            <div class="step-card">
              <div class="step-info">
                <span class="step-city">{{ step.villeDestination }}</span>
                <h4 class="step-dest">{{ step.destinataireNom }}</h4>
                <p class="step-address">📍 {{ step.zoneNom || 'Zone standard' }}</p>
              </div>
              <div class="step-meta">
                <span class="step-statut">{{ step.statut }}</span>
                <span class="step-priority" [ngClass]="step.priorite.toLowerCase()">{{ step.priorite }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map Placeholder -->
      <div class="map-placeholder">
        <div class="map-info">
          <span class="map-icon">🗺️</span>
          <h3>Vue Carte</h3>
          <p>L'optimisation d'itinéraire calcule le chemin le plus court entre vos {{ tournee.length }} points de livraison.</p>
          <button class="optimize-btn">Calculer l'itinéraire</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .page-header { margin-bottom: 32px; }
    .title { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0 0 8px 0; }
    .subtitle { color: #64748b; margin: 0; }

    .tournee-container { display: grid; grid-template-columns: 1fr 400px; gap: 40px; }

    .timeline { position: relative; padding-left: 20px; }
    .timeline::before { content: ''; position: absolute; left: 40px; top: 0; bottom: 0; width: 4px; background: #e2e8f0; border-radius: 2px; }

    .timeline-item { position: relative; display: flex; gap: 40px; margin-bottom: 30px; }
    .timeline-marker { width: 44px; height: 44px; background: white; border: 4px solid #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 1; transition: 0.3s; flex-shrink: 0; }
    .marker-index { font-weight: 800; color: #94a3b8; }

    .timeline-item.completed .timeline-marker { border-color: #10b981; background: #10b981; }
    .timeline-item.completed .marker-index { color: white; }

    .timeline-content { flex: 1; }
    .step-card { background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; transition: transform 0.2s; cursor: pointer; }
    .step-card:hover { transform: translateX(8px); border-color: #3b82f6; }

    .step-city { font-size: 0.75rem; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.5px; }
    .step-dest { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 4px 0; }
    .step-address { font-size: 0.85rem; color: #64748b; margin: 0; }

    .step-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .step-statut { font-size: 0.7rem; font-weight: 700; background: #f1f5f9; padding: 4px 10px; border-radius: 8px; color: #475569; }
    .step-priority { font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 8px; }
    .step-priority.normale { background: #dcfce7; color: #166534; }
    .step-priority.urgente { background: #fee2e2; color: #991b1b; }

    /* Map Placeholder */
    .map-placeholder { background: #1e293b; border-radius: 30px; display: flex; align-items: center; justify-content: center; text-align: center; color: white; padding: 40px; height: fit-content; position: sticky; top: 32px; }
    .map-icon { font-size: 4rem; display: block; margin-bottom: 20px; }
    .map-placeholder h3 { font-size: 1.5rem; margin: 0 0 10px 0; }
    .map-placeholder p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 30px; }
    
    .optimize-btn { background: #3b82f6; color: white; border: none; padding: 14px 30px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3); }
    .optimize-btn:hover { background: #2563eb; transform: translateY(-2px); }

    .loading-state { padding: 100px 0; text-align: center; }
    .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `]
})
export class MaTourneeComponent implements OnInit {
    tournee: any[] = [];
    loading = true;

    constructor(private colisService: ColisService) { }

    ngOnInit() {
        this.colisService.getLivreurColis(0, 50).subscribe({
            next: (page) => {
                // Pour la tournée, on filtre les colis déjà livrés si besoin, ou on les met à la fin
                this.tournee = page.content;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading tournee:', err);
                this.loading = false;
            }
        });
    }
}
