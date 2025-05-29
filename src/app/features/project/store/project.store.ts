import { signalStore, withState } from '@ngrx/signals';
import {
  Dispatcher,
  Events,
  on,
  withEffects,
  withReducer,
} from '@ngrx/signals/events';
import { Project } from '../interfaces/interfaces';
import { projectManageEvents } from './project.manage.events';
import { projectApiEvents } from './project.api.events';
import { inject } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { switchMap, tap } from 'rxjs';
import { withLogger } from '../../../shared/store/with-logger';

type State = { query: string; projects: Project[]; isLoading: boolean };

export const ProjectStore = signalStore(
  withState<State>({ query: '', projects: [], isLoading: false }),
  withLogger('project-store'),
  withReducer(
    on(projectManageEvents.opened, () => ({ isLoading: true })),
    on(projectApiEvents.loadedSuccess, ({ payload: projects }) => ({
      projects,
      isLoading: false,
    })),
    on(projectApiEvents.loadedFailure, () => ({ isLoading: false })),
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      projectService = inject(ProjectService),
      dispatcher = inject(Dispatcher),
    ) => ({
      loadProjectsByQuery$: events.on(projectManageEvents.opened).pipe(
        switchMap(() =>
          projectService.getProjects().pipe(
            tap({
              next: (projects: Project[]) => {
                dispatcher.dispatch(projectApiEvents.loadedSuccess(projects));
              },
              error: (error: { message: string }) =>
                dispatcher.dispatch(
                  projectApiEvents.loadedFailure(error.message),
                ),
            }),
          ),
        ),
      ),
      logError$: events
        .on(projectApiEvents.loadedFailure)
        .pipe(tap(({ payload }) => console.error(payload))),
    }),
  ),
);
