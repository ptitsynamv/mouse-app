import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectStore } from '../../store/project.store';
import { Dispatcher } from '@ngrx/signals/events';
import { projectManageEvents } from '../../store/project.manage.events';
import { Mouse } from '../../../../shared/interfaces/shared.interfaces';
import { Project } from '../../interfaces/interfaces';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  providers: [ProjectStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {
  public readonly store = inject(ProjectStore);
  private readonly _dispatcher = inject(Dispatcher);

  public ngOnInit(): void {
    this._dispatcher.dispatch(projectManageEvents.opened());
  }

  public identify(index: number, item: Mouse | Project): string {
    return item.id;
  }
}
