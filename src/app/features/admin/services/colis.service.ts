import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colis, ColisSearchCriteria, Page, StatutColis, PrioriteColis } from '../models/colis.model';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ColisService {
    private apiUrl = 'http://localhost:8080/api/colis';

    constructor(private http: HttpClient, private auth: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.auth.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    create(colis: any): Observable<Colis> {
        return this.http.post<Colis>(this.apiUrl, colis, { headers: this.getHeaders() });
    }

    getAllColis(page: number = 0, size: number = 10): Observable<Page<Colis>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<Page<Colis>>(this.apiUrl, {
            headers: this.getHeaders(),
            params: params
        });
    }

    getMyClientColis(page: number = 0, size: number = 10): Observable<Page<Colis>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<Page<Colis>>(`${this.apiUrl}/client/me`, {
            headers: this.getHeaders(),
            params: params
        });
    }

    getLivreurColis(page: number = 0, size: number = 10): Observable<Page<Colis>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<Page<Colis>>(`${this.apiUrl}/livreur/me`, {
            headers: this.getHeaders(),
            params: params
        });
    }

    getDestinataireColis(page: number = 0, size: number = 10): Observable<Page<Colis>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<Page<Colis>>(`${this.apiUrl}/destinataire/me`, {
            headers: this.getHeaders(),
            params: params
        });
    }

    updateStatut(colisId: string, statut: StatutColis, commentaire?: string): Observable<Colis> {
        let params = new HttpParams().set('statut', statut);
        if (commentaire) {
            params = params.set('commentaire', commentaire);
        }

        return this.http.post<Colis>(`${this.apiUrl}/${colisId}/statut`, {}, {
            headers: this.getHeaders(),
            params: params
        });
    }

    getMyHistory(): Observable<Page<any>> {
        return this.http.get<Page<any>>(`http://localhost:8080/api/historique-livraisons/me`, { headers: this.getHeaders() });
    }

    getColisById(id: string): Observable<Colis> {
        return this.http.get<Colis>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    searchColis(criteria: ColisSearchCriteria, page: number = 0, size: number = 10): Observable<Page<Colis>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.post<Page<Colis>>(`${this.apiUrl}/search`, criteria, {
            headers: this.getHeaders(),
            params: params
        });
    }

    assignerLivreur(colisId: string, livreurId: string): Observable<Colis> {
        return this.http.post<Colis>(`${this.apiUrl}/${colisId}/assigner-livreur/${livreurId}`, {}, {
            headers: this.getHeaders()
        });
    }

    deleteColis(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    getColisByStatut(statut: StatutColis, page: number = 0, size: number = 10): Observable<Page<Colis>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<Page<Colis>>(`${this.apiUrl}/statut/${statut}`, {
            headers: this.getHeaders(),
            params: params
        });
    }

    getColisByPriorite(priorite: PrioriteColis, page: number = 0, size: number = 10): Observable<Page<Colis>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<Page<Colis>>(`${this.apiUrl}/priorite/${priorite}`, {
            headers: this.getHeaders(),
            params: params
        });
    }
}
