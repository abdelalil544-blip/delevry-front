import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColisService } from '../../../admin/services/colis.service';
import { Colis, StatutColis } from '../../../admin/models/colis.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-mes-colis',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="page-header">
      <div>
        <h2 class="title">Mes Colis Assignés</h2>
        <p class="subtitle">Gérez vos livraisons en cours et mettez à jour les statuts.</p>
      </div>
      <div class="stats-badge">
        <span class="count">{{ colis.length }}</span>
        <span class="label">Colis</span>
      </div>
    </div>

    <div *ngIf="message" class="alert-toast" [ngClass]="messageType">
      <span class="icon">{{ messageType === 'success' ? '✅' : '❌' }}</span>
      {{ message }}
    </div>

    <!-- Loading State -->
    <div *ngIf="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement de vos colis...</p>
    </div>

    <!-- Empty State -->
    <div *ngIf="!loading && colis.length === 0" class="empty-state">
      <div class="empty-icon">📂</div>
      <h3>Aucun colis assigné</h3>
      <p>Vous n'avez pas encore de colis à livrer pour le moment.</p>
    </div>

    <!-- Colis Grid -->
    <div class="colis-grid" *ngIf="!loading && colis.length > 0">
      <div *ngFor="let c of colis" class="colis-card" [ngClass]="c.statut.toLowerCase()">
        <div class="card-header">
          <span class="priority-tag" [ngClass]="c.priorite.toLowerCase()">{{ c.priorite }}</span>
          <span class="statut-tag">{{ c.statut }}</span>
        </div>
        
        <div class="card-body">
          <h4 class="dest-name">{{ c.destinataireNom || 'Destinataire Inconnu' }}</h4>
          <p class="address">📍 {{ c.villeDestination }}</p>
          <p class="description">{{ c.description }}</p>
          
          <div class="details-row">
            <div class="detail">
              <span class="label">Poids</span>
              <span class="value">{{ c.poids }} kg</span>
            </div>
            <div class="detail">
              <span class="label">Zone</span>
              <span class="value">{{ c.zoneNom || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <div class="card-actions">
          <div class="status-update">
            <select [(ngModel)]="c.nouveauStatut" class="statut-select">
              <option *ngFor="let s of availableStatuts" [value]="s">{{ s }}</option>
            </select>
            <button (click)="updateStatut(c)" [disabled]="!c.nouveauStatut || c.nouveauStatut === c.statut" class="update-btn">
              Mettre à jour
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .title { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 0 0 8px 0; }
    .subtitle { color: #64748b; margin: 0; }
    
    .stats-badge { background: white; padding: 12px 24px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .stats-badge .count { font-size: 1.5rem; font-weight: 800; color: #3b82f6; }
    .stats-badge .label { font-size: 0.75rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; }

    .colis-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
    
    .colis-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .colis-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }

    .card-header { padding: 20px 20px 10px; display: flex; justify-content: space-between; }
    .priority-tag { font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 8px; text-transform: uppercase; }
    .priority-tag.normale { background: #dcfce7; color: #166534; }
    .priority-tag.urgente { background: #fee2e2; color: #991b1b; }
    .priority-tag.express { background: #fef9c3; color: #854d0e; }

    .statut-tag { font-size: 0.7rem; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 4px 10px; border-radius: 8px; }

    .card-body { padding: 20px; flex: 1; }
    .dest-name { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0 0 10px 0; }
    .address { font-size: 0.9rem; color: #3b82f6; font-weight: 600; margin-bottom: 12px; }
    .description { font-size: 0.85rem; color: #64748b; margin-bottom: 20px; line-height: 1.5; }

    .details-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background: #f8fafc; padding: 12px; border-radius: 12px; }
    .detail .label { display: block; font-size: 0.7rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: 2px; }
    .detail .value { font-size: 0.9rem; color: #334155; font-weight: 700; }

    .card-actions { padding: 20px; border-top: 1px solid #f1f5f9; }
    .status-update { display: flex; gap: 10px; }
    .statut-select { flex: 1; padding: 10px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 0.85rem; font-weight: 600; color: #1e293b; }
    .update-btn { background: #1e293b; color: white; border: none; padding: 10px 15px; border-radius: 10px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: 0.2s; }
    .update-btn:hover:not(:disabled) { background: #0f172a; }
    .update-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* States */
    .loading-state, .empty-state { padding: 100px 0; text-align: center; }
    .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .empty-icon { font-size: 4rem; margin-bottom: 20px; }

    /* Alert / Toast */
    .alert-toast { position: fixed; top: 20px; right: 20px; padding: 16px 24px; border-radius: 16px; background: white; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); z-index: 1000; display: flex; align-items: center; gap: 12px; font-weight: 600; animation: slideIn 0.3s ease-out; }
    .alert-toast.success { border-left: 6px solid #10b981; color: #064e3b; }
    .alert-toast.error { border-left: 6px solid #ef4444; color: #7f1d1d; }

    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  `]
})
export class MesColisComponent implements OnInit {
    colis: any[] = [];
    loading = true;
    message = '';
    messageType = '';
    availableStatuts = Object.values(StatutColis);

    constructor(private colisService: ColisService) { }

    ngOnInit() {
        this.loadColis();
    }

    loadColis() {
        this.loading = true;
        this.colisService.getLivreurColis(0, 50).subscribe({
            next: (page) => {
                this.colis = page.content.map(c => ({ ...c, nouveauStatut: c.statut }));
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading colis:', err);
                this.loading = false;
            }
        });
    }

    updateStatut(colis: any) {
        if (!colis.nouveauStatut) return;

        this.colisService.updateStatut(colis.id, colis.nouveauStatut, 'Mise à jour par le livreur').subscribe({
            next: (updated) => {
                colis.statut = updated.statut;
                this.message = 'Statut mis à jour avec succès !';
                this.messageType = 'success';
                setTimeout(() => this.message = '', 3000);
            },
            error: (err) => {
                console.error('Error updating statut:', err);
                this.message = 'Erreur lors de la mise à jour.';
                this.messageType = 'error';
                setTimeout(() => this.message = '', 3000);
            }
        });
    }
}
