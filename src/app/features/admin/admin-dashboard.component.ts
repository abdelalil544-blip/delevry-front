import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo">
          <h2>SmartLogi</h2>
          <span>Admin Panel</span>
        </div>
        
        <nav>
          <a routerLink="overview" routerLinkActive="active">
            <i class="icon">📊</i> Vue d'ensemble
          </a>
          <a routerLink="users" routerLinkActive="active">
            <i class="icon">👥</i> Utilisateurs
          </a>
          <a routerLink="colis" routerLinkActive="active">
            <i class="icon">📦</i> Gestion Colis
          </a>
          <a routerLink="produits" routerLinkActive="active">
            <i class="icon">🛒</i> Produits
          </a>
          <a routerLink="zones" routerLinkActive="active">
            <i class="icon">🗺️</i> Zones
          </a>
        </nav>

        <div class="sidebar-footer">
          <button (click)="logout()" class="logout-btn">
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="content">
        <header class="top-header">
          <h1>Panneau d'Administration</h1>
        </header>
        
        <div class="page-content">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-layout { display: flex; min-height: 100vh; background-color: #f0f2f5; }
    
    .sidebar { width: 260px; background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%); color: white; display: flex; flex-direction: column; }
    .logo { padding: 30px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .logo h2 { margin: 0; color: #e94560; font-size: 1.5rem; }
    .logo span { font-size: 0.85rem; color: #a0a0a0; }
    
    nav { flex: 1; padding: 20px 0; }
    nav a { display: flex; align-items: center; padding: 15px 25px; color: #a0a0a0; text-decoration: none; transition: all 0.3s; }
    nav a:hover { background: rgba(255,255,255,0.05); color: white; }
    nav a.active { background: rgba(233, 69, 96, 0.2); color: #e94560; border-left: 4px solid #e94560; }
    .icon { margin-right: 12px; font-size: 1.1rem; }

    .sidebar-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
    .logout-btn { width: 100%; padding: 12px; background: #e94560; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }

    .content { flex: 1; display: flex; flex-direction: column; }
    .top-header { background: white; padding: 20px 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .top-header h1 { margin: 0; font-size: 1.5rem; color: #1a1a2e; }
    .page-content { flex: 1; padding: 20px; }
  `]
})
export class AdminDashboardComponent {
  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }
}
