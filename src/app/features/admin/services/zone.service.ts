import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone, Page } from '../models/zone.model';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ZoneService {
    private apiUrl = 'http://localhost:8080/api/zones';

    constructor(private http: HttpClient, private auth: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.auth.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    getAll(page = 0, size = 10): Observable<Page<Zone>> {
        return this.http.get<Page<Zone>>(
            `${this.apiUrl}?page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }

    getById(id: string): Observable<Zone> {
        return this.http.get<Zone>(
            `${this.apiUrl}/${id}`,
            { headers: this.getHeaders() }
        );
    }

    create(zone: Zone): Observable<Zone> {
        return this.http.post<Zone>(
            this.apiUrl,
            zone,
            { headers: this.getHeaders() }
        );
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${id}`,
            { headers: this.getHeaders() }
        );
    }

    searchByNom(nom: string, page = 0, size = 10): Observable<Page<Zone>> {
        return this.http.get<Page<Zone>>(
            `${this.apiUrl}/search?nom=${nom}&page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }

    searchByCodePostal(codePostal: string, page = 0, size = 10): Observable<Page<Zone>> {
        return this.http.get<Page<Zone>>(
            `${this.apiUrl}/code-postal?codePostal=${codePostal}&page=${page}&size=${size}`,
            { headers: this.getHeaders() }
        );
    }
}
