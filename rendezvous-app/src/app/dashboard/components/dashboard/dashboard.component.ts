// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { RendezvousService } from '../../../core/services/rendezvous.service';
// import { FooterComponent } from "../footer/footer.component";

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, FooterComponent],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   rendezvousList: any[] = [];
//   currentUser: any; 

//   constructor(private router: Router, private rendezvousService: RendezvousService) {}

//   ngOnInit(): void {
//     const userData = localStorage.getItem('currentUser');
//     this.currentUser = userData ? JSON.parse(userData) : null;

//     // Charger les rendez-vous après avoir récupéré l'utilisateur
//     this.loadRendezvous();
//     const userStr = localStorage.getItem('currentUser');
//   if (userStr) {
//     this.currentUser = JSON.parse(userStr);
//     console.log("Utilisateur connecté :", this.currentUser);
//   }
//   }

//   loadRendezvous(): void {
//     this.rendezvousService.getRendezVous().subscribe({
//       next: (res) => {
//         this.rendezvousList = res;
//       },
//       error: (err) => {
//         console.error('Erreur lors du chargement des rendez-vous', err);
//       }
//     });
//   }

//   goToLogin() {
//     this.router.navigate(['/login']);
//   }

//   goToCreateRdv() {
//     this.router.navigate(['/rendezvous/create']);
//   }

//   goToCreateUser() {
//     this.router.navigate(['/users/create']);
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {}
