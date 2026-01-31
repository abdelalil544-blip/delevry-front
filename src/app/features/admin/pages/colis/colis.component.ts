import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColisService } from '../../services/colis.service';
import { UserService } from '../../services/user.service';
import { Colis, StatutColis, PrioriteColis, ColisSearchCriteria } from '../../models/colis.model';
import { Livreur } from '../../models/user.model';

@Component({
  selector: 'app-admin-colis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="colis-container">
      <div class="header">
        <h2>Gestion des Colis</h2>
        <div class="actions">
          <input 
            type="text" 
            placeholder="Ville de destination..." 
            class="search-input"
            [(ngModel)]="searchCriteria.villeDestination"
            (input)="onSearch()">
        </div>
      </div>
      
      <div class="filters">
        <select [(ngModel)]="searchCriteria.statut" (change)="onSearch()">
          <option [ngValue]="undefined">Tous les statuts</option>
          <option *ngFor="let s of statuts" [value]="s">{{ s }}</option>
        </select>
        <select [(ngModel)]="searchCriteria.priorite" (change)="onSearch()">
          <option [ngValue]="undefined">Toutes les priorités</option>
          <option *ngFor="let p of priorites" [value]="p">{{ p }}</option>
        </select>
        <button class="btn-reset" (click)="resetFilters()">Réinitialiser</button>
      </div>

      <div *ngIf="loading" class="loading-state">
        Chargement des colis...
      </div>

      <div *ngIf="!loading && colis.length === 0" class="empty-state">
        Aucun colis trouvé.
      </div>
      
      <table class="data-table" *ngIf="!loading && colis.length > 0">
        <thead>
          <tr>
            <th>Description</th>
            <th>Poids</th>
            <th>Client</th>
            <th>Destinataire</th>
            <th>Statut</th>
            <th>Livreur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of colis">
            <td>{{ c.description }}</td>
            <td>{{ c.poids }} kg</td>
            <td>{{ c.clientExpediteurNom }}</td>
            <td>{{ c.destinataireNom }}</td>
            <td>
              <span class="status" [ngClass]="c.statut.toLowerCase().replace('_', '-')">
                {{ c.statut }}
              </span>
            </td>
            <td>{{ c.livreurNom || '-' }}</td>
            <td>
              <button class="btn-sm" *ngIf="!c.livreurId" (click)="openAssignModal(c)">Assigner</button>
              <button class="btn-icon" (click)="deleteColis(c.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Assign Livreur Modal -->
      <div class="modal" *ngIf="showAssignModal">
        <div class="modal-content">
          <h3>Assigner un livreur</h3>
          <p>Colis: {{ selectedColis?.description }}</p>
          
          <div class="form-group">
            <label>Choisir un livreur</label>
            <select [(ngModel)]="selectedLivreurId">
              <option [ngValue]="null">Sélectionner...</option>
              <option *ngFor="let l of livreurs" [value]="l.id">
                {{ l.nom }} {{ l.prenom }} ({{ l.vehicule || 'Sans véhicule' }})
              </option>
            </select>
          </div>
          
          <div class="modal-actions">
            <button class="btn-secondary" (click)="closeAssignModal()">Annuler</button>
            <button class="btn-primary" [disabled]="!selectedLivreurId" (click)="assignLivreur()">Confirmer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .colis-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .actions { display: flex; gap: 10px; }
    .search-input { padding: 10px 15px; border: 1px solid #ddd; border-radius: 6px; width: 250px; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
    .btn-primary:disabled { background: #bdc3c7; cursor: not-allowed; }
    .btn-secondary { background: #95a5a6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
    .btn-reset { background: #ecf0f1; color: #2c3e50; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; }
    
    .filters { display: flex; gap: 10px; margin-bottom: 20px; }
    .filters select { padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: white; }
    
    .data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    .data-table th, .data-table td { padding: 15px; text-align: left; border-bottom: 1px solid #ecf0f1; }
    .data-table th { background: #f8f9fa; color: #2c3e50; font-weight: 600; }
    
    .status { padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; }
    .status.en-attente { background: #fff3cd; color: #856404; }
    .status.en-cours { background: #cce5ff; color: #004085; }
    .status.livre { background: #d4edda; color: #155724; }
    .status.annule { background: #f8d7da; color: #721c24; }
    
    .btn-sm { padding: 6px 12px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 1.1rem; }
    
    .loading-state, .empty-state { text-align: center; padding: 40px; color: #7f8c8d; background: white; border-radius: 12px; }

    /* Modal styles */
    .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; padding: 30px; border-radius: 12px; width: 400px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
    .modal-content h3 { margin-top: 0; }
    .form-group { margin: 20px 0; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 600; }
    .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
  `]
})
export class AdminColisComponent implements OnInit {
  colis: Colis[] = [];
  livreurs: Livreur[] = [];
  loading = false;

  searchCriteria: ColisSearchCriteria = {};
  statuts = Object.values(StatutColis);
  priorites = Object.values(PrioriteColis);

  showAssignModal = false;
  selectedColis: Colis | null = null;
  selectedLivreurId: string | null = null;

  constructor(
    private colisService: ColisService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadColis();
    this.loadLivreurs();
  }

  loadColis() {
    this.loading = true;
    this.colisService.getAllColis(0, 100).subscribe({
      next: (page) => {
        this.colis = page.content;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading colis:', err);
        this.loading = false;
      }
    });
  }

  loadLivreurs() {
    this.userService.getAllLivreurs(0, 100).subscribe({
      next: (page) => {
        this.livreurs = page.content;
      },
      error: (err) => console.error('Error loading livreurs:', err)
    });
  }

  onSearch() {
    this.loading = true;
    this.colisService.searchColis(this.searchCriteria).subscribe({
      next: (page) => {
        this.colis = page.content;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error searching colis:', err);
        this.loading = false;
      }
    });
  }

  resetFilters() {
    this.searchCriteria = {};
    this.loadColis();
  }

  deleteColis(id: string) {
    if (confirm('Voulez-vous vraiment supprimer ce colis ?')) {
      this.colisService.deleteColis(id).subscribe({
        next: () => this.loadColis(),
        error: (err) => console.error('Error deleting colis:', err)
      });
    }
  }

  openAssignModal(colis: Colis) {
    this.selectedColis = colis;
    this.showAssignModal = true;
    this.selectedLivreurId = null;
  }

  closeAssignModal() {
    this.showAssignModal = false;
    this.selectedColis = null;
    this.selectedLivreurId = null;
  }

  assignLivreur() {
    if (this.selectedColis && this.selectedLivreurId) {
      this.colisService.assignerLivreur(this.selectedColis.id, this.selectedLivreurId).subscribe({
        next: () => {
          this.closeAssignModal();
          this.loadColis();
        },
        error: (err) => console.error('Error assigning livreur:', err)
      });
    }
  }
}
