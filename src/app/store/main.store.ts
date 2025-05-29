import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withLogger } from '../shared/store/with-logger';

export interface MainState {}

const initialState: MainState = {};

export const MainStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withLogger('mouse-store'),
  withHooks({
    onInit: (store) => console.log('Store initialized', store),
    onDestroy: (store) => console.log('Store destroyed', store),
  }),
);
