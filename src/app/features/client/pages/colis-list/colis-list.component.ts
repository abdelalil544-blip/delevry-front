import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColisService } from '../../../admin/services/colis.service';
import { Colis, Page } from '../../../admin/models/colis.model';

@Component({
  selector: 'app-colis-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="list-container">
      <div class="header">
        <h2>Mes Colis</h2>
        <button class="btn-primary" routerLink="../create">Nouveau Colis</button>
      </div>
      
      <div *ngIf="loading" class="loading">Chargement...</div>
      
      <table class="colis-table" *ngIf="!loading">
        <thead>
          <tr>
            <th>Description</th>
            <th>Destinataire</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of colis">
            <td>{{ c.description }}</td>
            <td>{{ c.destinataireNom }}</td>
            <td>
              <span class="status-badge" [ngClass]="c.statut.toLowerCase().replace('_', '-')">
                {{ c.statut }}
              </span>
            </td>
            <td>{{ c.dateCreation | date:'dd/MM/yyyy' }}</td>
            <td><button class="btn-sm">Détails</button></td>
          </tr>
          <tr *ngIf="colis.length === 0">
            <td colspan="5" class="empty">Vous n'avez pas encore de colis.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .list-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-primary { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
    .colis-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .colis-table th, .colis-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
    .colis-table th { background: #f8f9fa; color: #333; }
    .status-badge { padding: 4px 8px; border-radius: 12px; font-size: 0.85rem; font-weight: 500; }
    .status-badge.cree { background: #fef9c3; color: #854d0e; }
    .status-badge.collecte { background: #dbeafe; color: #1e40af; }
    .status-badge.en-stock { background: #ede9fe; color: #5b21b6; }
    .status-badge.en-transit { background: #e0f2fe; color: #075985; }
    .status-badge.livre { background: #dcfce7; color: #166534; }
    .status-badge.annule { background: #fee2e2; color: #991b1b; }
    .btn-sm { padding: 5px 10px; font-size: 0.85rem; cursor: pointer; }
    .loading, .empty { text-align: center; padding: 20px; color: #666; }
  `]
})
export class ColisListComponent implements OnInit {
  colis: Colis[] = [];
  loading = false;

  constructor(private colisService: ColisService) { }

  ngOnInit() {
    this.loadColis();
  }

  loadColis() {
    this.loading = true;
    this.colisService.getMyClientColis(0, 50).subscribe({
      next: (page: Page<Colis>) => {
        this.colis = page.content;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading colis:', err);
        this.loading = false;
      }
    });
  }
}
