import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-admin-produits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="produits-container">
      <div class="header">
        <h2>Gestion des Produits</h2>
        <button class="btn-primary" (click)="showForm = true">+ Ajouter Produit</button>
      </div>

      <!-- Filters -->
      <div class="filters">
        <input 
          type="text" 
          placeholder="Rechercher par nom..." 
          [(ngModel)]="searchNom"
          (input)="onSearch()">
        <input 
          type="text" 
          placeholder="Filtrer par catégorie..." 
          [(ngModel)]="searchCategorie"
          (input)="onFilterCategory()">
        <button class="btn-reset" (click)="resetFilters()">Réinitialiser</button>
      </div>

      <!-- Add/Edit Form -->
      <div class="form-modal" *ngIf="showForm">
        <div class="form-card">
          <h3>{{ editingProduit ? 'Modifier' : 'Nouveau' }} Produit</h3>
          <form (ngSubmit)="saveProduit()">
            <div class="form-group">
              <label>Nom *</label>
              <input type="text" [(ngModel)]="formData.nom" name="nom" required>
            </div>
            <div class="form-group">
              <label>Catégorie</label>
              <input type="text" [(ngModel)]="formData.categorie" name="categorie">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Poids (kg)</label>
                <input type="number" step="0.01" [(ngModel)]="formData.poids" name="poids">
              </div>
              <div class="form-group">
                <label>Prix (€)</label>
                <input type="number" step="0.01" [(ngModel)]="formData.prix" name="prix">
              </div>
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
        Chargement des produits...
      </div>

      <!-- Error -->
      <div *ngIf="error" class="error-msg">
        {{ error }}
        <button class="btn-retry" (click)="loadProduits()">Réessayer</button>
      </div>

      <!-- Product Grid -->
      <div class="product-grid" *ngIf="!loading && !error">
        <div class="product-card" *ngFor="let produit of filteredProduits">
          <div class="product-header">
            <h3>{{ produit.nom }}</h3>
            <span class="category">{{ produit.categorie || 'Non catégorisé' }}</span>
          </div>
          <p class="description">Poids: {{ produit.poids || 0 }} kg</p>
          <div class="product-footer">
            <span class="price">{{ produit.prix || 0 | number:'1.2-2' }} €</span>
            <div class="actions">
              <button class="btn-icon" title="Supprimer" (click)="deleteProduit(produit.id!)">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !error && filteredProduits.length === 0" class="empty-state">
        <p>Aucun produit trouvé.</p>
        <button class="btn-primary" (click)="showForm = true">Ajouter un produit</button>
      </div>
    </div>
  `,
  styles: [`
    .produits-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; transition: background 0.3s; }
    .btn-primary:hover { background: #2980b9; }
    
    .filters { display: flex; gap: 15px; margin-bottom: 25px; flex-wrap: wrap; }
    .filters input { padding: 10px 15px; border: 1px solid #ddd; border-radius: 6px; min-width: 200px; }
    .btn-reset { background: #ecf0f1; color: #333; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; }
    
    .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .product-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); transition: transform 0.2s; }
    .product-card:hover { transform: translateY(-3px); }
    .product-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px; }
    .product-header h3 { margin: 0; color: #2c3e50; }
    .category { background: #e8f5e9; color: #2e7d32; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; }
    .description { color: #7f8c8d; font-size: 0.9rem; margin-bottom: 15px; }
    .product-footer { display: flex; justify-content: space-between; align-items: center; }
    .price { font-size: 1.25rem; font-weight: bold; color: #27ae60; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 1.2rem; padding: 5px; transition: transform 0.2s; }
    .btn-icon:hover { transform: scale(1.2); }
    
    .loading { text-align: center; padding: 60px; color: #7f8c8d; }
    .spinner { width: 40px; height: 40px; border: 4px solid #ecf0f1; border-top-color: #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    
    .error-msg { text-align: center; padding: 40px; color: #e74c3c; background: #fdf2f2; border-radius: 8px; }
    .btn-retry { margin-top: 15px; background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
    
    .empty-state { text-align: center; padding: 60px; color: #7f8c8d; }
    
    .form-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .form-card { background: white; padding: 30px; border-radius: 12px; width: 100%; max-width: 500px; }
    .form-card h3 { margin-top: 0; color: #2c3e50; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; color: #666; font-weight: 500; }
    .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 25px; }
    .btn-cancel { background: #ecf0f1; color: #333; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
  `]
})
export class AdminProduitsComponent implements OnInit {
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  loading = true;
  error = '';
  showForm = false;
  editingProduit: Produit | null = null;
  formData: Produit = { nom: '', categorie: '', poids: 0, prix: 0 };

  searchNom = '';
  searchCategorie = '';

  constructor(private produitService: ProduitService) { }

  ngOnInit() {
    this.loadProduits();
  }

  loadProduits() {
    this.loading = true;
    this.error = '';

    this.produitService.getAll(0, 100).subscribe({
      next: (page) => {
        console.log('Produits loaded:', page);
        this.produits = page.content || [];
        this.filteredProduits = [...this.produits];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error = `Erreur: ${err.status} - ${err.message || 'Impossible de charger les produits'}`;
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterCategory() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProduits = this.produits.filter(p => {
      const matchNom = !this.searchNom || p.nom.toLowerCase().includes(this.searchNom.toLowerCase());
      const matchCategorie = !this.searchCategorie || (p.categorie && p.categorie.toLowerCase().includes(this.searchCategorie.toLowerCase()));
      return matchNom && matchCategorie;
    });
  }

  resetFilters() {
    this.searchNom = '';
    this.searchCategorie = '';
    this.filteredProduits = [...this.produits];
  }

  saveProduit() {
    if (!this.formData.nom) {
      alert('Le nom est obligatoire');
      return;
    }

    this.produitService.create(this.formData).subscribe({
      next: () => {
        this.showForm = false;
        this.resetForm();
        this.loadProduits();
      },
      error: (err) => {
        console.error('Error saving product:', err);
        alert('Erreur lors de la sauvegarde: ' + (err.error?.message || err.message));
      }
    });
  }

  deleteProduit(id: string) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.produitService.delete(id).subscribe({
        next: () => this.loadProduits(),
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.resetForm();
  }

  resetForm() {
    this.formData = { nom: '', categorie: '', poids: 0, prix: 0 };
    this.editingProduit = null;
  }
}
