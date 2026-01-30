import { Component } from '@angular/core';

@Component({
    selector: 'app-profile',
    standalone: true,
    template: `
    <div class="profile-container">
      <h2>Mon Profil</h2>
      <div class="profile-card">
        <div class="form-group">
          <label>Nom Complet</label>
          <input type="text" value="Client Demo" readonly>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" value="client@example.com" readonly>
        </div>
        <div class="form-group">
          <label>Téléphone</label>
          <input type="text" value="+123456789">
        </div>
        <button class="btn-save">Enregistrer</button>
      </div>
    </div>
  `,
    styles: [`
    .profile-container { padding: 20px; }
    .profile-card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; color: #666; }
    .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
    .btn-save { background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 10px; }
  `]
})
export class ProfileComponent { }
