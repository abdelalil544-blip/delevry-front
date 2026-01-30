import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <form (ngSubmit)="submit()">
      <input
        [(ngModel)]="email"
        name="email"
        placeholder="Email"
      />

      <input
        [(ngModel)]="password"
        name="password"
        type="password"
        placeholder="Password"
      />

      <button type="submit">Login</button>
      
      @if (errorMessage) {
        <p style="color: red; margin-top: 10px;">{{ errorMessage }}</p>
      }

      <a routerLink="/register">S'inscrire</a>
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService) { }

  submit() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        // Redirection handled in AuthService tap
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    });
  }
}
