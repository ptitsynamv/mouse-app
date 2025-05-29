import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MouseComponent } from './components/mouse/mouse.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { MouseDetailsComponent } from './components/mouse-details/mouse-details.component';

@NgModule({
  declarations: [DashboardComponent, MouseComponent, MouseDetailsComponent],
  imports: [CommonModule, DashboardRoutingModule, SpinnerComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
