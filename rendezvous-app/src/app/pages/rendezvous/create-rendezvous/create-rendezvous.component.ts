import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-rendezvous',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-rendezvous.component.html',
  styleUrls: ['./create-rendezvous.component.scss']
})
export class CreateRendezvousComponent implements OnInit {
  rendezvousForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.rendezvousForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      date_heure: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.rendezvousForm.invalid) return;

    const data = this.rendezvousForm.value;

    // 👉 Simulation frontend (pour le moment sans backend)
    console.log('Rendez-vous créé:', data);
    alert('Rendez-vous créé avec succès !');

    // Redirection vers dashboard après création
    this.router.navigate(['/dashboard']);
  }
}
