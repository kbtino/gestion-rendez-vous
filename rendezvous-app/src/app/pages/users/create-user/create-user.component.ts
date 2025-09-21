import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisateurService } from '../../../core/services/utilisateur.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private userService: UtilisateurService,
    private router: Router) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      role: ['user', Validators.required] // par défaut user
    });
  }

  // Methode de validation personnalisee pour verifier que les mots de passe correspondent
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirm_password')!.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (res) => {
          this.successMessage = "Utilisateur créé avec succès !";
          this.errorMessage = '';
          this.userForm.reset({ role: 'user' });
          // this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = "Erreur lors de la création de l'utilisateur ";
          this.successMessage = '';
          console.error(err);
        }
      });
    }
  }
}

