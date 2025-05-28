import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MouseComponent } from './components/mouse/mouse.component';

@NgModule({
  declarations: [DashboardComponent, MouseComponent],
  imports: [CommonModule, DashboardRoutingModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
