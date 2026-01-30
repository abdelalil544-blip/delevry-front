import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-colis-create',
    standalone: true,
    imports: [FormsModule],
    template: `
    <div class="create-container">
      <h2>Nouvelle Demande de Livraison</h2>
      <form class="create-form">
        <div class="form-group">
          <label>Description du Colis</label>
          <input type="text" placeholder="Ex: Documents, Vêtements...">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Poids (kg)</label>
            <input type="number" step="0.1">
          </div>
          <div class="form-group">
            <label>Priorité</label>
            <select>
              <option>BASSE</option>
              <option>MOYENNE</option>
              <option>HAUTE</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Adresse de Destination</label>
          <input type="text">
        </div>
        <button type="submit" class="btn-submit">Créer l'expédition</button>
      </form>
    </div>
  `,
    styles: [`
    .create-container { padding: 20px; }
    .create-form { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 600px; }
    .form-group { margin-bottom: 15px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .form-group label { display: block; margin-bottom: 5px; color: #666; }
    .form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
    .btn-submit { background: #007bff; color: white; border: none; padding: 12px; width: 100%; border-radius: 4px; cursor: pointer; font-size: 1rem; margin-top: 10px; }
  `]
})
export class ColisCreateComponent { }
