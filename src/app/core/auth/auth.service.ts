import { tap } from 'rxjs/operators';
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest, LoginResponse, JwtPayload, Role } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  token = signal<string | null>(localStorage.getItem('token'));
  role = signal<Role | null>(localStorage.getItem('role') as Role);

  isAuthenticated = computed(() => !!this.token());

  constructor(private http: HttpClient, private router: Router) { }

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(res => {
          const decoded = jwtDecode<JwtPayload>(res.token);

          localStorage.setItem('token', res.token);
          localStorage.setItem('role', decoded.role);

          this.token.set(res.token);
          this.role.set(decoded.role);

          this.redirectByRole(decoded.role);
        })
      );
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getToken(): string | null {
    return this.token();
  }

  logout() {
    localStorage.clear();
    this.token.set(null);
    this.role.set(null);
    this.router.navigate(['/login']);
  }

  private redirectByRole(role: Role) {
    const routes: Record<Role, string> = {
      ADMIN: '/admin',
      LIVREUR: '/livreur',
      CLIENT: '/client',
      DESTINATAIRE: '/destinataire'
    };
    this.router.navigate([routes[role]]);
  }
}
