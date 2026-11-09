/** Shared components styles for the Kitty UnoCSS preset. */
export default String.raw`
.cozy-theme .focus-desk {
  gap: 18px;
}

.cozy-theme .timer-sheet {
  padding: 25px 30px 22px;
}

.cozy-theme .desk-title {
  font-size: clamp(28px, 2.7vw, 36px);
  line-height: 1.1;
}

.cozy-theme .desk-subtitle {
  font: 500 clamp(22px, 2.2vw, 28px)/1.15 var(--display);
  color: var(--ink);
  margin: 3px 0 20px;
}

.cozy-theme .mode-switch {
  width: fit-content;
  max-width: 100%;
  box-shadow: none;
  background: none;
  border: 0;
  border-radius: 0;
  gap: 24px;
  padding: 0;
}

.cozy-theme .mode-switch button {
  box-shadow: none;
  color: var(--soft-ink);
  font: 500 17px/1.2 var(--display);
  background: none;
  border: 0;
  border-radius: 0;
  flex: 0 auto;
  padding: 8px 1px 10px;
  position: relative;
}

.cozy-theme .mode-switch button[aria-pressed="true"] {
  box-shadow: none;
  color: var(--ink);
  background: none;
  border: 0;
  border-radius: 0;
}

.cozy-theme .mode-switch button[aria-pressed="true"]:after {
  content: "";
  background: var(--accent-ink);
  border-radius: 3px;
  height: 3px;
  position: absolute;
  bottom: 1px;
  left: 0;
  right: 0;
}

.cozy-theme .mode-switch button:hover {
  color: var(--ink);
}

.cozy-theme .focus-clock {
  font-variant-numeric: tabular-nums;
  letter-spacing: -.035em;
  min-width: 5ch;
  margin: 12px 0 14px;
  font-size: clamp(90px, 10vw, 142px);
  line-height: 1.08;
}

.cozy-theme .timer-progress {
  height: 10px;
  margin-bottom: 8px;
}

.session-caption {
  color: var(--ink);
  font-variant-numeric: tabular-nums;
  margin: 0 0 20px;
  font-size: 12px;
  line-height: 1.5;
}

.cozy-theme .timer-actions {
  gap: 26px;
}

.cozy-theme .timer-actions .start-button {
  min-width: 185px;
}

.cozy-theme .timer-actions > .quiet-button {
  padding: 10px 8px;
}

.cozy-theme .timer-reward {
  margin-top: 16px;
  font-size: 12px;
}

.cozy-theme .task-section {
  flex: 1;
  gap: 0;
  min-height: 265px;
  padding: 0 16px 12px;
  overflow: hidden;
}

.cozy-theme .task-section .kitty-heading {
  box-shadow: inset 0 1px 0 var(--highlight);
  background: linear-gradient(110deg, #ffefc9, #fff6e2);
  border: 0;
  border-bottom: 1px dashed #dfb977;
  border-radius: 20px 20px 0 0;
  flex-shrink: 0;
  margin: 0 -16px 5px;
  padding: 12px 18px;
  font-size: 23px;
}

.cozy-theme .task-count {
  font-size: 12px;
}

.cozy-theme .task-list {
  scrollbar-gutter: stable;
  flex: auto;
  min-height: 45px;
  max-height: 192px;
  padding-right: 4px;
  overflow-y: auto;
}

.cozy-theme .task-item {
  border-bottom: 1px dashed var(--stitch);
  gap: 8px;
  min-height: 46px;
}

.cozy-theme .task-item label {
  padding-block: 11px;
  font-size: 14px;
  line-height: 1.5;
}

.cozy-theme .task-item input {
  width: 19px;
  height: 19px;
}

.cozy-theme .task-done {
  color: #897563;
  text-decoration-thickness: 1px;
}

.cozy-theme .task-delete {
  color: #987f66;
  padding: 6px 8px;
  font-size: 20px;
}

.cozy-theme .task-delete:hover {
  color: var(--accent-ink);
  background: #f7ebd8;
  border-radius: 7px;
}

.task-entry {
  flex-shrink: 0;
  padding-block: 5px;
}

.cozy-theme .task-add {
  font: 500 16px/1.3 var(--display);
  color: var(--accent-ink);
  padding: 8px 3px;
}

.cozy-theme .task-form {
  border-color: #d8bd91;
  margin-bottom: 5px;
}

.cozy-theme .task-form input {
  font-size: 14px;
}

.cozy-theme .task-details {
  border-top: 1px solid var(--rule);
  flex-shrink: 0;
  margin-top: 4px;
  padding-top: 8px;
  font-size: 12px;
}

.cozy-theme .task-details p {
  font-size: 12px;
}

.cozy-theme .task-empty {
  padding-block: 20px;
  font-size: 14px;
}

@media (width <= 520px) {
  .cozy-theme .timer-sheet {
    padding: 24px 17px 20px;
  }

  .cozy-theme .desk-title {
    font-size: 27px;
  }

  .cozy-theme .desk-subtitle {
    margin-bottom: 17px;
    font-size: 23px;
  }

  .cozy-theme .mode-switch {
    gap: 16px;
  }

  .cozy-theme .mode-switch button {
    font-size: 15px;
  }

  .cozy-theme .focus-clock {
    min-width: 0;
    font-size: clamp(76px, 22vw, 112px);
  }

  .cozy-theme .timer-actions {
    gap: 17px;
  }

  .cozy-theme .timer-actions .start-button {
    min-width: 150px;
    padding-inline: 22px;
    font-size: 20px;
  }

  .session-caption {
    font-size: 12px;
  }

  .cozy-theme .task-section .kitty-heading {
    font-size: 21px;
  }

  .cozy-theme .task-form input {
    font-size: 16px;
  }
}

.cozy-theme .focus-layout {
  align-items: start;
}

.cozy-theme .focus-desk {
  align-self: start;
  min-width: 0;
}

.cozy-theme .companion-controls {
  min-width: 0;
}

.cozy-theme .companion-panel, .cozy-theme .companion-panel:has(.shop-panel) {
  box-sizing: border-box;
  overflow-anchor: none;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: 430px;
  min-height: 430px;
  max-height: 430px;
  padding: 0;
  display: flex;
  position: relative;
  overflow: hidden;
}

.menu-browser {
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
}

.cozy-theme .menu-browser > .kitty-note, .cozy-theme .companion-panel > .kitty-note {
  flex-shrink: 0;
  margin: 10px 14px 0;
  font-size: 12px;
}

.cozy-theme .menu-page {
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.cozy-theme .menu-header {
  border-bottom: 1px solid var(--rule);
  flex: none;
  max-height: 55%;
  margin: 0;
  padding: 16px 18px 12px;
  display: block;
  overflow-y: auto;
}

.cozy-theme .companion-panel .menu-header .kitty-heading {
  font: 500 22px/1.25 var(--display);
  color: var(--ink);
  overflow-wrap: anywhere;
  margin: 0 0 6px;
}

.cozy-theme .companion-panel .menu-header .kitty-muted {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
}

.cozy-theme .menu-header .help-details {
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.5;
}

.cozy-theme .menu-header .help-details summary {
  color: var(--accent-ink);
}

.cozy-theme .menu-list {
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: #d8bd91 transparent;
  flex: 1;
  min-height: 0;
  padding: 4px 16px 14px;
  overflow-y: auto;
}

.cozy-theme .shop-categories {
  background: #f1e7d7;
  border-radius: 12px;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 12px;
  padding: 4px;
  display: inline-flex;
}

.cozy-theme .shop-categories .shop-category {
  min-height: 36px;
  box-shadow: none;
  color: var(--soft-ink);
  font: 500 15px/1.2 var(--display);
  background: none;
  border: 1px solid #0000;
  border-radius: 9px;
  padding: 7px 11px;
}

.cozy-theme .shop-categories .shop-category[aria-pressed="true"] {
  background: var(--sheet);
  color: var(--ink);
  border-color: #d8bd91;
  box-shadow: 0 1px #d8bd91;
}

.cozy-theme .shop-categories .shop-category:hover {
  color: var(--ink);
}

.cozy-theme .companion-tabs button {
  font: 500 16px/1.2 var(--display);
  background-image: none;
  box-shadow: 0 2px #e4cfad;
}

.cozy-theme .companion-tabs button[aria-pressed="true"] {
  background: var(--honey-soft);
  box-shadow: inset 0 -3px 0 var(--honey),
    0 2px 0 #e4cfad;
}

.cozy-theme .menu-list .care-row, .cozy-theme .menu-list .pal-product {
  border: 0;
  border-bottom: 1px solid var(--rule);
  min-height: 86px;
  box-shadow: none;
  background: none;
  border-radius: 0;
  grid-template-columns: 34px minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 12px;
  margin: 0;
  padding: 15px 0;
  display: grid;
}

.cozy-theme .menu-list .care-label strong, .cozy-theme .menu-list .pal-product > strong {
  font: 500 17px/1.3 var(--display);
  color: var(--ink);
  overflow-wrap: anywhere;
}

.cozy-theme .menu-list .care-label small, .cozy-theme .menu-list .pal-product > .kitty-badge {
  color: var(--soft-ink);
  font: 400 13px / 1.5 Plus Jakarta Sans, sans-serif;
}

.cozy-theme .menu-list .care-label small + small {
  color: var(--accent-ink);
  font-size: 12px;
}

.cozy-theme .menu-list .art-preview {
  border-radius: 8px;
  width: 32px;
  height: 32px;
}

.cozy-theme .menu-list .care-row > .kitty-badge, .cozy-theme .menu-list .product-status {
  color: var(--accent-ink);
  font-size: 12px;
  line-height: 1.4;
}

.cozy-theme .menu-list .kitty-button:not(.pal-product) {
  background: var(--honey-soft);
  min-width: 80px;
  min-height: 38px;
  box-shadow: inset 0 1px 0 var(--highlight),
    0 2px 0 #c99b62;
  color: var(--ink);
  font: 500 15px/1.2 var(--display);
  white-space: nowrap;
  background-image: none;
  border: 1px solid #c99b62;
  border-radius: 10px;
  margin: 0;
  padding: 8px 12px;
}

.cozy-theme .menu-list .kitty-button.claim-button {
  background: var(--honey);
  border-color: #b88128;
  box-shadow: inset 0 1px #ffe0a1, 0 2px #b88128;
}

.cozy-theme .menu-list .kitty-button:disabled {
  opacity: 1;
  color: #8b7a68;
  border-color: var(--rule);
  box-shadow: none;
  background: #f1ebe1;
}

.cozy-theme .menu-list button.pal-product:disabled {
  opacity: .65;
  background: none;
}

.cozy-theme .menu-list .break-details {
  border-radius: 12px;
  margin-top: 12px;
  padding: 12px;
  font-size: 13px;
}

.cozy-theme .menu-list .break-details summary {
  font-size: 13px;
  line-height: 1.5;
}

.cozy-theme .menu-list .break-details summary > span:first-child {
  font-size: 17px;
}

.cozy-theme .menu-list .break-details .kitty-muted {
  font-size: 13px;
  line-height: 1.6;
}

.cozy-theme .shop-items button.pal-product > .kitty-badge {
  max-width: 105px;
  font-size: 12px;
  font-weight: 500;
}

.cozy-theme .menu-list .medal-locked {
  opacity: .65;
}

@media (width <= 520px) {
  .cozy-theme .companion-tabs {
    gap: 4px;
  }

  .cozy-theme .companion-tabs button {
    font-size: 14px;
  }

  .cozy-theme .menu-header {
    padding: 14px 12px 11px;
  }

  .cozy-theme .companion-panel .menu-header .kitty-heading {
    font-size: 21px;
  }

  .cozy-theme .menu-list {
    padding-inline: 11px;
  }

  .cozy-theme .menu-list .care-row, .cozy-theme .menu-list .pal-product {
    grid-template-columns: 26px minmax(0, 1fr);
    gap: 6px 10px;
  }

  .cozy-theme .menu-list .care-row > .art-preview, .cozy-theme .menu-list .care-row > .kitty-badge:first-child {
    grid-area: 1 / 1 / 3;
    width: 26px;
    height: 26px;
  }

  .cozy-theme .menu-list .care-label {
    grid-area: 1 / 2;
  }

  .cozy-theme .menu-list .care-row > button, .cozy-theme .menu-list .care-row > .kitty-badge:last-child {
    grid-area: 2 / 2;
    justify-self: start;
  }

  .cozy-theme .shop-categories .shop-category {
    padding-inline: 9px;
    font-size: 14px;
  }
}

.cozy-theme .art-preview {
  vertical-align: middle;
  border-radius: 8px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  display: inline-flex;
}

.cozy-theme .coat-swatch {
  border: 1px solid var(--rule);
}

.cozy-theme .companion-tabs button {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  min-height: 67px;
  padding: 5px 2px 8px;
  font-size: 15px;
  display: flex;
}

.cozy-theme .companion-tabs .art-preview {
  width: 30px;
  height: 30px;
}

.cozy-theme .coin-balance .art-preview, .cozy-theme .hearts .art-preview {
  width: 22px;
  height: 22px;
}

.cozy-theme .companion-coins {
  max-width: none;
}

.cozy-theme .companion-heading {
  padding-right: 128px;
}

.cozy-theme .hearts > span {
  align-items: center;
  gap: 4px;
  display: inline-flex;
}

.cozy-theme .rename-button {
  align-items: center;
  padding: 4px;
  display: inline-flex;
}

.cozy-theme .rename-button .art-preview {
  width: 25px;
  height: 25px;
}

.cozy-theme .medal-icon {
  justify-content: center;
  align-items: center;
  display: inline-flex;
}

.cozy-theme .menu-list .care-row {
  grid-template-columns: 44px minmax(0, 1fr) auto;
  min-height: 78px;
  padding-block: 12px;
}

.cozy-theme .shop-items .pal-product {
  grid-template-columns: 44px minmax(0, 1fr) auto;
}

.cozy-theme .menu-list .care-row > .icon-tile, .cozy-theme .menu-list .medal-icon > .icon-tile, .cozy-theme .shop-items .pal-product > .icon-tile, .cozy-theme .purchase-preview > .icon-tile {
  background: linear-gradient(var(--sheet), #f6ead4);
  border: 1px solid #d6b786;
  border-radius: 10px;
  width: 42px;
  height: 42px;
  padding: 3px;
  box-shadow: inset 0 1px #fff, 0 2px #e5cfad;
}

.cozy-theme .purchase-preview > .icon-tile {
  width: 64px;
  height: 64px;
  padding: 5px;
}

.cozy-theme .break-details summary > span:first-child {
  align-items: center;
  gap: 8px;
  display: flex;
}

.cozy-theme .break-details summary .art-preview {
  width: 28px;
  height: 28px;
}

.cozy-theme .menu-list .kitty-button:not(.pal-product) {
  justify-content: center;
  align-items: center;
  gap: 5px;
  display: inline-flex;
}

.cozy-theme .menu-list .kitty-button .art-preview {
  width: 22px;
  height: 22px;
  box-shadow: none;
  background: none;
  border: 0;
  padding: 0;
}

@media (width <= 520px) {
  .cozy-theme .companion-tabs button {
    min-height: 62px;
    font-size: 13px;
  }

  .cozy-theme .companion-tabs .art-preview {
    width: 27px;
    height: 27px;
  }

  .cozy-theme .companion-heading {
    padding-right: 105px;
  }

  .cozy-theme .menu-list .care-row, .cozy-theme .shop-items .pal-product {
    grid-template-columns: 38px minmax(0, 1fr);
  }

  .cozy-theme .menu-list .care-row > .icon-tile, .cozy-theme .menu-list .medal-icon > .icon-tile, .cozy-theme .shop-items .pal-product > .icon-tile {
    width: 36px;
    height: 36px;
  }

  .cozy-theme .menu-list .kitty-button .art-preview {
    width: 20px;
    height: 20px;
  }
}

.cozy-theme .companion-controls {
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  display: grid;
}

.cozy-theme .companion-tabs {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: stretch;
  display: grid;
}

.cozy-theme .companion-tabs button {
  width: 100%;
  min-width: 0;
  height: 48px;
  margin: 0;
  transform: none;
}

.cozy-theme .companion-tabs button:hover {
  transform: none;
}

.cozy-theme .companion-tabs button:after {
  display: none;
}

.cat-condition {
  flex-wrap: wrap;
  gap: 6px;
  margin: -6px 0 16px;
  display: flex;
}

.cat-condition details {
  border: 1px solid var(--rule);
  background: var(--sheet);
  border-radius: 9px;
  flex: 115px;
  min-width: 0;
}

.cat-condition summary {
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 8px 5px;
  font-size: 12px;
  list-style: none;
  display: flex;
}

.cat-condition summary::-webkit-details-marker {
  display: none;
}

.cat-condition summary:after {
  content: "+";
  color: var(--soft-ink);
}

.cat-condition details[open] summary:after {
  content: "−";
}

.cat-condition .art-preview {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.cat-condition p {
  color: var(--soft-ink);
  margin: 0;
  padding: 0 10px 10px;
  font-size: 12px;
  line-height: 1.6;
}

.purchase-feedback {
  color: #596c35;
  min-height: 20px;
  margin: 0 0 8px;
  padding-right: 115px;
  font-size: 12px;
  line-height: 1.5;
}

.cozy-theme .menu-list .just-purchased {
  outline-offset: -2px;
  background-color: #f1f5e6;
  outline: 2px solid #9cae67;
}

.task-reward-notice {
  color: var(--accent-ink);
  flex-shrink: 0;
  order: 4;
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
}

.task-reward-notice:empty {
  display: none;
}

@media (prefers-reduced-motion: no-preference) {
  .just-purchased {
    animation: .5s ease-out purchase-highlight;
  }
}

@keyframes purchase-highlight {
  from {
    box-shadow: inset 0 0 0 5px #cbd7a4;
  }

  to {
    box-shadow: inset 0 0 #0000;
  }
}
`;
