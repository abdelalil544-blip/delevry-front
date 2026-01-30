import { Component } from '@angular/core';

@Component({
    selector: 'app-historique',
    standalone: true,
    template: `
    <div class="history-container">
      <h2>Historique de Livraison</h2>
      
      <div class="timeline">
        <div class="timeline-item">
          <div class="time">Aujourd'hui, 14:30</div>
          <div class="content">
            <h4>#COL-123 - En cours de livraison</h4>
            <p>Le livreur a récupéré le colis.</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="time">Hier, 10:15</div>
          <div class="content">
            <h4>#COL-120 - Livré</h4>
            <p>Le colis a été remis en main propre.</p>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .history-container { padding: 20px; }
    .timeline { position: relative; max-width: 800px; margin: 20px 0; padding-left: 30px; border-left: 2px solid #ddd; }
    .timeline-item { position: relative; margin-bottom: 30px; }
    .timeline-item::before { content: ''; position: absolute; left: -37px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: #3498db; border: 2px solid white; }
    .time { font-size: 0.85rem; color: #888; margin-bottom: 5px; }
    .content h4 { margin: 0; color: #2c3e50; }
    .content p { margin: 5px 0; color: #666; }
  `]
})
export class HistoriqueComponent { }
