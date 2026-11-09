import Preview from "./Preview";
import MenuHelp from "./MenuHelp";
import type { Game } from "./game";

export default function CatCondition(props: { game: Game }) {
  return (
    <div class="cat-condition" aria-label="Cat condition">
      <MenuHelp
        title="Hearts & bonus hearts"
        class="condition-trigger"
        trigger={
          <>
            <Preview item="heart" />
            <span>{props.game.health / 2}/3 hearts</span>
          </>
        }
      >
        <p>
          Food restores hearts. Special meals add bonus hearts, which are used before regular
          hearts. You currently have {props.game.bonus / 2} bonus hearts.
        </p>
        <p>
          Without protection, your cat loses half a heart every two focus sessions. Being away
          causes no damage.
        </p>
      </MenuHelp>
      <MenuHelp
        title="Water & break rewards"
        class="condition-trigger"
        trigger={
          <>
            <Preview item="water" />
            <span>Water {props.game.bowl}/8</span>
          </>
        }
      >
        <p>
          Finish a short break for 1 water mark or a long break for 2. Each new mark earns 1 coin.
          Filling the bowl earns 4 extra coins.
        </p>
        <p>
          The first 5 short and 3 long breaks completed each day can earn rewards. The bowl resets
          at local midnight.
        </p>
      </MenuHelp>
    </div>
  );
}
