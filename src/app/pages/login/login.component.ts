import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-header">
          <h1>Smart Delivery</h1>
          <p>Connectez-vous pour accéder à votre espace.</p>
        </div>

        <form (ngSubmit)="submit()" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              [(ngModel)]="email"
              name="email"
              type="email"
              placeholder="vous@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              id="password"
              [(ngModel)]="password"
              name="password"
              type="password"
              placeholder="Votre mot de passe"
              required
            />
          </div>

          @if (errorMessage) {
            <p class="error-message">{{ errorMessage }}</p>
          }

          <button type="submit" class="primary-button">
            Se connecter
          </button>
        </form>

        <div class="login-footer">
          <span>Pas encore de compte ?</span>
          <a routerLink="/register">S'inscrire</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at top left, #2563eb 0, #0f172a 45%, #020617 100%);
      padding: 16px;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .login-card {
      width: 100%;
      max-width: 420px;
      background: rgba(15, 23, 42, 0.92);
      border-radius: 18px;
      padding: 28px 24px 24px;
      box-shadow:
        0 24px 60px rgba(15, 23, 42, 0.9),
        0 0 0 1px rgba(148, 163, 184, 0.1);
      color: #e5e7eb;
      backdrop-filter: blur(16px);
    }

    .login-header {
      text-align: center;
      margin-bottom: 24px;
    }

    .login-header h1 {
      margin: 0 0 4px;
      font-size: 1.8rem;
      font-weight: 700;
      color: #f9fafb;
      letter-spacing: 0.02em;
    }

    .login-header p {
      margin: 0;
      font-size: 0.9rem;
      color: #9ca3af;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 0.85rem;
      font-weight: 500;
      color: #e5e7eb;
    }

    input {
      border-radius: 10px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      background: rgba(15, 23, 42, 0.7);
      padding: 9px 11px;
      font-size: 0.95rem;
      color: #f9fafb;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
    }

    input::placeholder {
      color: #6b7280;
    }

    input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.6);
      background: rgba(15, 23, 42, 0.95);
    }

    .error-message {
      margin: 4px 0 0;
      font-size: 0.85rem;
      color: #fecaca;
      background: rgba(248, 113, 113, 0.08);
      border-radius: 8px;
      padding: 8px 10px;
      border: 1px solid rgba(248, 113, 113, 0.3);
    }

    .primary-button {
      margin-top: 8px;
      width: 100%;
      border-radius: 999px;
      border: none;
      padding: 10px 14px;
      font-size: 0.98rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      background: linear-gradient(135deg, #2563eb, #4f46e5);
      color: #f9fafb;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-shadow:
        0 12px 30px rgba(37, 99, 235, 0.45),
        0 0 0 1px rgba(129, 140, 248, 0.4);
      transition:
        transform 0.1s ease,
        box-shadow 0.1s ease,
        filter 0.1s ease,
        background-position 0.1s ease;
      background-size: 160% 160%;
      background-position: 0% 50%;
    }

    .primary-button:hover {
      transform: translateY(-1px);
      box-shadow:
        0 16px 40px rgba(37, 99, 235, 0.6),
        0 0 0 1px rgba(129, 140, 248, 0.55);
      filter: brightness(1.03);
      background-position: 20% 50%;
    }

    .primary-button:active {
      transform: translateY(0);
      box-shadow:
        0 8px 24px rgba(15, 23, 42, 0.9),
        0 0 0 1px rgba(129, 140, 248, 0.5);
      filter: brightness(0.97);
    }

    .login-footer {
      margin-top: 18px;
      display: flex;
      justify-content: center;
      gap: 6px;
      font-size: 0.86rem;
      color: #9ca3af;
    }

    .login-footer a {
      color: #60a5fa;
      text-decoration: none;
      font-weight: 500;
    }

    .login-footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 24px 18px 20px;
      }

      .login-header h1 {
        font-size: 1.6rem;
      }
    }
  `]
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
