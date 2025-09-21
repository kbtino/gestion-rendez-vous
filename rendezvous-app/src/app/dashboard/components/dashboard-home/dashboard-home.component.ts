import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RendezvousService } from '../../../core/services/rendezvous.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  rendezvousList: any[] = [];
  currentUser: any; 

  constructor(private router: Router, private rendezvousService: RendezvousService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    this.currentUser = userData ? JSON.parse(userData) : null;
    this.loadRendezvous();
  }

  loadRendezvous(): void {
    this.rendezvousService.getRendezVous().subscribe({
      next: (res) => this.rendezvousList = res,
      error: (err) => console.error('Erreur lors du chargement des rendez-vous', err)
    });
  }

  goToLogin() { this.router.navigate(['/login']); }
  goToCreateRdv() { this.router.navigate(['/create-rendezvous']); }
  goToCreateUser() { this.router.navigate(['/users/create']); }
}
