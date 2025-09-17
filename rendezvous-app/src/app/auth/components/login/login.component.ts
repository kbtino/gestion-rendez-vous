import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// Update the import path below if AuthService is located elsewhere
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.loginForm.invalid) return;

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe({
    next: (res) => {
      // Stocker le token JWT pour les futures requêtes
      localStorage.setItem('access_token', res.access);
      localStorage.setItem('refresh_token', res.refresh);

      // Stocker les informations de l'utilisateur pour le dashboard et le guard
      // 🔹 Ici on ajoute l'id de l'utilisateur pour pouvoir l'utiliser pour créer un rendez-vous
      const currentUser = { 
        id: res.user.id,          // 🔹 correction principale
        email: res.user.email, 
        role: res.user.role, 
        nom: res.user.nom 
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      this.isLoginFailed = false;
      this.router.navigate(['/dashboard']); // redirection après login
    },
      error: (err) => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.error || 'Erreur connexion';
      }
    });
  }

}
