import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../../admin/services/produit.service';
import { Produit } from '../../../admin/models/produit.model';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="list-container">
      <h2>Catalogue de Produits</h2>
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Rechercher un produit..." 
          [(ngModel)]="searchQuery"
          (input)="onSearch()">
      </div>
      
      <div *ngIf="loading" class="loading">Chargement...</div>

      <div class="product-grid" *ngIf="!loading">
        <div class="product-card" *ngFor="let p of produits">
          <div class="product-info">
            <h3>{{ p.nom }}</h3>
            <p class="category">{{ p.categorie }}</p>
            <p class="price">{{ p.prix }} €</p>
          </div>
          <button class="btn-sm">Détails</button>
        </div>
        <div *ngIf="produits.length === 0" class="empty">
          Aucun produit trouvé.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-container { padding: 20px; }
    .search-bar { margin-bottom: 20px; }
    .search-bar input { width: 100%; max-width: 400px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
    .product-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center; }
    .product-info h3 { margin: 0; font-size: 1.1rem; }
    .category { color: #666; font-size: 0.9rem; margin: 5px 0; }
    .price { font-weight: bold; color: #2c3e50; font-size: 1.1rem; }
    .stock { font-size: 0.8rem; margin-top: 5px; color: #27ae60; }
    .stock.out { color: #e74c3c; }
    .btn-sm { padding: 8px 15px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .loading, .empty { text-align: center; padding: 40px; color: #666; grid-column: 1 / -1; }
  `]
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];
  loading = false;
  searchQuery = '';

  constructor(private produitService: ProduitService) { }

  ngOnInit() {
    this.loadProduits();
  }

  loadProduits() {
    this.loading = true;
    this.produitService.getAll(0, 50).subscribe({
      next: (page) => {
        console.log('Products loaded from backend:', page.content);
        this.produits = page.content;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (this.searchQuery.length > 2) {
      this.loading = true;
      this.produitService.search(this.searchQuery).subscribe({
        next: (page) => {
          this.produits = page.content;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error searching products:', err);
          this.loading = false;
        }
      });
    } else if (this.searchQuery.length === 0) {
      this.loadProduits();
    }
  }
}
