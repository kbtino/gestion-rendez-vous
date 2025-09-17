import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RendezvousService } from '../../../core/services/rendezvous.service'; // 👉 importe ton service

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-rendezvous',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  templateUrl: './create-rendezvous.component.html',
  styleUrls: ['./create-rendezvous.component.scss']
})
export class CreateRendezvousComponent implements OnInit {
  rendezvousForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rendezvousService: RendezvousService // 👉 injection du service
  ) {}

  ngOnInit(): void {
    this.rendezvousForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      date_heure: ['', Validators.required],
      nom_client: ['', Validators.required], //   ajout du champ nom_client
      contact_client: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]] // 👉 ajout du champ contact_client
    });
  }

  onSubmit(): void {
    if (this.rendezvousForm.invalid) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const rendezvousData = {
      ...this.rendezvousForm.value,
      utilisateur_id: currentUser.id // Associe le rendez-vous à l'utilisateur connecté
    };

    this.rendezvousService.createRendezVous(rendezvousData).subscribe({
      next: res => {
        console.log('Rendez-vous créé:', res);
        alert('Rendez-vous créé avec succès !');
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Erreur création rendez-vous:', err);
        alert('Erreur lors de la création du rendez-vous');
      }
    });
  }
}
