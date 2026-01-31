import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZoneService } from '../../services/zone.service';
import { Zone } from '../../models/zone.model';

@Component({
  selector: 'app-admin-zones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="zones-container">
      <div class="header">
        <h2>Gestion des Zones</h2>
        <button class="btn-primary" (click)="showForm = true">+ Ajouter Zone</button>
      </div>

      <!-- Search -->
      <div class="filters">
        <input 
          type="text" 
          placeholder="Rechercher par nom..." 
          [(ngModel)]="searchNom"
          (input)="onSearch()">
        <input 
          type="text" 
          placeholder="Filtrer par code postal..." 
          [(ngModel)]="searchCodePostal"
          (input)="onSearch()">
        <button class="btn-reset" (click)="resetFilters()">Réinitialiser</button>
      </div>

      <!-- Add Form -->
      <div class="form-modal" *ngIf="showForm">
        <div class="form-card">
          <h3>Nouvelle Zone</h3>
          <form (ngSubmit)="saveZone()">
            <div class="form-group">
              <label>Nom *</label>
              <input type="text" [(ngModel)]="formData.nom" name="nom" required>
            </div>
            <div class="form-group">
              <label>Code Postal *</label>
              <input type="text" [(ngModel)]="formData.codePostal" name="codePostal" required>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-cancel" (click)="cancelForm()">Annuler</button>
              <button type="submit" class="btn-primary">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        Chargement...
      </div>

      <!-- Error -->
      <div *ngIf="error" class="error-msg">
        {{ error }}
        <button class="btn-retry" (click)="loadZones()">Réessayer</button>
      </div>

      <!-- Zones Table -->
      <div class="table-container" *ngIf="!loading && !error">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Code Postal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let zone of filteredZones">
              <td>{{ zone.nom }}</td>
              <td>{{ zone.codePostal }}</td>
              <td class="actions">
                <button class="btn-delete" (click)="deleteZone(zone.id!)">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="filteredZones.length === 0">
              <td colspan="3" class="empty">Aucune zone trouvée</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .zones-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
    
    .filters { display: flex; gap: 15px; margin-bottom: 25px; flex-wrap: wrap; }
    .filters input { padding: 10px 15px; border: 1px solid #ddd; border-radius: 6px; min-width: 200px; }
    .btn-reset { background: #ecf0f1; color: #333; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; }
    
    .table-container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f8f9fa; color: #555; font-weight: 600; }
    tr:hover { background: #f8f9fa; }
    
    .actions { display: flex; gap: 8px; }
    .btn-delete { background: none; border: none; cursor: pointer; font-size: 1.1rem; }
    .empty { text-align: center; color: #7f8c8d; padding: 40px !important; }
    
    .loading { text-align: center; padding: 60px; color: #7f8c8d; }
    .spinner { width: 40px; height: 40px; border: 4px solid #ecf0f1; border-top-color: #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    
    .error-msg { text-align: center; padding: 40px; color: #e74c3c; background: #fdf2f2; border-radius: 8px; }
    .btn-retry { margin-top: 15px; background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
    
    .form-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .form-card { background: white; padding: 30px; border-radius: 12px; width: 100%; max-width: 400px; }
    .form-card h3 { margin-top: 0; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; color: #666; }
    .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
    .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
    .btn-cancel { background: #ecf0f1; color: #333; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
  `]
})
export class AdminZonesComponent implements OnInit {
  zones: Zone[] = [];
  filteredZones: Zone[] = [];
  loading = true;
  error = '';
  showForm = false;
  formData: Zone = { nom: '', codePostal: '' };
  searchNom = '';
  searchCodePostal = '';

  constructor(private zoneService: ZoneService) { }

  ngOnInit() {
    this.loadZones();
  }

  loadZones() {
    this.loading = true;
    this.error = '';
    this.zoneService.getAll(0, 100).subscribe({
      next: (page) => {
        this.zones = page.content || [];
        this.filteredZones = [...this.zones];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading zones:', err);
        this.error = 'Erreur lors du chargement des zones';
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.filteredZones = this.zones.filter(z => {
      const matchNom = !this.searchNom || z.nom.toLowerCase().includes(this.searchNom.toLowerCase());
      const matchCode = !this.searchCodePostal || (z.codePostal && z.codePostal.includes(this.searchCodePostal));
      return matchNom && matchCode;
    });
  }

  resetFilters() {
    this.searchNom = '';
    this.searchCodePostal = '';
    this.filteredZones = [...this.zones];
  }

  saveZone() {
    if (!this.formData.nom || !this.formData.codePostal) {
      alert('Nom et code postal sont obligatoires');
      return;
    }
    this.zoneService.create(this.formData).subscribe({
      next: () => {
        this.showForm = false;
        this.formData = { nom: '', codePostal: '' };
        this.loadZones();
      },
      error: (err) => {
        console.error('Error saving zone:', err);
        alert('Erreur lors de la sauvegarde');
      }
    });
  }

  deleteZone(id: string) {
    if (confirm('Voulez-vous vraiment supprimer cette zone ?')) {
      this.zoneService.delete(id).subscribe({
        next: () => this.loadZones(),
        error: (err) => {
          console.error('Error deleting zone:', err);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.formData = { nom: '', codePostal: '' };
  }
}
