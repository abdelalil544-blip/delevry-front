import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit, Page } from '../models/produit.model';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ProduitService {
    private apiUrl = 'http://localhost:8080/api/produits';

    constructor(private http: HttpClient, private auth: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.auth.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    getAll(page = 0, size = 10): Observable<Page<Produit>> {
        return this.http.get<Page<Produit>>(
            `${this.apiUrl}?page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }

    getById(id: string): Observable<Produit> {
        return this.http.get<Produit>(
            `${this.apiUrl}/${id}`,
            { headers: this.getHeaders() }
        );
    }

    create(produit: Produit): Observable<Produit> {
        return this.http.post<Produit>(
            this.apiUrl,
            produit,
            { headers: this.getHeaders() }
        );
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${id}`,
            { headers: this.getHeaders() }
        );
    }

    search(nom: string, page = 0, size = 10): Observable<Page<Produit>> {
        return this.http.get<Page<Produit>>(
            `${this.apiUrl}/search?nom=${nom}&page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }
}
