import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public readonly store = inject(DashboardStore);

  public ngOnInit(): void {
    this.store.loadMouses();
  }

  public removeMouse(id: string): void {
    this.store.removeMouse(id);
  }
}
