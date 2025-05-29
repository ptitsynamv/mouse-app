import { type } from '@ngrx/signals';
import { Project } from '../interfaces/interfaces';
import { eventGroup } from '@ngrx/signals/events';

export const projectApiEvents = eventGroup({
  source: 'Books API',
  events: {
    loadedSuccess: type<Project[]>(),
    loadedFailure: type<string>(),
  },
});
