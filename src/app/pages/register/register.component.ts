import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { RegisterRequest, Role } from '../../core/auth/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerData: RegisterRequest = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    password: '',
    role: 'CLIENT' // Default role
  };

  roles: Role[] = ['CLIENT', 'LIVREUR', 'DESTINATAIRE'];

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  submit() {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        // Redirect to login on success
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err); // Log full error object
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
        }
      }
    });
  }
}
