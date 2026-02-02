import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../admin/services/user.service';
import { ClientExpediteur } from '../../../admin/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <h2>Mon Profil</h2>
      
      <div *ngIf="message" class="alert" [ngClass]="messageType">
        {{ message }}
      </div>

      <div class="profile-card" *ngIf="client">
        <div class="profile-header">
           <div class="avatar">{{ client.nom.charAt(0) }}{{ client.prenom.charAt(0) }}</div>
           <div class="header-info">
             <h3>{{ client.nom }} {{ client.prenom }}</h3>
             <span class="role-badge">Client Expéditeur</span>
           </div>
        </div>

        <form (ngSubmit)="onSave()" #profileForm="ngForm">
          <div class="form-row">
            <div class="form-group">
              <label>Nom</label>
              <input type="text" name="nom" [(ngModel)]="client.nom" required>
            </div>
            <div class="form-group">
              <label>Prénom</label>
              <input type="text" name="prenom" [(ngModel)]="client.prenom" required>
            </div>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" [value]="client.email" readonly class="readonly-input">
            <small>L'email ne peut pas être modifié.</small>
          </div>

          <div class="form-group">
            <label>Entreprise</label>
            <input type="text" name="entreprise" [(ngModel)]="client.entreprise">
          </div>

          <div class="form-group">
            <label>Téléphone</label>
            <input type="text" name="telephone" [(ngModel)]="client.telephone">
          </div>

          <div class="form-group">
            <label>Adresse</label>
            <textarea name="adresse" [(ngModel)]="client.adresse" rows="3"></textarea>
          </div>

          <button type="submit" class="btn-save" [disabled]="loading || !profileForm.form.valid">
            {{ loading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .profile-container { padding: 20px; max-width: 800px; margin: 0 auto; }
    .profile-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    
    .profile-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
    .avatar { width: 70px; height: 70px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; }
    .header-info h3 { margin: 0; color: #2c3e50; }
    .role-badge { display: inline-block; padding: 4px 12px; background: #ebf5fb; color: #3498db; border-radius: 20px; font-size: 0.85rem; margin-top: 5px; }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; color: #444; font-weight: 500; }
    .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; }
    .readonly-input { background: #f8f9fa; cursor: not-allowed; }
    small { color: #888; font-size: 0.8rem; }

    .btn-save { background: #2ecc71; color: white; border: none; padding: 14px 25px; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold; transition: background 0.3s; margin-top: 10px; }
    .btn-save:hover { background: #27ae60; }
    .btn-save:disabled { background: #ccc; cursor: not-allowed; }

    .alert { padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .alert.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .alert.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
  `]
})
export class ProfileComponent implements OnInit {
  client: ClientExpediteur | null = null;
  loading = false;
  message = '';
  messageType = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getCurrentClient().subscribe({
      next: (data) => this.client = data,
      error: (err: any) => console.error('Error loading profile:', err)
    });
  }

  onSave() {
    if (!this.client || !this.client.id) return;

    this.loading = true;
    this.message = '';

    this.userService.updateClient(this.client.id, this.client).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Profil mis à jour avec succès !';
        this.messageType = 'success';
      },
      error: (err: any) => {
        this.loading = false;
        this.message = 'Erreur lors de la mise à jour.';
        this.messageType = 'error';
        console.error('Error updating profile:', err);
      }
    });
  }
}
