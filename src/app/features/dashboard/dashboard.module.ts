import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MouseComponent } from './components/mouse/mouse.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@NgModule({
  declarations: [DashboardComponent, MouseComponent],
  imports: [CommonModule, DashboardRoutingModule, SpinnerComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
