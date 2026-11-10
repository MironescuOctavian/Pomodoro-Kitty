import Preview from "./Preview";
import MenuHelp from "./MenuHelp";
import type { Game } from "./game";
import StatusHearts from "./StatusHearts";

export default function CatCondition(props: { game: Game }) {
  return (
    <div class="cat-condition" aria-label="Cat condition">
      <MenuHelp
        title="Hearts & bonus hearts"
        class="condition-trigger"
        trigger={
          <>
            <StatusHearts health={props.game.health} bonus={props.game.bonus} />
          </>
        }
      >
        <ul>
          <li>
            <strong>Red:</strong> {props.game.health / 2} of 3 regular hearts. Food restores the
            amount shown on its card.
          </li>
          <li>
            <strong>Gold:</strong> {props.game.bonus / 2} of 6 bonus hearts. Special meals add
            these; hunger uses them first.
          </li>
          <li>
            <strong>Hunger:</strong> half a heart every two completed focus sessions. No hearts are
            lost while you are away.
          </li>
        </ul>
      </MenuHelp>
      <MenuHelp
        title="Water & break rewards"
        class="condition-trigger water-hud"
        trigger={
          <>
            <Preview item="water" />
            <span>
              <span class="water-label">Water </span>
              {props.game.bowl}/8
            </span>
          </>
        }
      >
        <ul>
          <li>
            <strong>Short break:</strong> +1 water mark. <strong>Long break:</strong> +2 marks.
          </li>
          <li>
            <strong>Each new mark:</strong> +1 coin. <strong>Full bowl:</strong> +4 extra coins.
          </li>
          <li>
            <strong>Daily limit:</strong> 5 short and 3 long rewarded breaks, up to 8 water marks.
            Everything refreshes at local midnight.
          </li>
        </ul>
      </MenuHelp>
    </div>
  );
}
