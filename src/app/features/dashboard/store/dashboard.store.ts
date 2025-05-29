import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { DashboardService } from '../services/dashboard.service';

export interface Mouse {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface DashboardState {
  mouses: Mouse[];
  selectedMouse: Mouse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  mouses: [],
  selectedMouse: null,
  isLoading: false,
  error: null,
};

export const DashboardStore = signalStore(
  withState(initialState),
  withComputed(({ mouses }) => ({
    mousesCount: computed(() => mouses().length),
  })),
  withMethods((store, dashboardService = inject(DashboardService)) => ({
    loadMouses: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() => {
          return dashboardService.getMouses().pipe(
            tap({
              next: (data: Mouse[]) => patchState(store, { mouses: data }),
              error: () =>
                patchState(store, { error: 'Failed to load mouses' }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          );
        }),
      ),
    ),
    addMouse: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() => {
          return dashboardService.addMouse().pipe(
            tap({
              next: (data: Mouse) =>
                patchState(store, {
                  mouses: [...store.mouses(), data],
                }),
              error: () => patchState(store, { error: 'Failed to add mouse' }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          );
        }),
      ),
    ),
    removeMouse: rxMethod<string>((id$) =>
      id$.pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((id) => {
          return dashboardService.removeMouse(id).pipe(
            tap({
              next: (mouses) => patchState(store, { mouses }),
              error: () =>
                patchState(store, { error: 'Failed to remove mouse' }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          );
        }),
      ),
    ),
    loadMouseById: rxMethod<string>((id$) =>
      id$.pipe(
        tap(() =>
          patchState(store, {
            isLoading: true,
            error: null,
            selectedMouse: null,
          }),
        ),
        switchMap((id) => {
          return dashboardService.getMouseById(id).pipe(
            tap({
              next: (selectedMouse) => patchState(store, { selectedMouse }),
              error: () => patchState(store, { error: 'Failed to load mouse' }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit: (store) => console.log('Store initialized', store),
    onDestroy: (store) => console.log('Store destroyed', store),
  }),
);
