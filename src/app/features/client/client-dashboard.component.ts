import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo">
          <h2>SmartLogi</h2>
          <span>Client Portal</span>
        </div>
        
        <nav>
          <a routerLink="overview" routerLinkActive="active">
            <i class="icon">📊</i> Vue d'ensemble
          </a>
          <a routerLink="colis" routerLinkActive="active">
            <i class="icon">📦</i> Mes Colis
          </a>
          <a routerLink="colis/create" routerLinkActive="active">
            <i class="icon">➕</i> Nouvelle Expédition
          </a>
          <a routerLink="profile" routerLinkActive="active">
            <i class="icon">👤</i> Mon Profil
          </a>
        </nav>

        <div class="sidebar-footer">
          <button (click)="logout()" class="logout-btn">
             Déconnexion
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="content">
        <header class="top-header">
           <h1>Dashboard Client</h1>
        </header>
        
        <div class="page-content">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-layout { display: flex; min-height: 100vh; background-color: #f4f7f6; }
    
    .sidebar { width: 260px; background: #2c3e50; color: white; display: flex; flex-direction: column; }
    .logo { padding: 30px 20px; text-align: center; border-bottom: 1px solid #34495e; }
    .logo h2 { margin: 0; color: #3498db; }
    
    nav { flex: 1; padding: 20px 0; }
    nav a { display: block; padding: 15px 25px; color: #bdc3c7; text-decoration: none; transition: 0.3s; }
    nav a:hover { background: #34495e; color: white; }
    nav a.active { background: #3498db; color: white; border-left: 4px solid #fff; }
    .icon { margin-right: 10px; }

    .sidebar-footer { padding: 20px; border-top: 1px solid #34495e; }
    .logout-btn { width: 100%; padding: 10px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; }

    .content { flex: 1; display: flex; flex-direction: column; }
    .top-header { background: white; padding: 15px 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .page-content { flex: 1; }
  `]
})
export class ClientDashboardComponent {
  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }
}
