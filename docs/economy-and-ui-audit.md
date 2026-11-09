# Economy rebalance and website audit

## Implemented

| Item                      | Before                | Now                                             |
| ------------------------- | --------------------- | ----------------------------------------------- |
| Completed focus           | 3–5 coins             | 6 coins, plus existing occasional surprise gift |
| Regular food              | 1, 2, 3, 5, 7, 9      | 1, 2, 3, 4, 5, 6                                |
| Bonus-heart food          | 15, 20, 25            | 9, 12, 15                                       |
| Four-session packed lunch | 8                     | 4                                               |
| Domestic collection       | 34 coats              | 12 coats; 3 free, paid coats 12–150             |
| Wild collection           | 12 coats, 750–4,000   | 12 coats, 220–1,350                             |
| Accessory milestones      | 1–1,000 counted feeds | 1, 3, 5, 8, 12, 18, 25, 35, 50, 75, 100         |
| Break reward slots        | Consumed when started | Consumed on completion                          |

Daily gifts remain 1–3 coins; task rewards remain at most 3 coins/day, and task creation stays at 10/day. Removed the automatic development-only 10,000-coin grant. Existing balances are untouched.

Domestic selection: ginger tabby, snow white, blue gray, midnight black, silver tabby, tuxedo, classic tabby, tortoiseshell, calico, seal point, flame point, black smoke.

Old saves migrate once to catalog v2. Retained coats keep ownership; retired coats map to similar retained options and refund their previous purchase price. Selected wild coats retain their identity. Repeat loading does not repeat refunds.

## Pacing example

Four focus sessions, three short breaks, one long break, three rewarded tasks, and a two-coin daily gift yield 34 coins. Replacing the day's two lost half-hearts costs 2 coins, leaving 32 coins to save. This excludes surprise gifts. The first wild coat then takes around 7 such days, and the final coat around 43 days when saving for that coat alone. Buying the whole collection takes longer. Protection is an optional convenience purchase; free cleaning is still useful.

## Testing

43 browser assertions passed on an isolated local test save. Checked adoption, five-coin starting fixture, task creation/selection/limit/internal scroll, daily goal saving, theme saving, scene colors, contextual help, timer start/pause/dimming, focus completion and task payouts, food confirmation/inert backdrop/healing/spending, coat filters/affordability/equipping/purchasing, daily gift, packed lunch, accessory unlocking/removal, medals, changing facts, history, reload persistence, and second-tab read-only protection. Session completion tests advanced the test page's clock rather than waiting 25 minutes. No production save was edited.

Inspected desktop at 1280×800 and 1920×1080 and mobile at 390×844. No mobile horizontal page overflow. No console errors or warnings in the inspected snapshots. A server-side “Context can only be accessed under a reactive root” warning appeared during development hot reload; this needs a separate SSR/HMR investigation. Build, lint, type checks, and game tests pass.

## Recommendations awaiting approval

Update: recommendations 1, 2, 3, 4, and 8 below were approved and implemented. Browser checks confirm the desktop workspace fits at 1920×1080 and 1280×800, mobile uses a scrolling footer and a 99px header at 390×844, the guide uses its native open state correctly, Accessories explains counted feeds, and completed sessions offer the appropriate next session without starting automatically. The short-screen layout reduces visible list rows and the scene's height to preserve controls. Build, lint, types, and 21 game tests pass.

1. **Fix viewport proportions first.** At 1920×1080 the main frame is about 1,059px high while the workspace has 884px available, before accounting for the fact strip. It therefore still needs internal page scrolling. Reduce timer whitespace and combine small summaries; keep item lists scrolling internally.
2. **Treat mobile separately.** At 390×844, header and fixed footer consume 386px, leaving only 458px for the app. Put the mobile footer in the scrolling content, condense the header, and keep the brand on one line. Desktop footer can stay as requested.
3. **Make the guide smaller and more accessible.** The wide-screen guide uses a visually exposed but natively closed details element. Its help and history cards sit far below the fold. Use a proper visible guide heading on desktop and a real disclosure on mobile, with one compact topic open at a time.
4. **Unify terminology.** The closet submenu is called “Care rewards,” although it contains accessories. Use “Accessories,” show the next milestone, and explain that only feeds backed by care credits count. This is the least obvious economy rule.
5. **Simplify task rewards.** Current tasks can be completed before earning a credit and then never pay later. Consider banking the reward until the next completed focus session, retaining the daily three-coin cap. This changes game rules and is not implemented.
6. **Improve visual feedback.** Make recently earned coins briefly appear near the balance, distinguish purchased/equipped states with one consistent badge, and lighten the break-reward icons in night mode. Several secondary labels remain too small.
7. **Add one useful collection feature.** A pinned “Saving for” coat with price and progress would make end-game costs easier to understand. No extra currency or care meter is needed.
8. **Clarify session completion.** The timer ends at 00:00 until restarted. Offer a clear “Take a short break” action after focus, and “Back to focus” after a break, without starting the next session automatically.
