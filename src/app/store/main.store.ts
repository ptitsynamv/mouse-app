import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withDashboardStore } from '../features/dashboard/store/dashboard.store';
import { withLogger } from './with-logger';

export interface MainState {}

const initialState: MainState = {};

export const MainStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDashboardStore(),
  withLogger('mouse-store'),
  withHooks({
    onInit: (store) => console.log('Store initialized', store),
    onDestroy: (store) => console.log('Store destroyed', store),
  }),
);
