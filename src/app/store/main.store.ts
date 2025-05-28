import { signalStore, withState } from '@ngrx/signals';

type MainState = {
  isLoading: boolean;
  error: string | null;
};

const initialState: MainState = {
  isLoading: false,
  error: null,
};

export const MainStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
);
