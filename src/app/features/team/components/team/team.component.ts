import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TeamStore } from '../../store/team.store';

@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  providers: [TeamStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  public readonly store = inject(TeamStore);

  public ngOnInit(): void {
    this.store.loadTeams();
  }
}
