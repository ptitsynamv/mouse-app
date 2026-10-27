# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A personal learning/sandbox app for **Angular 19 + `@ngrx/signals`** (SignalStore, Entities, Events) styled with **Tailwind CSS v4**. Toolchain per README: Node v24.1.0, npm v11.3.0.

> Global user rules mention Angular 16, the `slg` prefix, an `ermes-frontend` skill, `npm run lint`, and "no unit tests". **None of that applies here.** This repo is Angular 19, uses the `app` prefix, has Karma/Jasmine specs, and has no ESLint setup. The general Angular guidance (OnPush, no `any`, `_`-prefixed private members, explicit accessibility/return types, `trackBy`) still applies.

## Commands

```bash
npm start                 # ng serve (dev server on http://localhost:4200)
npm run build             # production build -> dist/mouse-app
npm run watch             # dev build in watch mode
npm test                  # Karma + Jasmine (Chrome)
npx ng test --include src/app/features/team/**/*.spec.ts   # run a subset of specs
npx ng test --watch=false # single CI-style run
npx prettier --write .    # format (prettier-plugin-tailwindcss sorts Tailwind classes)
```

There is no lint script. Verify changes with `npm run build`.

## Architecture

- **Bootstrap** is standalone (`main.ts` → `bootstrapApplication(AppComponent, appConfig)`); `AppComponent` hosts the `layout/` header + nav and a `<router-outlet>`.
- **Features are lazy-loaded NgModules**, not standalone components: [app.routes.ts](src/app/app.routes.ts) uses `loadChildren` for `features/dashboard` (`''`, plus `mouse/:id`), `features/team` (`/team`), and `features/project` (`/project`). Feature components are declared in their module with `standalone: false`; new feature components should follow the same pattern. `shared/` and `layout/` components are standalone.
- **Feature layout:** `features/<name>/{components,services,store,interfaces}` plus `<name>.module.ts` and `<name>-routing.module.ts`. Cross-feature types (`Mouse`, `Theme`) live in [shared/interfaces/shared.interfaces.ts](src/app/shared/interfaces/shared.interfaces.ts).
- **Services are in-memory mocks**: they hold seed data in a `BehaviorSubject` and return `of(...).pipe(delay(1000))` to simulate HTTP. There is no backend or `HttpClient`.

### State management (the main point of the repo)

Each feature store is a `signalStore(...)` **provided at component level** (`providers: [XStore]` on the routed component), so state is scoped to that component's lifetime — not `providedIn: 'root'`. Note `DashboardComponent` and `MouseDetailsComponent` each provide their own `DashboardStore` instance; they do not share state. Only [main.store.ts](src/app/store/main.store.ts) is root-provided (currently empty).

Each feature deliberately demonstrates a different SignalStore style:

| Feature | Pattern | Key APIs |
|---|---|---|
| `dashboard` | Classic methods | `withState`, `withComputed`, `withMethods` + `rxMethod`, `patchState` |
| `team` | Entity management | `withEntities<Team>()`, `addEntity`/`removeEntity`/`addEntities` |
| `project` | Event-driven (Redux-like) | `@ngrx/signals/events`: `eventGroup`, `withReducer(on(...))`, `withEffects`, `Dispatcher` |

In the events style, UI events live in `*.manage.events.ts` and API result events in `*.api.events.ts`; components dispatch via `inject(Dispatcher).dispatch(...)` and effects dispatch success/failure events back.

Every store composes the custom [withLogger](src/app/shared/store/with-logger.ts) feature (a `signalStoreFeature` that `console.log`s state on each change via an `effect`). Add `withLogger('<name>-store')` to new stores.

### Styling / theming

Tailwind v4 via PostCSS (`.postcssrc.json`); [styles.scss](src/styles.scss) does `@use "tailwindcss"` and defines a class-based `dark` variant. [ThemeService](src/app/shared/services/theme.service.ts) toggles the `dark` class on `<html>` and persists the choice through `LocalStorageService` (default: dark). Component styles are SCSS; prefer Tailwind utility classes in templates.

### Conventions

- Component schematic defaults: SCSS + `ChangeDetectionStrategy.OnPush`, selector prefix `app-`.
- Components inject the store as `public readonly store = inject(XStore)` and read signals directly in templates.
- TypeScript `strict`, `noPropertyAccessFromIndexSignature`, and Angular `strictTemplates` are on.
