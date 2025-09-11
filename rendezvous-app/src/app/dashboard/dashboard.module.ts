import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,          // pour utiliser routerLink dans le template
    DashboardRoutingModule, // routing du module
    DashboardComponent
  ]
})
export class DashboardModule {}
