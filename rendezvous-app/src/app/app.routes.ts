import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { CreateRendezvousComponent } from './pages/rendezvous/create-rendezvous/create-rendezvous.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // redirection vers le dashboard
  { path: 'dashboard', component: DashboardComponent }, // route pour la page de login
  { path: 'rendezvous/create', component: CreateRendezvousComponent }, // route pour créer un rendez-vous
  { path: '**', redirectTo: '' }
];
