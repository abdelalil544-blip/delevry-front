import { Component } from '@angular/core';

@Component({
    selector: 'app-admin-produits',
    standalone: true,
    template: `
    <div class="produits-container">
      <div class="header">
        <h2>Gestion des Produits</h2>
        <button class="btn-primary">+ Ajouter Produit</button>
      </div>
      
      <div class="product-grid">
        <div class="product-card">
          <div class="product-header">
            <h3>Produit Électronique A</h3>
            <span class="category">Électronique</span>
          </div>
          <p class="description">Description du produit avec ses caractéristiques principales.</p>
          <div class="product-footer">
            <span class="price">49.99 €</span>
            <div class="actions">
              <button class="btn-icon">✏️</button>
              <button class="btn-icon">🗑️</button>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-header">
            <h3>Article Maison B</h3>
            <span class="category">Maison</span>
          </div>
          <p class="description">Un autre produit avec sa description détaillée.</p>
          <div class="product-footer">
            <span class="price">29.99 €</span>
            <div class="actions">
              <button class="btn-icon">✏️</button>
              <button class="btn-icon">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .produits-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .product-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    .product-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px; }
    .product-header h3 { margin: 0; color: #2c3e50; }
    .category { background: #e8f5e9; color: #2e7d32; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; }
    .description { color: #7f8c8d; font-size: 0.9rem; margin-bottom: 15px; }
    .product-footer { display: flex; justify-content: space-between; align-items: center; }
    .price { font-size: 1.25rem; font-weight: bold; color: #27ae60; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 5px; }
  `]
})
export class AdminProduitsComponent { }
