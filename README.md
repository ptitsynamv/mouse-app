# 🐭 Mouse App

[![Angular](https://img.shields.io/badge/Angular-19.2-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![NgRx Signals](https://img.shields.io/badge/%40ngrx%2Fsignals-19.2-BA2BD2?logo=ngrx&logoColor=white)](https://ngrx.io/guide/signals)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex&logoColor=white)](https://rxjs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-%5E18.19.1%20%7C%20%5E20.11.1%20%7C%20%3E%3D22-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Build](https://img.shields.io/github/actions/workflow/status/ptitsynamv/mouse-app/ci.yml?branch=main&label=build&logo=githubactions&logoColor=white)](https://github.com/ptitsynamv/mouse-app/actions)
[![License](https://img.shields.io/badge/license-not%20specified-lightgrey)](#license)

A small Angular 19 sandbox that explores **NgRx SignalStore** state management side by side. The app has three pages: a mouse catalogue (dashboard), projects, and teams. Each page uses a different SignalStore style, so you can compare *methods + `rxMethod`*, *entity management*, and the *event-driven* (Redux-style) API in one place.

## ✨ Features

- **Three SignalStore patterns, one per feature**
  - **Dashboard**: `withState`, `withComputed`, `withMethods` + `rxMethod`, `patchState` (load, add, remove, and view mouse details)
  - **Team**: `@ngrx/signals/entities` with `withEntities`, `addEntities`, `removeEntity`
  - **Project**: `@ngrx/signals/events` with `eventGroup`, `withReducer(on(...))`, `withEffects`, `Dispatcher`
- **Custom store feature**: `withLogger()` logs every state change to the console (built with `signalStoreFeature`)
- **Component-scoped stores**: each routed component provides its own store instance
- **Lazy-loaded feature modules** for `/`, `/project`, and `/team`
- **Dark / light theme toggle**: a class-based Tailwind `dark` variant, saved in `localStorage`
- **Tailwind CSS v4** via PostCSS, with Prettier sorting the Tailwind classes
- **Mock services**: in-memory data with a simulated 1s network delay, so no backend is needed
- OnPush change detection, `strict` TypeScript, and `strictTemplates`

## 📋 Prerequisites

| Tool | Version |
|---|---|
| Node.js | `^18.19.1`, `^20.11.1`, or `>=22.0.0` (required by Angular 19). The project was developed on **v24.1.0**. |
| npm | `>=8`. The project was developed on **v11.3.0**. |
| Browser | Chrome or Chromium is needed for `npm test` (Karma launcher) |

### Managing Node versions with nvm

If your system Node is older than the range above (Node 16, for example), Angular CLI 19 will refuse to run. Install a supported version with [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows):

```bash
# macOS / Linux
nvm install 24.1.0
nvm use 24.1.0

# Windows (nvm-windows)
nvm install 24.1.0
nvm use 24.1.0
```

Any Node 22 LTS release also works (`nvm install 22 && nvm use 22`).

## 🚀 Getting started

```bash
# 1. Clone
git clone https://github.com/ptitsynamv/mouse-app.git
cd mouse-app

# 2. Install exact dependency versions from the lockfile
npm ci

# 3. Start the dev server
npm start
```

Open <http://localhost:4200>. The app reloads when you change a source file.

> **Note on newer npm versions:** npm 11.x may print `install-scripts` warnings and skip postinstall scripts for `esbuild`, `lmdb`, and `msgpackr-extract`. The build still works without them. If a build fails because of a missing native binary, approve those scripts as the warning tells you to (`npm install-scripts approve <pkg>`) and run `npm ci` again.

## 🛠️ Available scripts

| Command | Description |
|---|---|
| `npm start` | Start the dev server (`ng serve`) on port 4200 |
| `npm run build` | Make a production build in `dist/mouse-app/` |
| `npm run watch` | Run a development build in watch mode |
| `npm test` | Run the unit tests with Karma + Jasmine (Chrome) |
| `npx ng test --watch=false` | Run the tests once, CI-style |
| `npx ng test --include "src/app/features/team/**/*.spec.ts"` | Run only some of the specs |
| `npx prettier --write .` | Format the code and sort Tailwind classes |

## 🗂️ Project structure

```text
mouse-app/
├── public/                    # Static assets (favicon, images/mouses/*.jpg)
├── src/
│   ├── main.ts                # bootstrapApplication(AppComponent, appConfig)
│   ├── styles.scss            # Tailwind import + class-based dark variant
│   └── app/
│       ├── app.config.ts      # Root providers (router, zone change detection)
│       ├── app.routes.ts      # Lazy routes: '' → dashboard, /project, /team
│       ├── layout/            # Header and nav (standalone components)
│       ├── shared/
│       │   ├── components/    # Spinner, theme toggle button
│       │   ├── interfaces/    # Shared types (Mouse, Theme)
│       │   ├── services/      # ThemeService, LocalStorageService
│       │   └── store/         # withLogger() custom SignalStore feature
│       ├── store/             # Root-level MainStore
│       └── features/
│           ├── dashboard/     # Mouse list + /mouse/:id details (methods + rxMethod)
│           ├── project/       # Projects (events API: reducer + effects)
│           └── team/          # Teams (entity management)
├── angular.json
├── tsconfig*.json
├── .postcssrc.json            # Tailwind v4 PostCSS plugin
└── .prettierrc                # prettier-plugin-tailwindcss
```

Each feature folder looks like this:

```text
features/<name>/
├── components/            # Feature components (declared in the module, standalone: false)
├── services/              # Mock data service
├── store/                 # signalStore definition (+ *.events.ts for the events API)
├── <name>.module.ts
└── <name>-routing.module.ts
```

## 🧠 State management at a glance

| Feature | Store style | Where to look |
|---|---|---|
| Dashboard | Methods + `rxMethod` | [`dashboard.store.ts`](src/app/features/dashboard/store/dashboard.store.ts) |
| Team | Entities | [`team.store.ts`](src/app/features/team/store/team.store.ts) |
| Project | Events (reducer/effects) | [`project.store.ts`](src/app/features/project/store/project.store.ts), [`project.manage.events.ts`](src/app/features/project/store/project.manage.events.ts), [`project.api.events.ts`](src/app/features/project/store/project.api.events.ts) |

Each store is listed in the `providers` of its routed component, so its state lives only as long as that component. Open the browser console to see the `withLogger` output when state changes.

## License

No license has been chosen for this repository yet. Until a `LICENSE` file is added, all rights are reserved by the author.
