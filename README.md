# Pomodoro Kitty

**A little focus. A little care. A cozy companion.**

A Pomodoro workspace where your cat keeps you company. Finish a session, earn
coins, take a water break, and treat your companion to a snack or a new outfit.
Invite a friend to share the timer and give their cat a spot beside yours.

Built with **Solid 2 · TypeScript · Vite+ · UnoCSS · Hono · Cloudflare Workers**.

## In your workspace

- **Focus timer:** 25-minute focus sessions, 5-minute short breaks, and 15-minute
  long breaks. Pause, resume, reset, and switch modes. A long break is suggested
  after every fourth focus session; sessions never start automatically.
- **Tasks and goals:** choose a task to focus on, check off completed work, and
  aim for 2, 4, or 6 focus sessions a day.
- **Your companion:** adopt and name your cat, click to pet her, and watch her
  stretch, drink, rest on the rug, or curl up for a nap.
- **Food and rewards:** earn coins through focus, breaks, tasks, and daily pocket
  money. Buy meals to restore hearts or add golden bonus hearts.
- **The closet:** collect 24 domestic and wild coats. Counted feeding milestones
  unlock 11 accessories and friendship medals. Wear a head and neck item together.
- **Progress and memories:** open **Your progress** for lifetime totals and today's
  sessions, **Cat journal** for your latest 40 moments, or **How to play** for
  rules and advice for your cat's current state.
- **Focus together:** invite one friend to a private room with a shared timer
  and both cats in your workspace.
- **Cozy details:** day/night themes, daily cat facts with sources, contextual
  help, and a responsive layout.

Food and outfit changes unlock while paused or on a break. Time away never
makes your cat lose hearts.

## Run locally

Use **Node 26.13.0** (`.node-version`) and **pnpm 12.16.1** (`packageManager`).

```sh
pnpm install
pnpm dev
```

Open the URL printed by the development server and adopt your cat. The Cloudflare
Vite plugin runs the Worker and Durable Object locally.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm test` | Test game rules, saves, behavior/artwork, and room timer logic |
| `pnpm build` | Build the client and Cloudflare Worker |
| `pnpm preview` | Preview the production build locally |
| `pnpm generate-types` | Generate Cloudflare Worker binding types |
| `pnpm check` | Audit dependencies, generate types, and check/fix formatting, lint, and types |
| `pnpm run deploy --dry-run` | Build and validate deployment without uploading |
| `pnpm run deploy` | Build and deploy to Cloudflare |

## Focus with a friend

1. Open **Focus together** and choose **Create an invite**.
2. Copy the private link and share it with one friend.
3. Your friend opens the link or pastes it into **Have an invite?**.
4. The host starts, pauses, resets, and selects the shared timer mode.

Rooms last **24 hours** and hold **two people**. Reloading the same tab restores
membership, and temporary disconnections reconnect automatically. Leaving
transfers control to the remaining friend and resets your own timer for solo
focus. Join before a session starts to qualify for your own session rewards.

The room shares timer state, presence, cat names, and outfits. Tasks, coins,
health, and personal progress stay in each browser. Keep invite links private.

Multiplayer uses WebSockets and a SQLite-backed Cloudflare Durable Object;
static-only hosting cannot run it.

## Rewards and care

| Action | Result |
| --- | --- |
| Finish a focus session | 6 coins, 1 care point, and a task reward credit within the daily allowance |
| Complete a new task with a credit available | 1 coin, up to 3 task coins per local day |
| Finish a rewarded short / long break | 1 / 2 water marks and 1 coin per new mark |
| Fill the eight-mark water bowl | 4 extra coins |
| Claim daily pocket money | 1–3 coins, with no streak requirement |
| Feed your cat with a care point available | Restore hearts and advance counted-feed milestones |

The first **5 short breaks** and **3 long breaks** each day qualify for water
rewards. The bowl, daily allowances, daily progress, and session history reset
at local midnight. More breaks remain available after the reward allowance.

Every two completed focus sessions use half a heart; golden hearts are used
first. Meals restore hearts without care points, but do not advance feeding
milestones. At zero hearts, a free rescue meal brings your cat back. Owned coats
and accessories remain yours.

Add up to 10 tasks a day. Each task pays at most once; completing it before a
reward credit is available does not earn a coin later. Focus sessions may also
include a surprise coin gift. Your first name change is free; the next two cost
5 and 10 coins.

See [game.ts](src/kitty/game.ts) for exact prices, limits, and save rules.

## Saves and privacy

Personal progress saves automatically in this browser's `localStorage` under
`pomodoro-kitty-v1`; the theme uses `kitty-theme`. Supported older saves are
migrated and validated with Zod. Storage failures appear in the interface.

There are no user accounts or cloud saves. Clearing browser data removes local
progress, and other browsers or devices have separate saves. Focus room
membership uses `sessionStorage` to reconnect from the same tab.

Where Web Locks are supported, a second tab is read-only to prevent duplicate
purchases and rewards. The timer uses an absolute deadline and reconciles on
reload or return to the tab, avoiding accumulated background countdown drift.

## Deploy to Cloudflare

The project uses the installed **`cf` CLI** and
[cloudflare.config.ts](cloudflare.config.ts). The Worker is named
`pomodoro-kitty`, with `ASSETS` and `FOCUS_ROOMS` bindings. Build output is written
to `.cloudflare/output/v0/`.

With your Cloudflare account configured:

```sh
pnpm run deploy --dry-run
pnpm run deploy
```

For **Cloudflare Workers Builds**, use these dashboard settings:

| Setting | Value |
| --- | --- |
| Build command | Leave empty; the deploy command builds first |
| Deploy command | `pnpm run deploy` |

Replace the default `npx wrangler deploy`. Wrangler does not read this project's
`cloudflare.config.ts` and attempts unsupported Hono autoconfiguration instead.
Use `pnpm run deploy` explicitly: `pnpm deploy` is also a built-in pnpm command.

For CI authentication, configure `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` in the build environment. Do not commit credentials.

## Development map

| Location | Responsibility |
| --- | --- |
| `src/fetch.ts` | Hono requests, room API, locale middleware, Solid SSR |
| `src/App.tsx`, `src/Document.tsx` | Routing, translations, document shell, hydration, shared styles |
| `src/routes/[locale]/(app)/index.tsx` | Main timer and companion workspace |
| `src/kitty/game.ts`, `useKitty.ts` | Rules, save validation/migrations, persistence, timer lifecycle, tab lock |
| `src/kitty/FocusRoom.ts`, `room.ts`, `useFocusRoom.ts` | Durable Object, shared timer protocol, browser connection |
| `src/kitty/Friends.tsx`, `FriendsDock.tsx` | Invites and room interface |
| `src/kitty/Shop.tsx`, `coats.ts`, `accessories.ts` | Closet, coat catalog, accessory unlocks |
| `src/kitty/AnimatedCat.tsx`, `CatSprite.tsx`, `behaviors.ts` | Companion artwork, poses, and behavior |
| `src/kitty/DashboardHelp.tsx`, `ProgressSidebar.tsx`, `CatJournal.tsx` | Progress, guide, history, journal dialogs |
| `src/styles/` | Shared foundations, dashboard layout, themes, visual refinements |
| `src/i18n/` | Translation JSON; English is the default locale |
| `public/art/` | Lossless WebP room, cat, coat, pose, and inventory artwork |
| `scripts/check-focus-room.mjs` | Integration check with real WebSocket clients |
| `vite.config.ts`, `uno.config.ts` | Build plugins, file routes, utilities, theme configuration |

The app uses Solid 2 prerelease APIs. Shared styles load from `Document.tsx` in
the order `kitty.css`, `dashboard.css`, then `playful.css`; preserve that order.
Locale-prefixed routes use Rimelight i18n, though some interface copy remains
inline in components.

Shop previews and the equipped cat reuse each coat's sitting artwork, with
separate pose sheets and an inventory atlas for items. See
[artwork notes](public/art/README.md) for asset origins and layout details.

### Check multiplayer locally

With `pnpm dev` running:

```sh
node scripts/check-focus-room.mjs
```

The check covers origin protection, invites, the two-person limit, profiles,
host-only controls, shared deadlines, pause, reconnect, and host transfer. It
defaults to `http://127.0.0.1:5173`; set `FOCUS_ROOM_URL` for another origin.

---

Made by [Mironescu Octavian](https://octavianmironescu.com).
