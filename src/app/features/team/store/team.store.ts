import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  addEntities,
  addEntity,
  removeEntities,
  removeEntity,
  updateAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { withLogger } from '../../../shared/store/with-logger';
import { TeamService } from '../services/team.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export interface Team {
  id: string;
  name: string;
  members: string[];
  yearFounded: number;
}

export const TeamStore = signalStore(
  withEntities<Team>(),
  withLogger('team-store'),
  withMethods((store, teamService = inject(TeamService)) => ({
    addTeam(team: Team): void {
      patchState(store, addEntity(team));
    },
    removeTeam(id: string): void {
      patchState(store, removeEntity(id));
    },
    loadTeams: rxMethod<void>(
      pipe(
        switchMap(() => {
          return teamService.getTeams().pipe(
            tap({
              next: (data: Team[]) => patchState(store, addEntities(data)),
            }),
          );
        }),
      ),
    ),
  })),
);
