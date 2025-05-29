import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MouseDetailsComponent } from './components/mouse-details/mouse-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  { path: 'mouse/:id', component: MouseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
