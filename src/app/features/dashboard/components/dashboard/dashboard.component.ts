import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MainStore } from '../../../../store/main.store';
import { Mouse } from '../../store/dashboard.store';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MainStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public readonly store = inject(MainStore);

  public ngOnInit(): void {
    this.store.loadMouses();
  }

  public removeMouse(id: string): void {
    this.store.removeMouse(id);
  }

  public identify(index: number, item: Mouse): string {
    return item.id;
  }
}
