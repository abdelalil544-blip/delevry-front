import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ColisService } from '../../../admin/services/colis.service';
import { PrioriteColis } from '../../../admin/models/colis.model';
import { ClientService, ClientExpediteur } from '../../client.service';
import { DestinataireService, Destinataire } from '../../../destinataire/destinataire.service';
import { ZoneService } from '../../../admin/services/zone.service';
import { Zone } from '../../../admin/models/zone.model';

@Component({
  selector: 'app-colis-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="create-container">
      <h2>Nouvelle expédition</h2>

      <form (ngSubmit)="submit()" #form="ngForm" class="form">
        <div class="form-row">
          <label for="description">Description *</label>
          <input
            id="description"
            name="description"
            type="text"
            required
            [(ngModel)]="description"
          />
        </div>

        <div class="form-row">
          <label for="villeDestination">Ville de destination *</label>
          <input
            id="villeDestination"
            name="villeDestination"
            type="text"
            required
            [(ngModel)]="villeDestination"
          />
        </div>

        <div class="form-row">
          <label for="destinataire">Destinataire *</label>
          <select
            id="destinataire"
            name="destinataire"
            required
            [(ngModel)]="selectedDestinataireId"
          >
            <option [ngValue]="null" disabled>-- Sélectionner un destinataire --</option>
            <option *ngFor="let d of destinataires" [value]="d.id">
              {{ d.nom }} {{ d.prenom }} ({{ d.telephone || 'sans téléphone' }})
            </option>
          </select>
        </div>

        <div class="form-row">
          <label for="zone">Zone *</label>
          <select
            id="zone"
            name="zone"
            required
            [(ngModel)]="selectedZoneId"
          >
            <option [ngValue]="null" disabled>-- Sélectionner une zone --</option>
            <option *ngFor="let z of zones" [value]="z.id">
              {{ z.nom }} <span *ngIf="z.ville">- {{ z.ville }}</span>
            </option>
          </select>
        </div>

        <div class="form-row">
          <label for="poids">Poids (kg) *</label>
          <input
            id="poids"
            name="poids"
            type="number"
            min="0.1"
            step="0.1"
            required
            [(ngModel)]="poids"
          />
        </div>

        <div class="form-row">
          <label for="priorite">Priorité *</label>
          <select
            id="priorite"
            name="priorite"
            required
            [(ngModel)]="priorite"
          >
            <option *ngFor="let p of priorites" [value]="p">
              {{ p }}
            </option>
          </select>
        </div>

        <div class="actions">
          <button type="button" class="btn-secondary" routerLink="../colis">
            Annuler
          </button>
          <button type="submit" class="btn-primary" [disabled]="loading || !form.form.valid">
            {{ loading ? 'Création en cours...' : 'Créer le colis' }}
          </button>
        </div>

        <p *ngIf="errorMessage" class="error">
          {{ errorMessage }}
        </p>
        <p *ngIf="successMessage" class="success">
          {{ successMessage }}
        </p>
      </form>
    </div>
  `,
  styles: [`
    .create-container {
      padding: 20px;
      max-width: 600px;
    }

    h2 {
      margin-bottom: 20px;
    }

    .form {
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-weight: 500;
      color: #555;
    }

    input, select {
      padding: 8px 10px;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 14px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
    }

    .btn-primary,
    .btn-secondary {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-primary {
      background-color: #007bff;
      color: #fff;
    }

    .btn-secondary {
      background-color: #e0e0e0;
      color: #333;
    }

    .btn-primary[disabled] {
      opacity: 0.6;
      cursor: default;
    }

    .error {
      margin-top: 10px;
      color: #d9534f;
    }

    .success {
      margin-top: 10px;
      color: #28a745;
    }
  `]
})
export class ColisCreateComponent {
  description = '';
  villeDestination = '';
  poids: number | null = null;
  priorite: PrioriteColis = PrioriteColis.NORMALE;

  client: ClientExpediteur | null = null;
  destinataires: Destinataire[] = [];
  zones: Zone[] = [];

  selectedDestinataireId: string | null = null;
  selectedZoneId: string | null = null;

  loading = false;
  errorMessage = '';
  successMessage = '';

  priorites = Object.values(PrioriteColis);

  constructor(
    private colisService: ColisService,
    private clientService: ClientService,
    private destinataireService: DestinataireService,
    private zoneService: ZoneService,
    private router: Router
  ) {}

  ngOnInit() {
    // Charger le client connecté
    this.clientService.getMe().subscribe({
      next: (client) => {
        this.client = client;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les informations du client.';
      }
    });

    // Charger les destinataires
    this.destinataireService.getAll(0, 100).subscribe({
      next: (page) => {
        this.destinataires = page.content;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger la liste des destinataires.';
      }
    });

    // Charger les zones
    this.zoneService.getAll(0, 100).subscribe({
      next: (page) => {
        this.zones = page.content;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger la liste des zones.';
      }
    });
  }

  submit() {
    if (!this.description || !this.villeDestination || !this.poids || !this.selectedDestinataireId || !this.selectedZoneId || !this.client) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload: any = {
      description: this.description,
      villeDestination: this.villeDestination,
      poids: this.poids,
      priorite: this.priorite,
      clientExpediteurId: this.client.id,
      destinataireId: this.selectedDestinataireId,
      zoneId: this.selectedZoneId
    };

    this.colisService.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Colis créé avec succès.';
        // On reste sur la même page après la création
      },
      error: (err) => {
        console.error('Erreur lors de la création du colis', err);
        this.loading = false;
        this.errorMessage = 'Erreur lors de la création du colis.';
      }
    });
  }
}

