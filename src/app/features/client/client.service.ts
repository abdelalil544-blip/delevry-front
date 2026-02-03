import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

export interface ClientExpediteur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /** Récupère le client expéditeur correspondant à l'utilisateur connecté */
  getMe(): Observable<ClientExpediteur> {
    return this.http.get<ClientExpediteur>(`${this.apiUrl}/me`, {
      headers: this.getHeaders()
    });
  }
}
