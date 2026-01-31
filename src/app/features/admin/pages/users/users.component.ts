import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ClientExpediteur, Livreur, Destinataire } from '../../models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-container">
      <div class="header">
        <h2>Gestion des Utilisateurs</h2>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button 
          [class.active]="activeTab === 'clients'" 
          (click)="switchTab('clients')">
          Clients ({{ clientsTotal }})
        </button>
        <button 
          [class.active]="activeTab === 'livreurs'" 
          (click)="switchTab('livreurs')">
          Livreurs ({{ livreursTotal }})
        </button>
        <button 
          [class.active]="activeTab === 'destinataires'" 
          (click)="switchTab('destinataires')">
          Destinataires ({{ destinatairesTotal }})
        </button>
      </div>

      <!-- Search -->
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Rechercher par nom ou prénom..." 
          [(ngModel)]="searchQuery"
          (input)="onSearch()">
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        Chargement...
      </div>

      <!-- Error -->
      <div *ngIf="error" class="error-msg">
        {{ error }}
        <button class="btn-retry" (click)="loadData()">Réessayer</button>
      </div>

      <!-- Users Table -->
      <div class="table-container" *ngIf="!loading && !error">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th *ngIf="activeTab === 'livreurs'">Véhicule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Clients -->
            <ng-container *ngIf="activeTab === 'clients'">
              <tr *ngFor="let client of filteredClients">
                <td>{{ client.nom }}</td>
                <td>{{ client.prenom }}</td>
                <td>{{ client.email }}</td>
                <td>{{ client.telephone || '-' }}</td>
                <td class="actions">
                  <button class="btn-delete" (click)="deleteUser('client', client.id!)">🗑️</button>
                </td>
              </tr>
              <tr *ngIf="filteredClients.length === 0">
                <td colspan="5" class="empty">Aucun client trouvé</td>
              </tr>
            </ng-container>

            <!-- Livreurs -->
            <ng-container *ngIf="activeTab === 'livreurs'">
              <tr *ngFor="let livreur of filteredLivreurs">
                <td>{{ livreur.nom }}</td>
                <td>{{ livreur.prenom }}</td>
                <td>{{ livreur.email }}</td>
                <td>{{ livreur.telephone || '-' }}</td>
                <td>{{ livreur.vehicule || '-' }}</td>
                <td class="actions">
                  <button class="btn-delete" (click)="deleteUser('livreur', livreur.id!)">🗑️</button>
                </td>
              </tr>
              <tr *ngIf="filteredLivreurs.length === 0">
                <td colspan="6" class="empty">Aucun livreur trouvé</td>
              </tr>
            </ng-container>

            <!-- Destinataires -->
            <ng-container *ngIf="activeTab === 'destinataires'">
              <tr *ngFor="let dest of filteredDestinataires">
                <td>{{ dest.nom }}</td>
                <td>{{ dest.prenom }}</td>
                <td>{{ dest.email }}</td>
                <td>{{ dest.telephone || '-' }}</td>
                <td class="actions">
                  <button class="btn-delete" (click)="deleteUser('destinataire', dest.id!)">🗑️</button>
                </td>
              </tr>
              <tr *ngIf="filteredDestinataires.length === 0">
                <td colspan="5" class="empty">Aucun destinataire trouvé</td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .users-container { padding: 20px; }
    .header { margin-bottom: 20px; }
    .header h2 { color: #2c3e50; margin: 0; }
    
    .tabs { display: flex; gap: 10px; margin-bottom: 20px; }
    .tabs button { padding: 12px 24px; border: none; background: #ecf0f1; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.3s; }
    .tabs button.active { background: #3498db; color: white; }
    .tabs button:hover:not(.active) { background: #dfe6e9; }
    
    .search-bar { margin-bottom: 20px; }
    .search-bar input { width: 100%; max-width: 400px; padding: 12px 16px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
    
    .table-container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f8f9fa; color: #555; font-weight: 600; }
    tr:hover { background: #f8f9fa; }
    
    .actions { display: flex; gap: 8px; }
    .btn-delete { background: none; border: none; cursor: pointer; font-size: 1.1rem; padding: 5px; transition: transform 0.2s; }
    .btn-delete:hover { transform: scale(1.2); }
    
    .empty { text-align: center; color: #7f8c8d; padding: 40px !important; }
    
    .loading { text-align: center; padding: 60px; color: #7f8c8d; }
    .spinner { width: 40px; height: 40px; border: 4px solid #ecf0f1; border-top-color: #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    
    .error-msg { text-align: center; padding: 40px; color: #e74c3c; background: #fdf2f2; border-radius: 8px; margin-bottom: 20px; }
    .btn-retry { margin-top: 15px; background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
  `]
})
export class AdminUsersComponent implements OnInit {
  activeTab: 'clients' | 'livreurs' | 'destinataires' = 'clients';

  clients: ClientExpediteur[] = [];
  livreurs: Livreur[] = [];
  destinataires: Destinataire[] = [];

  filteredClients: ClientExpediteur[] = [];
  filteredLivreurs: Livreur[] = [];
  filteredDestinataires: Destinataire[] = [];

  clientsTotal = 0;
  livreursTotal = 0;
  destinatairesTotal = 0;

  loading = false;
  error = '';
  searchQuery = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.error = '';

    // Load all user types
    this.loadClients();
    this.loadLivreurs();
    this.loadDestinataires();
  }

  loadClients() {
    this.userService.getAllClients(0, 100).subscribe({
      next: (page) => {
        this.clients = page.content || [];
        this.filteredClients = [...this.clients];
        this.clientsTotal = page.totalElements;
        this.checkLoadingComplete();
      },
      error: (err) => {
        console.error('Error loading clients:', err);
        this.error = 'Erreur lors du chargement des clients';
        this.loading = false;
      }
    });
  }

  loadLivreurs() {
    this.userService.getAllLivreurs(0, 100).subscribe({
      next: (page) => {
        this.livreurs = page.content || [];
        this.filteredLivreurs = [...this.livreurs];
        this.livreursTotal = page.totalElements;
        this.checkLoadingComplete();
      },
      error: (err) => {
        console.error('Error loading livreurs:', err);
        this.error = 'Erreur lors du chargement des livreurs';
        this.loading = false;
      }
    });
  }

  loadDestinataires() {
    this.userService.getAllDestinataires(0, 100).subscribe({
      next: (page) => {
        this.destinataires = page.content || [];
        this.filteredDestinataires = [...this.destinataires];
        this.destinatairesTotal = page.totalElements;
        this.checkLoadingComplete();
      },
      error: (err) => {
        console.error('Error loading destinataires:', err);
        this.error = 'Erreur lors du chargement des destinataires';
        this.loading = false;
      }
    });
  }

  private checkLoadingComplete() {
    // Check if all data is loaded
    if (this.clients.length >= 0 && this.livreurs.length >= 0 && this.destinataires.length >= 0) {
      this.loading = false;
    }
  }

  switchTab(tab: 'clients' | 'livreurs' | 'destinataires') {
    this.activeTab = tab;
    this.searchQuery = '';
    this.applyFilter();
  }

  onSearch() {
    this.applyFilter();
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase();

    this.filteredClients = this.clients.filter(c =>
      (c.nom?.toLowerCase().includes(query) || c.prenom?.toLowerCase().includes(query) || c.email?.toLowerCase().includes(query))
    );

    this.filteredLivreurs = this.livreurs.filter(l =>
      (l.nom?.toLowerCase().includes(query) || l.prenom?.toLowerCase().includes(query) || l.email?.toLowerCase().includes(query))
    );

    this.filteredDestinataires = this.destinataires.filter(d =>
      (d.nom?.toLowerCase().includes(query) || d.prenom?.toLowerCase().includes(query) || d.email?.toLowerCase().includes(query))
    );
  }

  deleteUser(type: string, id: string) {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

    let deleteObs;
    switch (type) {
      case 'client':
        deleteObs = this.userService.deleteClient(id);
        break;
      case 'livreur':
        deleteObs = this.userService.deleteLivreur(id);
        break;
      case 'destinataire':
        deleteObs = this.userService.deleteDestinataire(id);
        break;
      default:
        return;
    }

    deleteObs.subscribe({
      next: () => this.loadData(),
      error: (err) => {
        console.error('Error deleting user:', err);
        alert('Erreur lors de la suppression');
      }
    });
  }
}
