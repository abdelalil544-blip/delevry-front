import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientExpediteur, Livreur, Destinataire, Page } from '../models/user.model';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient, private auth: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.auth.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    // ==================== CLIENTS ====================
    getAllClients(page = 0, size = 10): Observable<Page<ClientExpediteur>> {
        return this.http.get<Page<ClientExpediteur>>(
            `${this.baseUrl}/clients?page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }

    searchClients(keyword: string, page = 0, size = 10): Observable<Page<ClientExpediteur>> {
        return this.http.get<Page<ClientExpediteur>>(
            `${this.baseUrl}/clients/search?keyword=${keyword}&page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }

    deleteClient(id: string): Observable<void> {
        return this.http.delete<void>(
            `${this.baseUrl}/clients/${id}`,
            { headers: this.getHeaders() }
        );
    }

    // ==================== LIVREURS ====================
    getAllLivreurs(page = 0, size = 10): Observable<Page<Livreur>> {
        return this.http.get<Page<Livreur>>(
            `${this.baseUrl}/livreurs?page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }

    searchLivreurs(nom: string, prenom: string, page = 0, size = 10): Observable<Page<Livreur>> {
        return this.http.get<Page<Livreur>>(
            `${this.baseUrl}/livreurs/search?nom=${nom}&prenom=${prenom}&page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }

    deleteLivreur(id: string): Observable<void> {
        return this.http.delete<void>(
            `${this.baseUrl}/livreurs/${id}`,
            { headers: this.getHeaders() }
        );
    }

    // ==================== DESTINATAIRES ====================
    getAllDestinataires(page = 0, size = 10): Observable<Page<Destinataire>> {
        return this.http.get<Page<Destinataire>>(
            `${this.baseUrl}/destinataires?page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }

    searchDestinataires(nom: string, prenom: string, page = 0, size = 10): Observable<Page<Destinataire>> {
        return this.http.get<Page<Destinataire>>(
            `${this.baseUrl}/destinataires/search?nom=${nom}&prenom=${prenom}&page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }

    deleteDestinataire(id: string): Observable<void> {
        return this.http.delete<void>(
            `${this.baseUrl}/destinataires/${id}`,
            { headers: this.getHeaders() }
        );
    }
}
