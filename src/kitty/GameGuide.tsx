import type { Game } from "./game";
import { MenuHelpPanel } from "./MenuHelp";

export default function GameGuide(props: { game: Game }) {
  const advice = () => {
    const g = props.game;
    if (g.timer.deadline && g.timer.mode === "focus")
      return "Focus is running. Care and shopping unlock when you pause or finish your session.";
    if (g.health + g.bonus === 0)
      return "Your cat is hiding. Use the free rescue action in Care to bring them back.";
    if (g.health < 6)
      return "Your cat could use a snack. Food restores hearts; each item shows how much it helps.";
    if (!g.gift) return "Your daily pocket money is ready. Claim 1–3 coins just above this guide.";
    return "Your cat is full and comfortable. Finish a focus session to earn coins, then take a break together.";
  };
  return (
    <aside class="game-guide" aria-label="Game guide">
      <details class="guide-container" open>
        <summary class="guide-title">How to play</summary>
        <div class="guide-content">
          <div class="guide-now">
            <strong>Right now</strong>
            <p>{advice()}</p>
          </div>
          <details name="game-mechanics">
            <summary>Focus &amp; coins</summary>
            <p>
              Finish a 25-minute focus session to earn 6 coins. You may also find a surprise coin
              gift during focus. Spend coins on food and outfits.
            </p>
            <p>Pausing keeps your remaining time. Reset starts the selected mode over.</p>
          </details>
          <details name="game-mechanics">
            <summary>Hearts &amp; food</summary>
            <p>
              Your cat has 3 regular hearts. Without protection, they lose half a heart every two
              focus sessions. Catnip protects against this heart loss.
            </p>
            <p>
              Food restores the amount shown on its card. Special food adds bonus hearts, which are
              used first. A full cat only needs food that adds bonus hearts.
            </p>
            <p>At zero hearts your cat hides. The free rescue action in Care brings them back.</p>
          </details>
          <details name="game-mechanics">
            <summary>Water &amp; breaks</summary>
            <p>
              Finish a short break to add 1 water mark, or a long break to add 2. Each new mark
              earns 1 coin; filling the 8-mark bowl earns 4 extra coins.
            </p>
            <p>
              Reward eligibility is limited to the first 5 short breaks and 3 long breaks completed
              each day. You can still take more breaks. A full bowl earns no more water coins until
              tomorrow.
            </p>
          </details>
          <details name="game-mechanics">
            <summary>Catnip &amp; protection</summary>
            <p>
              Catnip costs 4 coins and prevents heart loss for the next 4 focus sessions. You can
              stack protected sessions by buying more.
            </p>
          </details>
          <details name="game-mechanics">
            <summary>Tasks &amp; rewards</summary>
            <p>
              Add up to 10 tasks each day. Finish a focus session to unlock one task coin, then
              complete a new task to claim it. You can earn up to 3 task coins per day.
            </p>
            <p>
              Each task pays once. Completing it before a reward is available does not earn a coin
              later.
            </p>
          </details>
          <p class="guide-footnote">
            Daily limits reset at local midnight. Progress is saved in this browser.
          </p>
        </div>
      </details>
      <MenuHelpPanel />
    </aside>
  );
}
