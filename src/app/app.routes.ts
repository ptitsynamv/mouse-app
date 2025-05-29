import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./features/team/team.module').then((m) => m.TeamModule),
  },
  {
    path: 'project',
    loadChildren: () =>
      import('./features/project/project.module').then((m) => m.ProjectModule),
  },
];
