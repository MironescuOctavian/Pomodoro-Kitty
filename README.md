# Pomodoro Kitty

**A little focus. A little care. A cozy companion.**

A Pomodoro timer with a virtual cat, a task list, and a gentle progression loop.
Finish a session, earn coins, and make your companion's day a little brighter.

Built with **Solid 2 · TypeScript · Vite+ · UnoCSS · Cloudflare Workers**.

---

## Meet your focus companion

| Focus                    | Care                               | Collect                             |
| ------------------------ | ---------------------------------- | ----------------------------------- |
| 25-minute focus sessions | Feed your cat and restore hearts   | Buy and equip coat styles           |
| 5-minute short breaks    | Fill the water bowl through breaks | Unlock care accessories and medals  |
| 15-minute long breaks    | Claim daily pocket money           | Keep a journal of little milestones |

Also included: tasks with earned rewards, daily focus goals, session history,
daily cat facts with sources, and day/night themes.

The companion uses pixel artwork with random actions, click-to-pet reactions,
and coat-specific poses. Artwork is stored as lossless WebP; the shop and equipped
cat share the same sprite atlases. See [artwork notes](public/art/README.md).

## Get started

Use **Node 26.13.0** (see `.node-version`) and **pnpm 12.16.1**.

```sh
pnpm install
pnpm dev
```

Open the local URL printed by the development server. Adopt your cat, choose a
task if you like, and start a focus session.

| Command               | What it does                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------- |
| `pnpm dev`            | Starts the development server                                                             |
| `pnpm test`           | Runs game rules, save migrations, behavior timing, and coat-art coverage tests            |
| `pnpm build`          | Builds the browser app and Cloudflare Worker                                              |
| `pnpm preview`        | Previews the production build locally                                                     |
| `pnpm check`          | Audits dependencies, generates Worker types, and checks/fixes formatting, lint, and types |
| `pnpm generate-types` | Regenerates Cloudflare Worker types                                                       |
| `pnpm deploy`         | Deploys using your configured Cloudflare account                                          |

## How the app works

### From request to dashboard

1. **Worker:** `src/fetch.ts` receives requests through Hono, applies locale
   middleware, and delegates rendering to Solid.
2. **Routing:** `src/App.tsx` loads file-based routes and provides translations
   and a loading boundary.
3. **Document:** `src/Document.tsx` defines the HTML shell, fonts, and hydration.
4. **Dashboard:** the localized home route assembles the timer and companion
   panels, then connects user actions to `useKitty()`.
5. **State:** `useKitty.ts` restores the save, updates reactive state, and persists
   successful actions. `game.ts` owns the rules and validates saves with Zod.

### A timer that survives interruptions

The timer stores an absolute deadline. It recalculates remaining time on reload
and when the tab becomes visible, rather than relying on a perfectly regular
one-second interval. Pause preserves remaining time. Reset and manual mode
switching are available; sessions never automatically repeat.

Completing a session settles its rewards once. The app suggests a break after
focus, with a long break after every fourth focus session.

### Focus with a friend

Open **Focus together** on the left of the dashboard to create or join a private
invite. Rooms hold two people, expire after 24 hours, and use WebSockets backed
by the `FocusRoom` Cloudflare Durable Object configured in `cloudflare.config.ts`.
The host controls the shared timer; leaving transfers control to the friend.
Reloading the same tab restores membership. Each browser keeps its own progress;
join before a session starts to earn rewards. Only cat names and outfits are shared.

With `pnpm dev` running, `node scripts/check-focus-room.mjs` checks two real
WebSocket clients, room limits, reconnects and host transfer. Set `FOCUS_ROOM_URL`
to test a different local port. Deploying requires the configured Durable Object
binding and SQLite namespace; a static-only host cannot run multiplayer.

### Rewards and care

- **Focus:** each completed session earns 6 coins, one care credit, and a task
  reward credit. A session may also include a one-time surprise coin gift.
- **Tasks:** after earning a credit through focus, check off a new task for
  1 coin, up to 3 task coins per local day. Each task can pay only once.
- **Breaks:** short/long breaks add 1/2 water marks and one coin per added mark.
  Filling the eight-mark bowl adds 4 coins. Up to 5 short and 3 long completed
  breaks per day qualify; timers remain usable afterward.
- **Health:** every two unprotected focus sessions cost half a heart. Bonus
  hearts absorb damage first. Time away causes no damage.
- **Food:** meals restore health; special food can add permanent bonus hearts.
  Useful feeding spends care credits toward lifetime medals and accessories.
- **Protection:** a packed lunch costs 4 coins and protects 4 focus sessions.
- **Daily gift:** claim 1–3 coins once per local day, without a streak requirement.
- **Recovery:** if the cat hides at zero health, a free recovery meal restores
  one heart. Owned cosmetics remain yours.
- **Customization:** buy coats and equip unlocked accessories while paused or
  on a break. The three name changes cost 0, 5, and 10 coins.

The implementation in `src/kitty/game.ts` is the source of truth for prices,
limits, catalogs, and migrations.

## Project map

```text
src/
  components/app/           Header, footer, branding, theme toggle
  i18n/en.json              English translations
  kitty/
    game.ts                Rules, saved-state schema, migrations
    game.test.mjs          Regression tests for rules and persistence
    useKitty.ts            Reactive state, storage, timer lifecycle, tab lock
    coats.ts               Coat catalog, prices, and color swatches
    facts.ts               Daily facts and source links
    Cat.tsx / CatSprite.tsx Companion animation and equipped artwork
    CoatArt.tsx / Preview.tsx Shared coat and item previews
    Tasks.tsx              Task creation, selection, completion, rewards
    Shop.tsx               Coat and accessory selection
    PurchaseDialog.tsx     Purchase review and confirmation
    ProgressSidebar.tsx    Progress, history, and journal
    …                      Care, guide, loading, and supporting components
  routes/[locale]/
    (app).tsx              Shared page layout
    (app)/index.tsx        Main timer and companion dashboard
    (app)/[...404].tsx     Localized not-found page
  App.tsx                  Router
  Document.tsx             HTML shell and hydration
  fetch.ts                 Worker entry point
  styles/
    kitty.css              Shared foundations, controls and responsive styles
    dashboard.css          Dashboard layout and theme rules
    playful.css            Final visual refinements and animation styles
docs/                      Design and economy audit notes
uno.config.ts              UnoCSS presets, theme, reusable shortcuts
vite.config.ts             Development/build plugins and SSR routing
cloudflare.config.ts       Worker and static asset configuration
```

### Styling

`Document.tsx` imports shared styles once, alongside UnoCSS utilities.
`kitty.css` contains the former ordered preflights; keeping them outside the
UnoCSS chunk generator avoids repeating the full stylesheet in every route.
`dashboard.css` and `playful.css` follow with layout, theme and visual refinements.
Preserve this order when changing styles. Coat previews use the same artwork
as the equipped cat rather than generated swatch rules.

### Localization

English is the default locale. Rimelight i18n provides locale-prefixed routes;
requests without a locale redirect to a localized URL. Add translation JSON
files under `src/i18n/` to introduce another language. Some interface copy is
still written directly in components.

### Storage and multiple tabs

Progress is saved under `pomodoro-kitty-v1` in this browser's `localStorage`.
The theme uses `kitty-theme`. Existing save migrations preserve supported older
progress, including the transition from two companions to one cat.

When Web Locks are supported, only one tab can change game state at a time;
secondary tabs are read-only. Storage failures are surfaced in the interface.

**There is no cloud sync or account backend.** Clearing browser data removes
progress. Different browsers and devices have separate saves.

## Deployment

`pnpm build` produces the client and Worker bundles. With your Cloudflare
account configured, run `pnpm deploy`. Worker settings live in
`cloudflare.config.ts`; the Worker is named `pomodoro-kitty`.

---

Made by [Mironescu Octavian](https://octavianmironescu.com).
