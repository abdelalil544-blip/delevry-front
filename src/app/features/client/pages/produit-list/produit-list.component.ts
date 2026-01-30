import { Component } from '@angular/core';

@Component({
    selector: 'app-produit-list',
    standalone: true,
    template: `
    <div class="list-container">
      <h2>Catalogue de Produits</h2>
      <div class="search-bar">
        <input type="text" placeholder="Rechercher un produit...">
      </div>
      
      <div class="product-grid">
        <div class="product-card">
          <div class="product-info">
            <h3>Produit A</h3>
            <p class="category">Électronique</p>
            <p class="price">49.99 €</p>
          </div>
          <button class="btn-sm">Détails</button>
        </div>
        <div class="product-card">
          <div class="product-info">
            <h3>Produit B</h3>
            <p class="category">Maison</p>
            <p class="price">19.99 €</p>
          </div>
          <button class="btn-sm">Détails</button>
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
    .price { font-weight: bold; color: #2c3e50; }
    .btn-sm { padding: 8px 15px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; }
  `]
})
export class ProduitListComponent { }
