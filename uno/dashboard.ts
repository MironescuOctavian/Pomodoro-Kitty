/** Shared dashboard styles for the Kitty UnoCSS preset. */
export default String.raw`
.cozy-theme *, .cozy-theme :before, .cozy-theme :after {
  box-sizing: border-box;
}

.cozy-theme .companion-controls {
  align-items: stretch;
}

html, body {
  height: 100%;
  overflow: hidden;
}

.app-shell {
  flex-direction: column;
  height: 100dvh;
  display: flex;
  overflow: hidden;
}

.app-shell #main-content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.cozy-theme .app-header {
  flex-shrink: 0;
}

.cozy-theme .header-inner {
  min-height: 60px;
}

.cozy-theme .workspace {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-block: 8px 14px;
  overflow-y: auto;
}

.cozy-theme .daily-fact-section {
  margin-block: 0 10px;
}

.cozy-theme .daily-fact {
  min-height: 46px;
  padding-block: 6px;
}

.cozy-theme .fact-source {
  margin-top: 3px;
}

.cozy-theme .app-footer {
  flex-shrink: 0;
  margin-top: 0;
}

.cozy-theme .footer-main {
  gap: 28px;
  padding-block: 24px;
  font-size: 14px;
  line-height: 1.7;
}

.cozy-theme .footer-main .app-brand {
  font-size: 24px;
}

.cozy-theme .footer-credit {
  margin-top: 10px;
  font-size: 13px;
}

.cozy-theme .footer-main h2 {
  margin-bottom: 8px;
  font-size: 17px;
}

.cozy-theme .footer-privacy > span {
  font-size: 14px;
}

.cozy-theme .footer-links a {
  padding-block: 4px;
}

.cozy-theme .companion-topline {
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-height: 34px;
  display: flex;
}

.cozy-theme .companion-heading {
  min-width: 0;
  min-height: 0;
  padding: 0;
  display: block;
}

.cozy-theme .cat-name h2 {
  font-size: 26px;
  line-height: 1.2;
}

.cozy-theme .companion-coins {
  border-color: var(--rule);
  background: var(--sheet);
  flex-shrink: 0;
  padding: 5px 8px;
  font-size: 12px;
  position: static;
}

.cozy-theme .purchase-feedback {
  text-align: right;
  pointer-events: none;
  z-index: 1;
  min-height: 0;
  margin: 0;
  padding: 0;
  font-size: 11px;
  position: absolute;
  top: 49px;
  left: 18px;
  right: 18px;
}

.cozy-theme .purchase-feedback:empty {
  display: none;
}

.cozy-theme .companion-upper {
  flex-shrink: 0;
  grid-template-columns: minmax(0, 1fr) 112px;
  align-items: center;
  gap: 12px;
  margin: 12px 0;
  display: grid;
}

.cozy-theme .companion-upper .companion-room {
  border-color: var(--rule);
  width: 100%;
  max-width: 380px;
  box-shadow: inset 0 0 0 3px var(--sheet),
    0 2px 0 #ead7b9;
  justify-self: center;
  margin: 0;
}

.cozy-theme .companion-upper .cat-art-placeholder {
  height: 138px;
  min-height: 0;
  padding-bottom: 48px;
}

.cozy-theme .companion-upper .cat-status {
  min-height: 38px;
  font-size: 11px;
  line-height: 1.4;
}

.cozy-theme .cat-condition {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  margin: 0;
  display: flex;
}

.condition-item {
  min-width: 0;
}

.cozy-theme .condition-trigger {
  width: 100%;
  min-height: 37px;
  box-shadow: none;
  color: var(--ink);
  text-align: left;
  white-space: nowrap;
  background: none;
  border: 0;
  border-radius: 8px;
  align-items: center;
  gap: 5px;
  padding: 4px 0;
  font: 400 12px / 1.4 Plus Jakarta Sans, sans-serif;
  display: flex;
}

.cozy-theme .condition-trigger:hover {
  background: #efe4d333;
}

.cozy-theme .cat-condition .art-preview {
  width: 25px;
  height: 25px;
  box-shadow: none;
  background: none;
  border: 0;
  padding: 0;
}

.condition-tooltip {
  z-index: 1000;
  width: min(250px, 100vw - 24px);
  max-height: 180px;
  color: var(--ink);
  pointer-events: none;
  background: #fffaf0;
  border: 1px solid #d8bd91;
  border-radius: 13px;
  padding: 14px 16px;
  position: fixed;
  overflow-y: auto;
  box-shadow: 0 5px 18px #382b2222;
}

.condition-tooltip strong {
  font: 500 17px/1.3 var(--display);
}

.condition-tooltip p {
  color: var(--soft-ink);
  margin: 7px 0 0;
  padding: 0;
  font: 400 13px / 1.6 Plus Jakarta Sans, sans-serif;
}

.cozy-theme .art-preview {
  pointer-events: none;
  outline: none;
}

.cozy-theme .menu-list .just-purchased {
  box-shadow: none;
  background: #fff0c855;
  outline: none;
  animation: none;
}

.cozy-theme .companion-tabs button {
  border-color: var(--rule);
  flex-direction: row;
  gap: 5px;
  height: 43px;
  min-height: 43px;
  padding: 6px 8px;
  font-size: 15px;
  box-shadow: 0 1px #e4cfad;
}

.cozy-theme .companion-tabs .art-preview {
  width: 23px;
  height: 23px;
}

.cozy-theme .shop-items .grid, .cozy-theme .food-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-content: start;
  gap: 10px;
  padding-top: 12px;
  display: grid;
}

.cozy-theme .shop-items .pal-product, .cozy-theme .food-list .care-row {
  border: 1px solid var(--rule);
  background: var(--sheet);
  min-width: 0;
  min-height: 160px;
  box-shadow: inset 0 1px 0 var(--highlight);
  text-align: center;
  border-radius: 12px;
  flex-direction: column;
  align-items: stretch;
  gap: 7px;
  padding: 12px;
  display: flex;
}

.cozy-theme .shop-items .pal-product > .icon-tile, .cozy-theme .food-list .care-row > .icon-tile {
  align-self: center;
  width: 42px;
  height: 42px;
}

.cozy-theme .shop-items .pal-product > strong, .cozy-theme .food-list .care-label strong {
  font-size: 16px;
  line-height: 1.25;
}

.cozy-theme .shop-items .pal-product > .kitty-badge, .cozy-theme .shop-items button.pal-product > .kitty-badge {
  text-align: center;
  justify-content: center;
  place-self: center;
  max-width: 100%;
  font-size: 12px;
}

.cozy-theme .shop-items .pal-product > button, .cozy-theme .food-list .care-row > button {
  align-self: stretch;
  width: 100%;
  min-width: 0;
  margin-top: auto;
  font-size: 14px;
}

.cozy-theme .shop-items .product-status {
  background: #f5ead8;
  border-radius: 999px;
  align-self: center;
  margin-top: auto;
  padding: 5px 10px;
}

.cozy-theme .shop-items button.pal-product > strong {
  flex: 1;
}

.cozy-theme .shop-items button.pal-product > span[style] {
  align-self: center;
  width: 42px;
  height: 42px;
}

.cozy-theme .shop-items .pal-product > .unavailable-reason {
  font-size: 11px;
}

.cozy-theme .menu-list .care-label small {
  font-size: 12px;
}

.cozy-theme .companion-tabs button[aria-pressed="true"] {
  background: var(--honey-soft);
  box-shadow: inset 0 -2px 0 var(--honey),
    0 1px 0 #e4cfad;
  border-color: #d3a45c;
}

.cozy-theme .companion-topline .cat-name {
  gap: 5px;
}

.cozy-theme .companion-topline .rename-button {
  border-radius: 8px;
}

.cozy-theme .companion-topline .rename-button:hover {
  background: var(--paper);
}

.cozy-theme .companion-panel {
  border-color: var(--rule);
  background: var(--sheet);
  border-radius: 14px;
}

.cozy-theme .menu-header {
  border-bottom-color: var(--rule);
  background: #fbf6ec;
}

.cozy-theme .menu-header .kitty-muted {
  color: var(--soft-ink);
}

.cozy-theme .menu-list .care-row {
  box-shadow: none;
  background: none;
}

.cozy-theme .menu-list .kitty-button:not(.pal-product) {
  box-shadow: 0 1px #c99b62;
}

.cozy-theme .menu-list .kitty-button:disabled {
  box-shadow: none;
}

.cozy-theme .shop-items .grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cozy-theme .shop-items .grid-cols-3 .pal-product {
  gap: 6px;
  min-height: 130px;
  padding: 10px 8px;
}

.cozy-theme .shop-items .pal-product[aria-pressed="true"] {
  background: var(--honey-soft);
  box-shadow: inset 0 -2px 0 var(--honey);
  border: 1px solid #d3a45c;
}

.cozy-theme .shop-items .pal-product > .kitty-badge {
  font-size: 12px;
}

.cozy-theme .milestone-progress {
  text-align: right;
  width: 84px;
  color: var(--soft-ink);
  font-variant-numeric: tabular-nums;
  justify-self: end;
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.milestone-progress progress {
  appearance: none;
  background: var(--rule);
  border: 0;
  border-radius: 99px;
  width: 100%;
  height: 5px;
  overflow: hidden;
}

.milestone-progress progress::-webkit-progress-bar {
  background: var(--rule);
}

.milestone-progress progress::-webkit-progress-value {
  background: var(--honey);
  border-radius: 99px;
}

.milestone-progress progress::-moz-progress-bar {
  background: var(--honey);
  border-radius: 99px;
}

.cozy-theme .purchase-feedback:not(:empty) {
  background: var(--sheet);
  text-align: left;
  z-index: 4;
  border: 1px solid #d8bd91;
  border-radius: 10px;
  max-width: calc(100% - 48px);
  padding: 8px 12px;
  font-size: 12px;
  inset: auto 24px 20px auto;
  box-shadow: 0 3px 10px #382b2214;
}

@media (width <= 520px) {
  .cozy-theme .companion-tabs {
    gap: 5px;
  }

  .cozy-theme .companion-tabs button {
    gap: 2px;
    padding-inline: 3px;
    font-size: 13px;
  }

  .cozy-theme .companion-tabs .art-preview {
    width: 19px;
    height: 19px;
  }

  .cozy-theme .shop-items .grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cozy-theme .milestone-progress {
    text-align: left;
    grid-area: 2 / 2;
    justify-self: start;
    width: 110px;
  }
}

.cozy-theme .companion-panel:has(.purchase-page) .menu-browser {
  opacity: .14;
  filter: blur(1px);
}

.cozy-theme .companion-panel > .purchase-page {
  backdrop-filter: blur(2px);
  background: #fffaf078;
  gap: 9px;
}

.cozy-theme .purchase-page h3 {
  font-size: 21px;
}

.cozy-theme .purchase-preview > .icon-tile {
  width: 52px;
  height: 52px;
}

.cozy-theme .purchase-page p {
  font-size: 13px;
}

@media (width >= 901px) and (height >= 720px) {
  .cozy-theme .workspace {
    flex-direction: column;
    display: flex;
    overflow: hidden;
  }

  .cozy-theme .focus-layout {
    flex: 1;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    align-items: stretch;
    gap: 16px;
    min-height: 0;
    padding: 12px;
  }

  .cozy-theme .focus-desk {
    align-self: stretch;
    gap: 12px;
    height: 100%;
    min-height: 0;
  }

  .cozy-theme .timer-sheet {
    flex-shrink: 0;
    padding: 16px 22px 14px;
  }

  .cozy-theme .desk-title {
    font-size: clamp(24px, 2vw, 28px);
  }

  .cozy-theme .desk-subtitle {
    margin-bottom: 8px;
    font-size: 20px;
  }

  .cozy-theme .mode-switch button {
    padding-block: 6px;
    font-size: 15px;
  }

  .cozy-theme .focus-clock {
    margin: 6px 0 8px;
    font-size: clamp(64px, 10dvh, 90px);
    line-height: 1.05;
  }

  .cozy-theme .session-caption {
    margin-bottom: 12px;
  }

  .cozy-theme .timer-actions .start-button {
    padding-block: 10px;
    font-size: 21px;
  }

  .cozy-theme .timer-reward {
    margin-top: 11px;
    font-size: 11px;
  }

  .cozy-theme .task-section {
    flex: 1;
    min-height: 0;
  }

  .cozy-theme .task-section .kitty-heading {
    padding-block: 8px;
    font-size: 21px;
  }

  .cozy-theme .task-list {
    flex: 1;
    min-height: 0;
    max-height: none;
  }

  .cozy-theme .task-details {
    max-height: 64px;
    overflow-y: auto;
  }

  .cozy-theme .task-entry {
    padding-block: 2px;
  }

  .cozy-theme .task-add {
    padding-block: 5px;
  }

  .cozy-theme .companion {
    flex-direction: column;
    height: 100%;
    min-height: 0;
    padding: 14px 16px;
    display: flex;
  }

  .cozy-theme .companion-upper {
    margin-block: 8px;
  }

  .cozy-theme .companion-upper .cat-art-placeholder {
    height: clamp(96px, 14dvh, 125px);
  }

  .cozy-theme .companion-controls {
    flex-direction: column;
    flex: 1;
    gap: 9px;
    min-height: 0;
    display: flex;
  }

  .cozy-theme .companion-tabs {
    flex-shrink: 0;
  }

  .cozy-theme .companion-panel, .cozy-theme .companion-panel:has(.shop-panel) {
    flex: 1;
    height: auto;
    min-height: 0;
    max-height: none;
  }

  .cozy-theme .menu-header {
    padding: 11px 14px 9px;
  }

  .cozy-theme .companion-panel .menu-header .kitty-heading {
    font-size: 20px;
  }

  .cozy-theme .companion-panel .menu-header .kitty-muted {
    font-size: 12px;
  }

  .cozy-theme .menu-list .care-row {
    min-height: 69px;
    padding-block: 10px;
  }

  .cozy-theme .food-list .care-row {
    min-height: 155px;
    padding: 12px;
  }

  .cozy-theme .rename-form {
    flex-shrink: 0;
    margin-block: 5px;
  }
}

@media (width <= 900px) {
  .cozy-theme .footer-main {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 12px 20px;
  }

  .cozy-theme .footer-about {
    grid-column: auto;
  }

  .cozy-theme .footer-privacy {
    grid-area: 1 / 2 / 3;
  }

  .cozy-theme .footer-links {
    grid-column: 1;
    justify-content: flex-start;
    justify-self: start;
  }

  .cozy-theme .footer-links h2 {
    display: none;
  }

  .cozy-theme .footer-credit {
    font-size: 11px;
  }

  .cozy-theme .focus-layout {
    max-width: 680px;
  }
}

@media (width <= 520px) {
  .cozy-theme .companion-upper {
    grid-template-columns: minmax(0, 1fr) 92px;
    gap: 8px;
  }

  .cozy-theme .companion-upper .cat-art-placeholder {
    height: 138px;
    font-size: 11px;
  }

  .cozy-theme .condition-trigger {
    gap: 3px;
    font-size: 11px;
  }

  .cozy-theme .cat-condition .art-preview {
    width: 22px;
    height: 22px;
  }

  .cozy-theme .cat-name h2 {
    font-size: 24px;
  }

  .cozy-theme .shop-items .pal-product, .cozy-theme .food-list .care-row {
    padding: 10px 8px;
  }

  .cozy-theme .shop-items .pal-product > strong, .cozy-theme .food-list .care-label strong {
    font-size: 15px;
  }
}

.cozy-theme .focus-desk {
  align-self: start;
  gap: 16px;
  height: auto;
  min-height: 0;
  max-height: 100%;
  padding-bottom: 3px;
  overflow: visible;
}

.cozy-theme .timer-sheet {
  flex-shrink: 0;
  padding-block: 24px 20px;
}

.cozy-theme .focus-clock {
  margin: 18px 0 16px;
  font-size: clamp(82px, 11dvh, 110px);
  line-height: 1.08;
}

.cozy-theme .timer-progress {
  width: min(82%, 440px);
  margin-inline: auto;
}

.cozy-theme .session-caption {
  margin-bottom: 18px;
  font-size: 12px;
}

.cozy-theme .task-section {
  flex: 0 auto;
  min-height: 0;
  overflow: visible;
}

.cozy-theme .task-header {
  background: linear-gradient(110deg, #ffefc9, #fff6e2);
  border-bottom: 1px dashed #dfb977;
  border-radius: 20px 20px 0 0;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 0 -16px 5px;
  padding: 10px 16px;
  display: flex;
}

.cozy-theme .task-header .kitty-heading {
  box-shadow: none;
  background: none;
  border: 0;
  border-radius: 0;
  flex-wrap: wrap;
  flex: 1;
  align-items: baseline;
  gap: 5px 12px;
  margin: 0;
  padding: 0;
  font-size: 22px;
  line-height: 1.25;
  display: flex;
}

.cozy-theme .task-header .task-details {
  border: 0;
  flex: none;
  max-height: none;
  margin: 0;
  padding: 0;
  font-size: 12px;
  position: relative;
  overflow: visible;
}

.cozy-theme .task-details summary {
  color: var(--accent-ink);
  padding: 5px 0;
}

.task-reward-explanation {
  z-index: 5;
  background: var(--sheet);
  border: 1px solid #d8bd91;
  border-radius: 12px;
  width: min(300px, 100vw - 60px);
  max-height: 220px;
  padding: 13px 15px;
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  overflow-y: auto;
  box-shadow: 0 5px 18px #382b221c;
}

.cozy-theme .task-details .task-reward-explanation p {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
}

.cozy-theme .task-details .task-reward-explanation p + p {
  margin-top: 9px;
}

.task-reward-balance {
  color: var(--ink);
  font-weight: 600;
}

.cozy-theme .task-list {
  flex: 0 240px;
  height: 240px;
  min-height: 48px;
  max-height: 240px;
  overflow-y: auto;
}

.cozy-theme .task-item {
  height: 48px;
  min-height: 48px;
}

.cozy-theme .task-item label {
  height: 48px;
  padding-block: 3px;
}

.cozy-theme .task-item label span {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
  display: -webkit-box;
  overflow: hidden;
}

.task-daily-limit {
  color: var(--accent-ink);
  margin: 5px 0;
  font-size: 12px;
  line-height: 1.5;
}

.cozy-theme .task-empty {
  padding: 14px 0 6px;
  font-size: 14px;
}

.cozy-theme .task-entry {
  padding: 5px 0 2px;
}

.cozy-theme .task-add {
  padding: 8px 0;
  font-size: 16px;
}

.cozy-theme .task-reward-notice {
  padding-top: 5px;
  font-size: 12px;
}

@media (width <= 520px) {
  .cozy-theme .timer-sheet {
    padding-block: 24px 20px;
  }

  .cozy-theme .focus-clock {
    margin-top: 18px;
    font-size: clamp(76px, 22vw, 105px);
  }

  .cozy-theme .task-header {
    gap: 8px;
    padding-inline: 12px;
  }

  .cozy-theme .task-header .kitty-heading {
    font-size: 20px;
  }

  .cozy-theme .task-header .task-details {
    font-size: 11px;
  }
}

.cozy-theme {
  --control-radius: 10px;
  --control-border: #c9a677;
  --panel-border: #dfcdb2;
}

.cozy-theme :is(.kitty-button, .shell-contact, .fact-next, .shop-category, .companion-tabs button) {
  border-radius: var(--control-radius);
  border: 1px solid var(--control-border);
  font-family: var(--display);
  background-image: none;
  font-weight: 500;
  line-height: 1.25;
  box-shadow: 0 2px #d5b88e;
}

.cozy-theme :is(.kitty-button, .shell-contact, .fact-next):not(:disabled):hover {
  background-image: none;
  transform: none;
}

.cozy-theme :is(.kitty-button, .shell-contact, .fact-next):not(:disabled):active {
  transform: translateY(1px);
  box-shadow: 0 1px #d5b88e;
}

.cozy-theme .timer-actions .start-button {
  border-radius: var(--control-radius);
  box-shadow: 0 2px #b88128;
}

.cozy-theme :is(.task-form, .rename-form) {
  border: 1px solid var(--panel-border);
  border-radius: var(--control-radius);
  box-shadow: none;
}

.cozy-theme :is(.companion-panel, .care-row, .break-details, .daily-fact) {
  border-color: var(--panel-border);
}

.cozy-theme .shop-categories {
  background: #f2e9da;
  border-radius: 12px;
  gap: 4px;
  padding: 4px;
}

.cozy-theme .shop-categories .shop-category {
  min-height: 34px;
  box-shadow: none;
  background: none;
  border: 1px solid #0000;
  border-radius: 8px;
  font-size: 14px;
}

.cozy-theme .shop-categories .shop-category[aria-pressed="true"] {
  border-color: var(--control-border);
  background: var(--sheet);
  box-shadow: none;
}

.cozy-theme .companion-tabs button {
  border-radius: var(--control-radius);
  border-color: var(--panel-border);
  box-shadow: 0 1px #dfcdb2;
}

.cozy-theme .companion-tabs button[aria-pressed="true"] {
  border-color: var(--control-border);
  box-shadow: inset 0 -2px 0 var(--honey);
}

.cozy-theme .shop-items .grid, .cozy-theme .shop-items .grid-cols-3, .cozy-theme .food-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: max-content;
  align-content: start;
  align-items: stretch;
  gap: 12px;
  display: grid;
}

.cozy-theme .shop-items .pal-product, .cozy-theme .shop-items .grid-cols-3 .pal-product, .cozy-theme .food-list .care-row {
  border: 1px solid var(--panel-border);
  background: var(--sheet);
  min-width: 0;
  height: auto;
  min-height: 168px;
  box-shadow: none;
  text-align: center;
  background-image: none;
  border-radius: 12px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 14px 12px;
  transition: border-color .15s, background-color .15s;
  display: flex;
}

.cozy-theme .shop-items .pal-product:last-child {
  border-bottom: 1px solid var(--panel-border);
}

.cozy-theme .shop-items button.pal-product:not(:disabled):hover {
  border-color: var(--control-border);
  box-shadow: none;
  background: #fff8e9;
  transform: none;
}

.cozy-theme .shop-items button.pal-product[aria-pressed="true"] {
  box-shadow: inset 0 -3px 0 var(--honey);
  background: #fff4d5;
  border: 1px solid #d0a253;
  border-radius: 12px;
}

.cozy-theme .shop-items .pal-product > .art-preview, .cozy-theme .food-list .care-row > .art-preview {
  flex-shrink: 0;
  align-self: center;
  width: 44px;
  height: 44px;
}

.cozy-theme .shop-items .pal-product > strong {
  width: 100%;
  min-height: 38px;
  font: 500 16px/1.2 var(--display);
  color: var(--ink);
  flex: none;
}

.cozy-theme .food-list .care-label {
  flex-direction: column;
  flex: none;
  gap: 4px;
  width: 100%;
  display: flex;
}

.cozy-theme .food-list .care-label strong {
  min-height: 20px;
  font: 500 16px/1.2 var(--display);
}

.cozy-theme .food-list .care-label small {
  min-height: 18px;
  margin-top: 5px;
  font-size: 12px;
  line-height: 1.5;
}

.cozy-theme .shop-items .pal-product > .kitty-badge {
  width: 100%;
  max-width: none;
  min-height: 26px;
  color: var(--soft-ink);
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  font: 500 13px / 1.4 Plus Jakarta Sans, sans-serif;
  display: flex;
}

.cozy-theme .shop-items .pal-product[aria-pressed="true"] > .kitty-badge {
  color: var(--accent-ink);
}

.cozy-theme .shop-items .pal-product > .unavailable-reason {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.cozy-theme .menu-list .kitty-button:not(.pal-product), .cozy-theme .purchase-actions .kitty-button {
  border: 1px solid var(--control-border);
  border-radius: var(--control-radius);
  background: var(--honey-soft);
  min-height: 38px;
  font: 500 15px/1.25 var(--display);
  padding: 8px 12px;
  box-shadow: 0 2px #d5b88e;
}

.cozy-theme .menu-list .kitty-button.claim-button, .cozy-theme .purchase-actions .claim-button {
  background: var(--honey);
  border-color: #bc8a36;
  box-shadow: 0 2px #bc8a36;
}

.cozy-theme .food-list .care-row > button {
  white-space: normal;
  flex: none;
  width: 100%;
  height: auto;
  min-height: 40px;
  margin-top: auto;
  line-height: 1.4;
}

.cozy-theme .food-list .care-row {
  gap: 10px;
  min-height: 210px;
  padding-bottom: 16px;
}

.cozy-theme .menu-list .kitty-button .art-preview {
  vertical-align: middle;
  flex: 0 0 22px;
  width: 22px;
  min-width: 22px;
  height: 22px;
  margin: 0;
}

.cozy-theme .menu-list .kitty-button:disabled {
  border-color: var(--rule);
  box-shadow: none;
  background: #f1ebe1;
  transform: none;
}

.cozy-theme .shop-items button.pal-product:disabled {
  opacity: .7;
  background: #faf6ef;
}

.task-add-row {
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  display: flex;
}

.task-add-count {
  color: var(--soft-ink);
  white-space: nowrap;
  font-size: 12px;
  line-height: 1.4;
}

@media (width <= 520px) {
  .cozy-theme .shop-items .pal-product, .cozy-theme .shop-items .grid-cols-3 .pal-product, .cozy-theme .food-list .care-row {
    padding: 12px 8px;
  }

  .task-add-count {
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cozy-theme :is(.kitty-button, .shell-contact, .fact-next):active {
    transform: none;
  }
}

.cozy-theme .app-brand {
  align-items: center;
  gap: 9px;
  display: inline-flex;
}

.cozy-theme .app-brand > span {
  line-height: 1.15;
  display: block;
}

.cozy-theme .footer-links {
  text-align: center;
  place-items: center;
}

.sidebar-explanation {
  border: 1px solid var(--rule);
  background: var(--sheet);
  border-radius: 16px;
  min-height: 150px;
  margin-top: 16px;
  overflow: hidden;
}

.sidebar-explanation header {
  background: #fff0d0;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  display: flex;
}

.sidebar-explanation h3 {
  font: 500 21px/1.3 var(--display);
  margin: 0;
}

.sidebar-explanation .menu-help-copy {
  max-height: 260px;
  overflow-y: auto;
}

.explanation-placeholder {
  padding: 16px;
}

.explanation-placeholder p {
  color: var(--soft-ink);
  font-size: 13px;
  line-height: 1.7;
}

.help-indicator {
  background: #fff2d4;
  border: 1px solid #bd9155;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  font: 600 12px / 1 sans-serif;
  display: inline-flex;
}

.menu-help-button {
  gap: 5px;
}

.menu-help-button[aria-pressed="true"] .help-indicator {
  background: var(--honey);
}

.menu-help-button {
  color: #946039;
  cursor: pointer;
  vertical-align: middle;
  background: none;
  border: 0;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  font: 500 13px / 1.4 Plus Jakarta Sans, sans-serif;
  display: inline-flex;
}

.menu-help-button:hover {
  color: var(--ink);
  background: #f5e7cc;
}

.break-rewards > .menu-help-button {
  margin: 0 10px 8px;
}

.menu-help-popup {
  width: min(360px, 100vw - 32px);
  max-height: min(440px, 100dvh - 48px);
  color: var(--ink);
  background: #fffdf6;
  border: 1px solid #d1ab73;
  border-radius: 16px;
  margin: 0;
  padding: 0;
  position: fixed;
  inset: auto 24px 24px auto;
  overflow-y: auto;
  box-shadow: 0 8px 32px #382b2233;
}

.menu-help-popup::backdrop {
  background: none;
}

.menu-help-popup header {
  border-bottom: 1px solid var(--rule);
  background: #fff0d0;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  display: flex;
}

.menu-help-popup h3 {
  font: 500 22px/1.3 var(--display);
  margin: 0;
}

.menu-help-close {
  color: var(--ink);
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0 6px;
  font-size: 25px;
}

.menu-help-copy {
  padding: 8px 16px 16px;
}

.menu-help-copy p {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.7;
}

.timer-dim-overlay {
  z-index: 40;
  opacity: 0;
  pointer-events: none;
  background: #100b09;
  transition: opacity .35s;
  position: fixed;
  inset: 0;
}

.timer-dim-overlay.active {
  opacity: .88;
}

.cozy-theme:has(.timer-dim-overlay.active) .timer-sheet {
  z-index: 41;
  position: relative;
}

.cozy-theme .focus-desk > .timer-sheet {
  padding-block: 30px 26px;
}

.cozy-theme .timer-sheet .focus-clock {
  margin-block: 20px;
  font-size: clamp(94px, 8.2vw, 122px);
}

.cozy-theme .shop-items .closet-product {
  gap: 10px;
  min-height: 210px;
  padding: 14px 12px 16px;
}

.cozy-theme .shop-items .closet-product > strong {
  min-height: 20px;
}

.closet-description {
  color: var(--soft-ink);
  font-size: 12px;
  line-height: 1.5;
}

.cozy-theme .shop-items .closet-product > button {
  flex: none;
  width: 100%;
  min-height: 40px;
  margin-top: auto;
}

@media (prefers-reduced-motion: reduce) {
  .timer-dim-overlay {
    transition: none;
  }
}

.game-guide {
  min-width: 0;
  color: var(--ink);
}

.dashboard-with-guide {
  flex: none;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  gap: 20px;
  display: grid;
}

.guide-container {
  border: 1px solid var(--rule);
  background: var(--sheet);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px #ead7b9;
}

.guide-title {
  cursor: pointer;
  font: 600 22px/1.3 var(--display);
  background: #fff3d9;
  padding: 14px 16px;
}

.guide-title > span {
  float: right;
  color: var(--soft-ink);
  padding-top: 5px;
  font: 500 12px / 1.5 Plus Jakarta Sans, sans-serif;
}

.guide-content {
  padding: 14px;
}

.guide-now {
  background: #fff8e7;
  border: 1px solid #ecd29e;
  border-radius: 12px;
  margin-bottom: 12px;
  padding: 12px;
}

.guide-now > strong {
  font: 500 18px/1.3 var(--display);
}

.guide-content p {
  color: var(--soft-ink);
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.7;
}

.guide-content > details {
  border-bottom: 1px solid var(--rule);
  padding: 12px 2px;
}

.guide-content > details > summary {
  cursor: pointer;
  font: 500 17px/1.4 var(--display);
}

.guide-content .guide-footnote {
  margin-top: 14px;
  font-size: 12px;
}

@media (width >= 1400px) {
  .dashboard-with-guide {
    grid-template-columns: minmax(0, 1fr) 270px;
  }

  .guide-container {
    display: block;
  }

  .guide-container > .guide-title {
    cursor: default;
    list-style: none;
  }

  .guide-content {
    display: block;
  }
}

.header-pocket-money {
  border: 1px solid var(--rule);
  background: var(--sheet);
  border-radius: 12px;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  display: flex;
}

.header-pocket-money > span {
  flex-direction: column;
  gap: 2px;
  display: flex;
}

.header-pocket-money strong {
  font: 500 16px/1.2 var(--display);
}

.header-pocket-money small {
  color: var(--soft-ink);
  font-size: 11px;
}

.header-pocket-money .art-preview {
  width: 30px;
  height: 30px;
}

.cozy-theme .header-pocket-money .claim-button {
  background: var(--honey);
  min-height: 34px;
  padding: 6px 12px;
}

.cozy-theme .header-pocket-money .claim-button:disabled {
  color: var(--soft-ink);
  box-shadow: none;
  background: #f1ebe1;
}

@media (width <= 700px) {
  .cozy-theme .header-inner {
    flex-wrap: wrap;
    gap: 10px;
    padding-block: 10px;
  }

  .cozy-theme .header-actions {
    flex-wrap: wrap;
    gap: 10px;
  }

  .header-pocket-money {
    gap: 7px;
    padding: 5px 8px;
  }
}

.cozy-theme .workspace, .cozy-theme .shell-container {
  width: min(1600px, 100% - 48px);
}

.cozy-theme .workspace {
  flex-direction: column;
  padding-bottom: 10px;
  display: flex;
  overflow-y: auto;
}

.cozy-theme .focus-layout {
  flex: none;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: start;
  gap: 16px;
  padding: 16px;
}

.cozy-theme .focus-desk {
  gap: 14px;
  height: auto;
  max-height: none;
}

.cozy-theme .timer-sheet {
  padding: 18px 24px 14px;
}

.cozy-theme .timer-sheet:after {
  content: none;
}

.cozy-theme .desk-title {
  font-size: 30px;
}

.cozy-theme .desk-subtitle {
  margin: 2px 0 10px;
  font-size: 20px;
}

.cozy-theme .focus-clock {
  margin: 10px 0 12px;
  font-size: clamp(82px, 7.5vw, 110px);
}

.cozy-theme .session-caption {
  margin: 8px 0 14px;
  font-size: 13px;
}

.cozy-theme .timer-actions {
  gap: 16px;
}

.cozy-theme .reset-button {
  background: var(--sheet);
  min-width: 100px;
}

.cozy-theme .timer-reward {
  margin: 12px 0 0;
  font-size: 12px;
}

.cozy-theme .task-section {
  flex: none;
  padding: 0 16px 12px;
}

.cozy-theme .task-header {
  border-bottom: 1px solid var(--rule);
  margin-bottom: 8px;
  padding-block: 9px;
}

.cozy-theme .task-header .kitty-heading {
  justify-content: space-between;
  font-size: 24px;
}

.cozy-theme .task-list {
  flex: none;
  height: 126px;
  min-height: 126px;
  max-height: 126px;
  margin: 0;
  padding: 0 8px 0 0;
}

.cozy-theme .task-item {
  border: 1px solid var(--rule);
  background: #fcf9f3;
  border-radius: 10px;
  height: 38px;
  min-height: 38px;
  margin-bottom: 4px;
  padding: 0 9px;
}

.cozy-theme .task-item label {
  height: 36px;
  min-height: 0;
  font-size: 14px;
}

.cozy-theme .task-entry {
  padding-top: 8px;
}

.cozy-theme .task-form {
  grid-template-columns: minmax(0, 1fr) 40px auto;
  align-items: center;
  gap: 8px;
  margin: 0;
  display: grid;
}

.cozy-theme .task-form input {
  border: 1px solid var(--control-border);
  background: var(--sheet);
  border-radius: 10px;
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 8px 12px;
  font-size: 14px;
}

.cozy-theme .task-form button {
  min-width: 0;
  height: 38px;
  padding: 0;
  font-size: 26px;
}

.cozy-theme .task-add-count {
  white-space: nowrap;
  margin-left: 6px;
  font-size: 12px;
}

.cozy-theme .task-reward-notice:empty {
  display: none;
}

.today-focus, .break-rewards {
  border: 1px solid var(--rule);
  background: var(--sheet);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px #ead7b9;
}

.today-focus h2, .break-rewards h3 {
  font: 600 24px/1.2 var(--display);
  background: linear-gradient(110deg, #fff0d0, #fff8e9);
  margin: 0;
  padding: 9px 16px;
}

.focus-metrics {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 14px 16px;
  display: grid;
}

.focus-metrics > div {
  border-right: 1px solid var(--rule);
  flex-direction: column;
  gap: 3px;
  padding-inline: 16px;
  display: flex;
}

.focus-metrics > div:first-child {
  padding-left: 0;
}

.focus-metrics > div:last-child {
  border: 0;
}

.focus-metrics strong {
  font: 600 25px/1.1 var(--display);
}

.focus-metrics span {
  color: var(--soft-ink);
  font-size: 13px;
}

.daily-goal {
  border-top: 1px solid var(--rule);
  align-items: center;
  gap: 16px;
  margin: 0 16px;
  padding: 12px 0;
  font-size: 13px;
  display: flex;
}

.goal-segments {
  flex: 1;
  gap: 5px;
  display: flex;
}

.goal-segments span {
  background: #efe1c8;
  border-radius: 10px;
  flex: 1;
  height: 10px;
}

.goal-segments .filled {
  background: var(--honey);
}

.cozy-theme .companion {
  flex-direction: column;
  height: auto;
  min-height: 0;
  padding: 14px 16px 16px;
  display: flex;
}

.cozy-theme .companion-upper {
  grid-template-columns: minmax(0, 1fr) 132px;
  margin: 12px 0 16px;
}

.cozy-theme .companion-upper .companion-room {
  max-width: none;
}

.cozy-theme .companion-upper .cat-art-placeholder {
  height: 276px;
  padding-bottom: 48px;
}

.cozy-theme .condition-trigger {
  gap: 7px;
  min-height: 44px;
  font-size: 13px;
}

.cozy-theme .companion-coins {
  max-width: none;
}

.cozy-theme .companion-controls {
  flex-direction: column;
  flex: none;
  gap: 14px;
  display: flex;
}

.cozy-theme .companion-panel, .cozy-theme .companion-panel:has(.shop-panel) {
  flex: none;
  height: 300px;
  min-height: 180px;
  max-height: 300px;
}

.cozy-theme .menu-header {
  padding: 10px 16px;
}

.cozy-theme .companion-panel .menu-header .kitty-heading {
  margin-bottom: 3px;
  font-size: 23px;
}

.cozy-theme .companion-panel .menu-header .kitty-muted {
  font-size: 13px;
}

.cozy-theme .care-page .menu-list {
  padding-bottom: 0;
}

.cozy-theme .care-page .care-row {
  grid-template-columns: 44px minmax(0, 1fr) auto;
  min-height: 73px;
  padding: 10px 0;
}

.cozy-theme .care-page .care-row:last-child {
  border-bottom: 0;
}

.cozy-theme .care-page .care-row > .art-preview {
  width: 42px;
  height: 42px;
}

.break-rewards {
  flex: none;
}

.break-reward-row {
  grid-template-columns: 30px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  display: grid;
}

.break-reward-row + .break-reward-row {
  border-top: 1px solid var(--rule);
}

.break-reward-label {
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
  font-size: 13px;
  display: flex;
}

.break-reward-label strong {
  font: 500 16px/1.2 var(--display);
}

.break-reward-row progress {
  appearance: none;
  background: #efe1c8;
  border: 0;
  border-radius: 8px;
  width: 100%;
  height: 8px;
  overflow: hidden;
}

.break-reward-row progress::-webkit-progress-bar {
  background: #efe1c8;
}

.break-reward-row progress::-webkit-progress-value {
  background: var(--honey);
  border-radius: 8px;
}

.break-reward-row progress::-moz-progress-bar {
  background: var(--honey);
}

.reward-help {
  color: var(--soft-ink);
  padding: 0 16px 9px;
  font-size: 12px;
}

.reward-help p {
  line-height: 1.5;
}

@media (width >= 1100px) and (height >= 900px) {
  .cozy-theme .timer-sheet {
    padding-block: 24px 20px;
  }

  .cozy-theme .focus-clock {
    margin-block: 18px;
  }
}

@media (width <= 900px) {
  .cozy-theme .focus-layout {
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
    max-width: 680px;
    margin-inline: auto;
  }

  .cozy-theme .workspace, .cozy-theme .shell-container {
    width: calc(100% - 24px);
  }
}

@media (width <= 520px) {
  .cozy-theme .focus-layout {
    padding: 10px;
  }

  .cozy-theme .timer-sheet {
    padding-inline: 12px;
  }

  .cozy-theme .desk-title {
    font-size: 25px;
  }

  .cozy-theme .companion {
    padding-inline: 10px;
  }

  .cozy-theme .companion-upper {
    grid-template-columns: minmax(0, 1fr) 100px;
    gap: 8px;
  }

  .cozy-theme .condition-trigger {
    font-size: 11px;
  }

  .cozy-theme .task-form {
    grid-template-columns: minmax(0, 1fr) 38px;
  }

  .cozy-theme .task-add-count {
    grid-column: 1 / -1;
    margin-left: 0;
  }

  .daily-goal {
    flex-wrap: wrap;
  }

  .goal-segments {
    min-width: 80px;
  }

  .focus-metrics > div {
    padding-inline: 10px;
  }

  .focus-metrics strong {
    font-size: 22px;
  }

  .cozy-theme .care-page .care-row {
    grid-template-columns: 34px minmax(0, 1fr);
  }

  .cozy-theme .care-page .care-row > .art-preview {
    width: 32px;
    height: 32px;
  }
}

.cozy-theme :is(.timer-sheet, .task-section, .companion, .today-focus) {
  border-color: #dec8a9;
}

.cozy-theme :is(.companion-panel, .sidebar-explanation, .guide-container, .break-rewards) {
  border-color: #e8dbc7;
  box-shadow: 0 1px #ead7b955;
}

.cozy-theme .menu-header {
  background: #fcf8f0;
  border-bottom-color: #eee4d5;
}

.cozy-theme .menu-list .care-row {
  border-bottom-color: #eee4d5;
}

.cozy-theme .shop-items .pal-product, .cozy-theme .shop-items .grid-cols-3 .pal-product, .cozy-theme .food-list .care-row {
  background: var(--sheet);
  height: auto;
  min-height: 220px;
  box-shadow: none;
  border: 1px solid #e8dbc7;
  border-radius: 12px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 12px;
  display: flex;
}

.cozy-theme .shop-items .pal-product > strong, .cozy-theme .food-list .care-label strong {
  font: 500 16px/1.3 var(--display);
  min-height: 21px;
}

.cozy-theme .food-list .care-label {
  gap: 5px;
}

.cozy-theme .food-list .care-label small {
  margin: 0;
}

.cozy-theme .shop-items .pal-product > .art-preview, .cozy-theme .food-list .care-row > .art-preview {
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
}

.cozy-theme .product-state {
  color: #8b633c;
  text-align: center;
  width: 100%;
  min-height: 20px;
  margin-top: auto;
  font: 400 12px / 1.5 Plus Jakarta Sans, sans-serif;
}

.cozy-theme .shop-items .pal-product > button, .cozy-theme .food-list .care-row > button {
  flex: none;
  width: 100%;
  min-height: 40px;
  margin-top: 0;
}

.cozy-theme .shop-items .pal-product > button > .art-preview {
  width: 22px;
  height: 22px;
}

.current-task-caption {
  max-width: 90%;
  min-height: 20px;
  color: var(--soft-ink);
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: -8px auto 12px;
  font-size: 13px;
  line-height: 1.5;
  overflow: hidden;
}

.cozy-theme .task-item.current-task {
  background: #fff2d2;
  border-color: #d8b36d;
}

.cozy-theme .task-item label {
  flex: 1;
  min-width: 0;
}

.task-select {
  color: var(--soft-ink);
  cursor: pointer;
  font: 500 12px/1.4 var(--display);
  background: #fffaf0;
  border: 1px solid #e3d3b8;
  border-radius: 7px;
  flex: none;
  padding: 3px 7px;
}

.task-select[aria-pressed="true"] {
  color: var(--ink);
  background: #ffd781;
  border-color: #d1a34e;
}

.task-select:disabled {
  opacity: .45;
  cursor: default;
}

.cozy-theme .task-delete {
  flex: none;
  position: static;
}

.daily-goal {
  flex-wrap: wrap;
  gap: 10px;
}

.goal-picker {
  margin-left: auto;
}

.goal-picker select {
  color: var(--ink);
  background: #fffaf0;
  border: 1px solid #e0ceb0;
  border-radius: 8px;
  padding: 5px 7px;
  font: 500 12px / 1.4 Plus Jakarta Sans, sans-serif;
}

.goal-segments {
  flex: 1 0 100%;
}

.cozy-theme .condition-trigger .help-indicator {
  opacity: .7;
  flex: 0 0 14px;
  width: 14px;
  height: 14px;
  font-size: 10px;
}

.cozy-theme .condition-trigger {
  cursor: pointer;
  gap: 4px;
}

.cozy-theme .condition-trigger[aria-pressed="true"] {
  background: #fff2d2;
}

.session-history {
  background: var(--sheet);
  border: 1px solid #e8dbc7;
  border-radius: 16px;
  margin-top: 16px;
  overflow: hidden;
}

.session-history header {
  border-bottom: 1px solid #eee4d5;
  padding: 12px 14px;
}

.session-history h3 {
  font: 500 21px/1.3 var(--display);
  margin: 0 0 4px;
}

.session-history header > span {
  color: var(--soft-ink);
  font-size: 12px;
}

.history-empty {
  color: var(--soft-ink);
  padding: 0 14px;
  font-size: 13px;
  line-height: 1.7;
}

.history-list {
  scrollbar-width: thin;
  max-height: 190px;
  margin: 0;
  padding: 4px 14px;
  list-style: none;
  overflow-y: auto;
}

.history-list li {
  border-bottom: 1px solid #eee4d5;
  align-items: center;
  gap: 9px;
  padding: 10px 0;
  display: flex;
}

.history-list li:last-child {
  border-bottom: 0;
}

.history-dot {
  background: #d99d30;
  border-radius: 50%;
  flex-shrink: 0;
  width: 8px;
  height: 8px;
}

.history-dot.short, .history-dot.long {
  background: #a3ad7a;
}

.history-list li > div {
  flex-direction: column;
  flex: 1;
  gap: 3px;
  display: flex;
}

.history-list strong {
  font: 500 15px/1.3 var(--display);
}

.history-list small, .history-list time {
  color: var(--soft-ink);
  font-size: 11px;
}
`;
