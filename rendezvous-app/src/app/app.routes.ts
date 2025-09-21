import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { CreateRendezvousComponent } from './pages/rendezvous/create-rendezvous/create-rendezvous.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { adminGuard } from './core/guards/admin.guard';
import { DashboardHomeComponent } from './dashboard/components/dashboard-home/dashboard-home.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // redirection vers le dashboard
  { path: 'dashboard', 
    component: DashboardComponent, 
    children: [
      { path: 'home', component: DashboardHomeComponent }, // route pour le main page du dashboard
      { path: 'create-rendezvous', component: CreateRendezvousComponent }, // route pour créer un rendez-vous
      { path: 'users/create', component: CreateUserComponent, canActivate: [adminGuard] }, // route pour créer un utilisateur
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }, 
  { path: '**', redirectTo: 'dashboard' }
  ];
