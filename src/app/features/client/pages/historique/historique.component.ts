import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColisService } from '../../../admin/services/colis.service';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-container">
      <h2>Historique des Activités</h2>
      
      <div *ngIf="loading" class="loading">Chargement de l'historique...</div>

      <div class="timeline" *ngIf="!loading && history.length > 0">
        <div class="timeline-item" *ngFor="let item of history">
          <div class="time">{{ item.dateChangement | date:'dd/MM/yyyy HH:mm' }}</div>
          <div class="content">
            <h4>Statut : {{ item.statut }}</h4>
            <p>{{ item.commentaire || 'Aucun commentaire' }}</p>
          </div>
        </div>
      </div>

      <div *ngIf="!loading && history.length === 0" class="empty-state">
        <p>Aucun historique disponible pour le moment.</p>
      </div>
    </div>
  `,
  styles: [`
    .history-container { padding: 20px; }
    .timeline { position: relative; max-width: 800px; margin: 20px 0; padding-left: 30px; border-left: 2px solid #3498db; }
    .timeline-item { position: relative; margin-bottom: 30px; }
    .timeline-item::before { content: ''; position: absolute; left: -37px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: #3498db; border: 3px solid white; box-shadow: 0 0 0 2px #3498db; }
    .time { font-size: 0.85rem; color: #888; margin-bottom: 5px; font-weight: bold; }
    .content { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .content h4 { margin: 0; color: #2c3e50; font-size: 1rem; }
    .content p { margin: 8px 0 0; color: #666; font-size: 0.95rem; }
    .loading, .empty-state { text-align: center; padding: 50px; color: #666; }
  `]
})
export class HistoriqueComponent implements OnInit {
  history: any[] = [];
  loading = false;

  constructor(private colisService: ColisService) { }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.colisService.getMyHistory().subscribe({
      next: (page) => {
        this.history = page.content;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading history:', err);
        this.loading = false;
      }
    });
  }
}
