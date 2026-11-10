# Companion artwork

Generated with the built-in imagegen tool from the user's approved orange-tabby room concept. The concept follows the simple pixel artwork in the user's minimal Pomodoro Kitty reference.

Production assets use lossless WebP. Every decoded RGBA pixel and image dimension is checked against its generated PNG before conversion is accepted.

- `companion.webp`: isolated, transparent static cat.
- `room.webp`: transparent room scenery, without a cat, so the companion remains independently interactive. Includes the approved bookshelf, plants, window, cushion, bowl and rug, plus matching wall bunting and dried flowers.

Extraction prompt: preserve the approved coarse pixel artwork, proportions, palette and outlines; isolate the cat and room onto transparent backgrounds without screenshot fragments or labels.

Room edit prompt: preserve the furniture and existing decor; remove only the cat and restore the rug behind her; add five muted cream, olive and terracotta pennants below the window and two small dried-flower sprigs below the botanical frame. Keep all additions in the same coarse pixel style.

The default ginger sitting artwork remains untouched. Every other sitting coat is an individual recolor of that original 1296 × 1213 canvas, retaining its broad face, silhouette and visible paws. The approved blue-gray and calico preview images are used directly. Equipped accessories use the inventory atlas itself with pose-specific anchors; body motion moves them with the cat and ear bows follow ear wiggles.

## Master-based coats and poses

Generated with the built-in imagegen tool. The former miniature multi-coat atlases have been retired. Coat IDs follow `coatCatalog` in `src/kitty/coats.ts`; prices, ownership, save IDs and unlocks are unchanged.

- `coats/{id}-sitting.webp`: IDs 1–23, individual recolors of the original sitting canvas. ID 0 uses `companion.webp` itself. Shop previews and the equipped cat use the same file.
- `coats/{id}-poses.webp`: IDs 0–23, one 2 × 2 sheet per coat. Top left: resting; top right: stretching; bottom left: drinking; bottom right: curled-up sleeping.
- `src/kitty/poseSizes.ts` records actual raster dimensions. Crop coordinates use these sizes, preserving image proportions instead of stretching every sheet into a square.

Prompt set: recolor the supplied original cat without redesigning its canvas, silhouette, pixel grid, face, limbs, visible paws or upright tail; change only fur pigment to the named coat's solid colors, patches, point coloration, stripes, spots or rosettes. Preserve pink ears/nose and warm stepped outlines. Pose generation first establishes one orange master with separate visible paws and a broad face; every other pose sheet is a fur-only edit of that master. Sleeping curls the body and tail into a pretzel. No text, labels, scenery, bowls, accessories or ground shadows. Targeted follow-ups remove residual tabby stripes from the solid white and black coats. Sitting canvas dimensions and pose-source dimensions are covered by tests; sitting opaque bounds were checked against the original before installation.

Sitting, ear and tail motion, meowing and petting reuse each coat's full-size sitting artwork. The room image remains unchanged.

`items-atlas.webp` is a transparent 6×6 inventory atlas generated with built-in imagegen. Prompt: match the room's coarse square pixels, warm dark outlines and stepped shading; draw distinct coins, water, pencil, gift, catnip, food, hanger, accessories, meals, book, trophy and medals in evenly spaced cells with transparent gutters. `ItemIcon.tsx` maps those cells to the UI. The cat and room sources were not edited for this icon update.
