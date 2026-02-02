import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-livreur-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar" [class.collapsed]="sidebarCollapsed">
        <div class="sidebar-header">
          <div class="logo">
            <span class="logo-icon">🚚</span>
            <span class="logo-text" *ngIf="!sidebarCollapsed">LogiLivreur</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="./mes-colis" routerLinkActive="active" class="nav-item" title="Mes Colis">
            <span class="nav-icon">📦</span>
            <span class="nav-label" *ngIf="!sidebarCollapsed">Mes Colis</span>
          </a>
          <a routerLink="./ma-tournee" routerLinkActive="active" class="nav-item" title="Ma Tournée">
            <span class="nav-icon">🗺️</span>
            <span class="nav-label" *ngIf="!sidebarCollapsed">Ma Tournée</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <button (click)="logout()" class="logout-btn" title="Déconnexion">
            <span class="nav-icon">🚪</span>
            <span class="nav-label" *ngIf="!sidebarCollapsed">Déconnexion</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <header class="top-bar">
          <div class="user-info">
            <div class="avatar">{{ userInitial }}</div>
            <div class="user-details">
              <span class="user-name">Livreur Expérience</span>
              <span class="user-role">Transporteur Partenaire</span>
            </div>
          </div>
        </header>

        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      --sidebar-width: 260px;
      --sidebar-collapsed-width: 80px;
      --primary-color: #3b82f6;
      --sidebar-bg: #1e293b;
      --sidebar-hover: #334155;
      --main-bg: #f8fafc;
      --top-bar-height: 70px;
      display: block;
      height: 100vh;
    }

    .dashboard-container {
      display: flex;
      height: 100%;
    }

    .sidebar {
      width: var(--sidebar-width);
      background: var(--sidebar-bg);
      color: white;
      display: flex;
      flex-direction: column;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
    }

    .sidebar.collapsed {
      width: var(--sidebar-collapsed-width);
    }

    .sidebar-header {
      padding: 24px;
      margin-bottom: 30px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon { font-size: 2rem; }
    .logo-text { font-weight: 800; font-size: 1.4rem; letter-spacing: -0.5px; }

    .sidebar-nav {
      flex: 1;
      padding: 0 16px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 14px 16px;
      color: #94a3b8;
      text-decoration: none;
      border-radius: 12px;
      margin-bottom: 8px;
      transition: all 0.2s;
      gap: 12px;
    }

    .nav-item:hover {
      background: var(--sidebar-hover);
      color: white;
    }

    .nav-item.active {
      background: var(--primary-color);
      color: white;
      box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
    }

    .nav-icon { font-size: 1.4rem; }
    .nav-label { font-weight: 600; font-size: 0.95rem; }

    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      border-radius: 12px;
      transition: all 0.2s;
    }

    .logout-btn:hover {
      background: #ef444422;
      color: #ef4444;
    }

    /* Main Content Area */
    .main-content {
      flex: 1;
      background: var(--main-bg);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .top-bar {
      height: var(--top-bar-height);
      background: white;
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-bottom: 1px solid #e2e8f0;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      background: #dbeafe;
      color: #1e40af;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name { font-weight: 700; color: #1e293b; font-size: 0.95rem; }
    .user-role { font-size: 0.8rem; color: #64748b; }

    .content-wrapper {
      padding: 32px;
      flex: 1;
    }

    @media (max-width: 768px) {
      .sidebar { position: fixed; height: 100%; left: -260px; }
      .sidebar.active { left: 0; }
    }
  `]
})
export class LivreurDashboardComponent implements OnInit {
  sidebarCollapsed = false;
  userInitial = 'L';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // Si on est juste sur /livreur, on redirige vers /livreur/mes-colis
    if (this.router.url === '/livreur') {
      this.router.navigate(['/livreur/mes-colis']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
