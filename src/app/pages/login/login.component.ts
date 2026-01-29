import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
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
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService) {}

  submit() {
    this.auth.login({
      email: this.email,
      password: this.password
    });
  }
}
