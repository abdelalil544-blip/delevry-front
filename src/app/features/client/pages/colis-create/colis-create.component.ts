import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ColisService } from '../../../admin/services/colis.service';
import { UserService } from '../../../admin/services/user.service';
import { ZoneService } from '../../../admin/services/zone.service';
import { ProduitService } from '../../../admin/services/produit.service';
import { Zone } from '../../../admin/models/zone.model';
import { Destinataire } from '../../../admin/models/user.model';
import { Produit } from '../../../admin/models/produit.model';
import { PrioriteColis } from '../../../admin/models/colis.model';

@Component({
  selector: 'app-colis-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-wrapper">
      <div class="header-section">
        <h2>📦 Nouvelle Expédition</h2>
        <p>Remplissez les informations ci-dessous pour envoyer votre colis.</p>
      </div>
      
      <div *ngIf="message" class="alert-toast" [ngClass]="messageType">
        <span class="icon">{{ messageType === 'success' ? '✅' : '❌' }}</span>
        {{ message }}
      </div>

      <div class="main-card">
        <form class="create-form" (ngSubmit)="onSubmit()" #colisForm="ngForm">
          
          <div class="form-section">
            <div class="section-title">
              <span class="step-number">1</span>
              <h3>Détails du Colis</h3>
            </div>
            
            <div class="form-group full-width">
              <label>Description</label>
              <input 
                type="text" 
                name="description" 
                [(ngModel)]="colis.description" 
                placeholder="Ex: Appareils électroniques fragiles..."
                required>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Poids estimé (kg)</label>
                <div class="input-with-unit">
                  <input type="number" name="poids" [(ngModel)]="colis.poids" step="0.1" required>
                  <span class="unit">kg</span>
                </div>
              </div>
              <div class="form-group">
                <label>Niveau de Priorité</label>
                <select name="priorite" [(ngModel)]="colis.priorite" required>
                  <option *ngFor="let p of priorites" [value]="p">{{ p }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="section-title">
              <span class="step-number">2</span>
              <h3>Destination & Destinataire</h3>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>Zone de Livraison</label>
                <select name="zoneId" [(ngModel)]="colis.zoneId" required>
                  <option value="">Sélectionnez une zone</option>
                  <option *ngFor="let z of zones" [value]="z.id">{{ z.nom }} ({{ z.codePostal }})</option>
                </select>
              </div>
              <div class="form-group">
                <label>Ville</label>
                <input type="text" name="villeDestination" [(ngModel)]="colis.villeDestination" placeholder="Ville de destination" required>
              </div>
            </div>

            <div class="form-group full-width">
              <label>Destinataire</label>
              <select name="destinataireId" [(ngModel)]="colis.destinataireId" required>
                <option value="">Sélectionnez une personne</option>
                <option *ngFor="let d of destinataires" [value]="d.id">{{ d.nom }} {{ d.prenom }}</option>
              </select>
            </div>
          </div>

          <div class="form-section">
            <div class="section-title">
              <span class="step-number">3</span>
              <h3>Contenu du Colis (Optionnel)</h3>
            </div>
            
            <div class="product-selector card-inner">
              <div class="selector-controls">
                <div class="select-wrapper">
                  <select [(ngModel)]="selectedProduitId" name="selectProd">
                    <option value="">Choisir un produit du catalogue</option>
                    <option *ngFor="let p of produitsDisponibles" [value]="p.id">{{ p.nom }} - {{ p.prix }}€</option>
                  </select>
                </div>
                <input type="number" [(ngModel)]="selectedQuantite" name="selectQty" min="1" class="qty-input">
                <button type="button" class="btn-add-prod" (click)="addProduct()" [disabled]="!selectedProduitId">
                  <span>+</span> Ajouter
                </button>
              </div>

              <div class="selected-products" *ngIf="colis.produits.length > 0">
                <div class="product-tag" *ngFor="let item of colis.produits; let i = index">
                  <span class="prod-info"><strong>{{ item.produitNom }}</strong> (x{{ item.quantite }})</span>
                  <button type="button" class="remove-tag" (click)="removeProduct(i)">×</button>
                </div>
              </div>
            </div>
          </div>

          <div class="form-footer">
            <button type="submit" class="btn-submit-premium" [disabled]="loading || !colisForm.form.valid">
              <span class="btn-text">{{ loading ? 'Traitement en cours...' : 'Confirmer l\\'Expédition' }}</span>
              <span class="btn-icon">🚀</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; background: #f8fafc; min-height: 100vh; padding-bottom: 50px; }
    .create-wrapper { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
    
    .header-section { margin-bottom: 40px; text-align: center; }
    .header-section h2 { font-size: 2.2rem; color: #1e293b; margin-bottom: 10px; font-weight: 800; }
    .header-section p { color: #64748b; font-size: 1.1rem; }

    .main-card { background: white; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05); padding: 40px; border: 1px solid #f1f5f9; }

    .form-section { margin-bottom: 40px; }
    .section-title { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
    .step-number { width: 32px; height: 32px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; }
    .section-title h3 { font-size: 1.3rem; margin: 0; color: #1e293b; font-weight: 700; }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .form-group { margin-bottom: 20px; }
    .full-width { grid-column: span 2; }
    
    label { display: block; margin-bottom: 8px; color: #475569; font-weight: 600; font-size: 0.95rem; }
    input, select, textarea { width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 1rem; transition: all 0.2s; color: #1e293b; }
    input:focus, select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }

    .input-with-unit { position: relative; }
    .unit { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-weight: 600; }

    /* Product Selector */
    .card-inner { background: #f8fafc; border-radius: 16px; padding: 20px; border: 1px dashed #cbd5e1; }
    .selector-controls { display: flex; gap: 12px; margin-bottom: 15px; }
    .select-wrapper { flex: 1; }
    .qty-input { width: 80px !important; text-align: center; }
    
    .btn-add-prod { background: #1e293b; color: white; border: none; padding: 0 20px; border-radius: 12px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
    .btn-add-prod:hover { background: #0f172a; }
    .btn-add-prod:disabled { opacity: 0.5; cursor: not-allowed; }

    .selected-products { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; }
    .product-tag { background: white; border: 1px solid #e2e8f0; padding: 6px 14px; border-radius: 20px; display: flex; align-items: center; gap: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
    .prod-info { font-size: 0.9rem; color: #334155; }
    .remove-tag { background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; padding: 0; line-height: 1; display: flex; align-items: center; }

    /* Alert / Toast */
    .alert-toast { position: fixed; top: 20px; right: 20px; padding: 16px 24px; border-radius: 16px; background: white; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); z-index: 1000; display: flex; align-items: center; gap: 12px; font-weight: 600; animation: slideIn 0.3s ease-out; }
    .alert-toast.success { border-left: 6px solid #10b981; color: #064e3b; }
    .alert-toast.error { border-left: 6px solid #ef4444; color: #7f1d1d; }

    /* Submit Button */
    .form-footer { margin-top: 40px; }
    .btn-submit-premium { width: 100%; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border: none; padding: 18px; border-radius: 16px; font-size: 1.1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: all 0.3s; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3); }
    .btn-submit-premium:hover { transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.4); }
    .btn-submit-premium:disabled { background: #94a3b8; box-shadow: none; cursor: not-allowed; transform: none; }

    @keyframes slideIn { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ColisCreateComponent implements OnInit {
  colis: any = {
    description: '',
    poids: 0.5,
    priorite: PrioriteColis.NORMALE,
    villeDestination: '',
    clientExpediteurId: '',
    destinataireId: '',
    zoneId: '',
    produits: []
  };

  priorites = Object.values(PrioriteColis);
  zones: Zone[] = [];
  destinataires: Destinataire[] = [];
  produitsDisponibles: Produit[] = [];

  selectedProduitId = '';
  selectedQuantite = 1;

  loading = false;
  message = '';
  messageType = '';

  constructor(
    private colisService: ColisService,
    private userService: UserService,
    private zoneService: ZoneService,
    private produitService: ProduitService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    // Charger les zones
    this.zoneService.getAll(0, 100).subscribe({
      next: page => {
        console.log('Zones loaded:', page.content);
        this.zones = page.content;
      },
      error: err => console.error('Error loading zones:', err)
    });

    // Charger les destinataires
    this.userService.getAllDestinataires(0, 100).subscribe({
      next: page => {
        console.log('Destinataires loaded:', page.content);
        this.destinataires = page.content;
      },
      error: (err) => console.error('Error loading destinataires:', err)
    });

    // Charger les produits
    this.produitService.getAll(0, 100).subscribe({
      next: page => this.produitsDisponibles = page.content,
      error: err => console.error('Error loading products:', err)
    });

    // Charger l'ID du client connecté
    this.userService.getCurrentClient().subscribe({
      next: (client) => {
        this.colis.clientExpediteurId = client.id || '';
      },
      error: (err) => {
        console.error('Error loading client profile:', err);
        this.message = "Erreur lors de la récupération de votre profil.";
        this.messageType = 'error';
      }
    });
  }

  addProduct() {
    const prod = this.produitsDisponibles.find(p => p.id === this.selectedProduitId);
    if (prod) {
      this.colis.produits.push({
        produitId: prod.id,
        produitNom: prod.nom,
        quantite: this.selectedQuantite,
        prix: prod.prix
      });
      // Réinitialiser selection
      this.selectedProduitId = '';
      this.selectedQuantite = 1;
    }
  }

  removeProduct(index: number) {
    this.colis.produits.splice(index, 1);
  }

  onSubmit() {
    this.loading = true;
    this.message = '';

    this.colisService.create(this.colis).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = "Expédition créée avec succès !";
        this.messageType = 'success';
        setTimeout(() => this.router.navigate(['/client/colis']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.message = "Erreur lors de la création de l'expédition. Veuillez vérifier les informations.";
        this.messageType = 'error';
        console.error('Error creating colis:', err);
      }
    });
  }
}
