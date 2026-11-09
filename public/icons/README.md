# Soft function icons

`cat-functions-soft.jpg` is a single 6 × 6 atlas used by `src/kitty/Preview.tsx`.
Cell indexes are defined in `src/kitty/icons.ts`; display sizes and positions are
controlled by `src/pixel-icons.css`. White blends into warm surfaces using multiply.
`src/kitty/iconFrames.ts` stores measured per-icon bounds for consistent centering
and scale. Regenerate those bounds with `scripts/measure-icons.ps1` if the atlas changes.

Created using the built-in image generation tool. Prompt brief: small Soft pixel
icons, warm colored outlines, muted coral/sage/cream/honey, minimal shading, and
36 icons in an evenly spaced 6 × 6 grid. No cat character or room scene. A final
edit preserved the icons and grid while cleaning background noise to white.

Rows, left to right:

1. Heart, food bowl, house, hanger, medal, coins.
2. Bubbles, lunch basket, gift, pencil, bonus heart, water.
3. Kibble, biscuits, milk, fish, chicken, salmon.
4. Hearty feast, royal feast, golden feast, bow, collar, hat.
5. Flower crown, crown, scratch tower, pet house, fishbowl, grass.
6. Bed, paint swatches, framed heart, shelf, lights, blanket.

Coat colors use palette swatches. Room, furniture, and decoration cells have been
cleared from the atlas and removed from the icon registry. The remaining cell
indexes are unchanged. The cat and fact-section book remain placeholders.
