import type { Game } from "./game";

export default function GameGuide(props: { game: Game; expanded?: boolean }) {
  const advice = () => {
    const g = props.game;
    if (g.timer.deadline && g.timer.mode === "focus")
      return "Focus is running. Food and shopping unlock when you pause or finish your session.";
    if (g.health + g.bonus === 0)
      return "Your cat is hiding. Use the free rescue action in Food to bring them back.";
    if (g.health < 6)
      return "Your cat could use a snack. Food restores hearts; each item shows how much it helps.";
    if (!g.gift)
      return "Your pocket money is ready. Claim 1–3 coins from the card above the dashboard.";
    return "Your cat is full and comfortable. Finish a focus session to earn coins, then take a break together.";
  };
  return (
    <aside class="game-guide" aria-label="Game guide">
      <details class="guide-container" open={props.expanded}>
        <summary class="guide-title">How to play</summary>
        <div class="guide-content">
          <section class="guide-welcome">
            <h3>A little company, at your pace</h3>
            <p>
              Care for your companion between sessions. Your progress saves automatically in this
              browser.
            </p>
            <ul>
              <li>
                <strong>Say hello:</strong> click your cat for a blush, a tail wiggle and a few
                hearts.
              </li>
              <li>
                <strong>Let her settle:</strong> little actions happen between 25–40 seconds of
                sitting. Rug rests last 3 minutes; bed naps last 4.
              </li>
              <li>
                <strong>Make it yours:</strong> use the pencil beside her name to rename her, or
                open Closet to dress her.
              </li>
            </ul>
          </section>
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
            <ul>
              <li>
                <strong>Red hearts:</strong> up to 3 regular hearts. A new companion starts with 1.
              </li>
              <li>
                <strong>Golden hearts:</strong> special meals can add up to 6 bonus hearts, used
                before red hearts.
              </li>
              <li>
                <strong>Hunger:</strong> every two completed focus sessions use half a heart. Time
                away never makes your cat hungry.
              </li>
              <li>
                <strong>Meals:</strong> each Food card shows the hearts it restores. At zero hearts,
                use the free rescue meal to welcome your cat back.
              </li>
            </ul>
          </details>
          <details name="game-mechanics">
            <summary>Water &amp; breaks</summary>
            <ul>
              <li>
                <strong>Short break:</strong> adds 1 water mark. <strong>Long break:</strong> adds
                2.
              </li>
              <li>
                <strong>Coins:</strong> each new mark earns 1 coin. Fill all 8 marks for 4 extra
                coins.
              </li>
              <li>
                <strong>Daily rewards:</strong> the first 5 short and 3 long completed breaks
                qualify. More breaks are always welcome.
              </li>
              <li>
                <strong>Fresh tomorrow:</strong> the bowl and daily reward limits reset at local
                midnight.
              </li>
            </ul>
          </details>
          <details name="game-mechanics">
            <summary>Outfits, medals &amp; memories</summary>
            <ul>
              <li>
                <strong>Coats:</strong> buy once with coins, then switch between owned coats for
                free.
              </li>
              <li>
                <strong>Accessories:</strong> finish a focus session for a care point. A useful meal
                spends one point and counts toward feeding milestones.
              </li>
              <li>
                <strong>Medals:</strong> counted feeds unlock friendship medals and accessories.
                Extra meals still restore hearts without a care point.
              </li>
              <li>
                <strong>Cat journal:</strong> revisit your latest 40 meals, milestones, outfits and
                little moments together.
              </li>
            </ul>
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
    </aside>
  );
}
