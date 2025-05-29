import { type } from '@ngrx/signals';
import { event, eventGroup } from '@ngrx/signals/events';

export const opened = event('[Project Page] Opened');
export const queryChanged = event(
  '[Project Page] Query Changed',
  type<string>(),
);

export const projectManageEvents = eventGroup({
  source: 'Project Page',
  events: {
    opened: type<void>(),
  },
});
