/** Shared responsive styles for the Kitty UnoCSS preset. */
export default String.raw`
.coat-filter select {
  border: 1px solid var(--edge);
  background: var(--surface-raised);
  max-width: 135px;
  min-height: 32px;
  color: var(--ink);
  border-radius: 8px;
  padding: 5px 7px;
  font: 500 12px / 1.4 Plus Jakarta Sans, sans-serif;
}

.cozy-theme .coat-swatch {
  border-radius: 10px;
  box-shadow: inset 0 0 0 2px #ffffff45;
}

.cozy-theme {
  --surface-tint: #fcf7ed;
  --surface-raised: #fffaf0;
  --edge: #e4d2b7;
  --edge-strong: #c9a677;
  --chrome: #fff2d8;
  --selected: #fff0c8;
  --button-ink: #382b22;
  --disabled: #f0e9de;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  line-height: 1.6;
}

.cozy-theme :is(h1, h2, h3, .app-brand) {
  letter-spacing: -.018em;
  text-wrap: balance;
}

.cozy-theme :is(.desk-title, .cat-name h2) {
  font-weight: 600;
}

.cozy-theme :is(.menu-header .kitty-heading, .task-header .kitty-heading, .today-focus h2, .break-rewards h3) {
  letter-spacing: -.012em;
  font-weight: 500;
}

.cozy-theme .menu-header {
  background: var(--surface-tint);
  border-bottom: 1px solid var(--edge);
  max-height: none;
  padding: 12px 16px;
}

.cozy-theme .menu-header .kitty-muted {
  font-size: 13px;
  line-height: 1.6;
}

.cozy-theme .menu-toolbar {
  border-bottom: 1px solid var(--edge);
  background: var(--sheet);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  display: flex;
}

.cozy-theme .shop-categories {
  background: var(--surface-tint);
  border: 1px solid var(--edge);
  border-radius: 10px;
  margin: 0;
  padding: 3px;
}

.cozy-theme .shop-categories .shop-category {
  border-radius: 7px;
  min-height: 31px;
  padding: 5px 10px;
  font-size: 14px;
}

.cozy-theme .shop-categories .shop-category[aria-pressed="true"] {
  background: var(--selected);
  border-color: var(--edge-strong);
  color: var(--ink);
}

.cozy-theme .collection-remove {
  min-height: 32px;
  padding: 5px 9px;
  font-size: 13px;
}

.cozy-theme .shop-items .product-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: max-content;
  gap: 12px;
  padding-top: 8px;
  display: grid;
}

.cozy-theme .shop-items .pal-product, .cozy-theme .food-list .care-row {
  border-color: var(--edge);
  min-height: 220px;
  padding: 14px 12px;
}

.cozy-theme :is(.closet-description, .product-state) {
  font-size: 12px;
  line-height: 1.5;
}

.cozy-theme .product-state {
  color: var(--accent-ink);
}

.cozy-theme .shop-items .pal-product > button, .cozy-theme .food-list .care-row > button {
  border-radius: 9px;
  min-height: 40px;
  font-size: 15px;
}

.theme-toggle {
  white-space: nowrap;
  background: var(--surface-raised);
  color: var(--ink);
  justify-content: center;
  align-items: center;
  gap: 7px;
  min-height: 38px;
  font-size: 14px;
  display: inline-flex;
}

.theme-toggle > span {
  font-size: 20px;
  line-height: 1;
}

.cozy-theme .header-actions {
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

[data-theme="night"] .cozy-theme :is(.footer-main, .footer-links a, .fact-text, .task-count, .task-add-count, .task-empty, .task-done) {
  color: var(--soft-ink);
}

[data-theme="night"] .cozy-theme :is(.fact-art-placeholder, .task-details, .kitty-note) {
  background: var(--surface-tint);
  color: var(--soft-ink);
  border-color: var(--edge);
}

[data-theme="night"] .cozy-theme .task-details {
  background: none;
}

[data-theme="night"] .cozy-theme .fact-text {
  border-color: var(--edge);
}

html[data-theme="night"] {
  color-scheme: dark;
  --paper: #201c1b;
  --sheet: #302927;
  --ink: #f3e4ce;
  --soft-ink: #c7b59e;
  --rule: #53453c;
  --honey: #e8b45e;
  --honey-hover: #f1c779;
  --honey-soft: #51402a;
  --accent-ink: #ebbb86;
  --focus: #f1c779;
}

[data-theme="night"] .cozy-theme {
  --surface-tint: #382e29;
  --surface-raised: #3b3029;
  --edge: #514238;
  --edge-strong: #977448;
  --chrome: #403125;
  --selected: #544029;
  --disabled: #3a332f;
  --frame: #705536;
  --frame-dark: #9c7649;
  --stitch: #5b4734;
  --highlight: #6a51392b;
  --recess: #382d25;
}

[data-theme="night"] .cozy-theme :is(.app-header, .app-footer) {
  background: var(--paper);
  border-color: var(--edge);
}

[data-theme="night"] .cozy-theme .focus-layout {
  background: #28221e;
  border-color: #80613e;
  box-shadow: inset 0 0 0 2px #30271f, inset 0 0 0 4px #54402c, 0 4px 18px #0002;
}

[data-theme="night"] .cozy-theme :is(.timer-sheet, .task-section, .companion, .today-focus, .break-rewards, .guide-container, .sidebar-explanation, .session-history, .companion-panel) {
  background: var(--sheet);
  border-color: var(--edge);
  box-shadow: 0 2px #140f0d55;
}

[data-theme="night"] .cozy-theme :is(.task-header, .today-focus h2, .break-rewards h3, .guide-title, .sidebar-explanation header) {
  background: var(--chrome);
  border-color: var(--edge);
}

[data-theme="night"] .cozy-theme :is(.daily-fact, .header-pocket-money, .task-reward-explanation, .guide-now, .goal-picker select, .task-form input, .rename-form input) {
  background: var(--surface-tint);
  border-color: var(--edge);
  color: var(--ink);
  box-shadow: none;
}

[data-theme="night"] .cozy-theme :is(.kitty-button, .fact-next, .shell-contact, .companion-tabs button) {
  background: var(--surface-raised);
  border-color: var(--edge-strong);
  color: var(--ink);
  box-shadow: 0 2px #17120f;
}

[data-theme="night"] .cozy-theme :is(.kitty-primary, .claim-button, .fact-next):not(:disabled) {
  background: var(--honey);
  color: var(--button-ink);
  border-color: #c18f42;
}

[data-theme="night"] .cozy-theme :is(.kitty-button, .claim-button):disabled {
  background: var(--disabled);
  border-color: var(--edge);
  color: #b3a18b;
  box-shadow: none;
}

[data-theme="night"] .cozy-theme .companion-tabs button[aria-pressed="true"] {
  background: var(--selected);
  border-color: var(--edge-strong);
  box-shadow: inset 0 -2px 0 var(--honey);
}

[data-theme="night"] .cozy-theme :is(.task-item, .task-select, .help-indicator) {
  background: var(--surface-tint);
  border-color: var(--edge);
  color: var(--ink);
}

[data-theme="night"] .cozy-theme :is(.task-item.current-task, .task-select[aria-pressed="true"], .condition-trigger[aria-pressed="true"]) {
  background: var(--selected);
  border-color: var(--edge-strong);
}

[data-theme="night"] .cozy-theme :is(.shop-items .pal-product, .food-list .care-row) {
  background: var(--sheet);
  border-color: var(--edge);
}

[data-theme="night"] .cozy-theme :is(.care-row, .session-history header, .history-list li, .focus-metrics > div, .daily-goal, .guide-content > details) {
  border-color: var(--edge);
}

[data-theme="night"] .cozy-theme :is(.goal-segments span, .break-reward-row progress) {
  background: #504333;
}

[data-theme="night"] .cozy-theme .goal-segments .filled {
  background: var(--honey);
}

[data-theme="night"] .cozy-theme :is(.timer-progress, .break-reward-row progress)::-webkit-progress-bar {
  background: #504333;
}

[data-theme="night"] .cozy-theme .companion-panel > .purchase-page {
  background: #302927b8;
}

[data-theme="night"] .cozy-theme .purchase-feedback:not(:empty) {
  background: var(--surface-raised);
  border-color: var(--edge-strong);
}

[data-theme="night"] .cozy-theme :is(.menu-help-button, .quiet-button, .task-details summary) {
  color: var(--accent-ink);
}

[data-theme="night"] .cozy-theme :is(.menu-help-button, .condition-trigger):hover {
  background: #e8b45e12;
}

[data-theme="night"] .cozy-theme .companion-upper .companion-room {
  --paper: #f7f3eb;
  --sheet: #fffef9;
  --ink: #382b22;
  --soft-ink: #78675a;
  --rule: #e6d7c1;
  --highlight: #fffdf5;
  color: #382b22;
  color-scheme: light;
  background: #fffef9;
  border-color: #e6d7c1;
  box-shadow: inset 0 0 0 3px #fffef9, 0 2px #ead7b9;
}

[data-theme="night"] .cozy-theme .companion-room .cat-art-placeholder {
  color: #78675a;
  background: #f5efe4;
}

[data-theme="night"] .cozy-theme .companion-room .cat-status {
  color: #78675a;
  border-color: #e6d7c1;
}

[data-theme="night"] .cozy-theme .menu-list .icon-tile {
  background: #f8efdf;
  border-color: #b79870;
}

[data-theme="night"] .cozy-theme :is(.companion-tabs, .cat-condition, .header-pocket-money, .coin-balance, .kitty-button) .art-preview:not(.coat-swatch) {
  background: #f8efdf;
  border-radius: 6px;
}

@media (width <= 520px) {
  .cozy-theme .menu-toolbar {
    flex-wrap: wrap;
  }

  .theme-toggle {
    padding-inline: 9px;
    font-size: 13px;
  }
}

.accessory-progress {
  color: var(--soft-ink);
  font-size: 11px;
  line-height: 1.5;
}

.cozy-theme .menu-toolbar {
  flex-wrap: wrap;
}

.guide-container::details-content {
  content-visibility: hidden;
}

.guide-container[open]::details-content {
  content-visibility: visible;
}

.guide-container > .guide-title {
  cursor: pointer;
}

.cozy-theme .guide-content {
  padding: 10px 12px;
}

.guide-content > details {
  padding-block: 8px;
}

.guide-content p {
  font-size: 12px;
  line-height: 1.65;
}

.guide-now {
  margin-bottom: 8px;
  padding: 9px 11px;
}

.guide-content .guide-footnote {
  font-size: 11px;
}

.cozy-theme .earned-note {
  margin: 0;
  font-size: 11px;
  position: absolute;
  bottom: 2px;
  right: 12px;
}

@media (width >= 1200px) and (height >= 740px) {
  .cozy-theme .workspace {
    padding-block: 6px 10px;
    overflow: hidden;
  }

  .cozy-theme .daily-fact-section {
    flex: none;
    margin-bottom: 8px;
  }

  .cozy-theme .daily-fact {
    min-height: 38px;
    padding-block: 3px;
  }

  .cozy-theme .fact-art-placeholder {
    width: 32px;
    height: 26px;
  }

  .dashboard-with-guide {
    flex: 1;
    grid-template-columns: minmax(0, 1fr) 250px;
    align-items: stretch;
    gap: 16px;
    min-height: 0;
  }

  .cozy-theme .focus-layout {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: stretch;
    gap: 14px;
    height: 100%;
    min-height: 0;
    padding: 12px;
  }

  .cozy-theme .focus-desk {
    gap: 10px;
    height: 100%;
    min-height: 0;
    max-height: none;
  }

  .cozy-theme .focus-desk > .timer-sheet {
    flex-direction: column;
    flex: 1;
    justify-content: center;
    min-height: 0;
    padding: 12px 16px;
    display: flex;
  }

  .cozy-theme .desk-title {
    margin: 0;
    font-size: clamp(23px, 2vw, 29px);
    line-height: 1.1;
  }

  .cozy-theme .desk-subtitle {
    margin: 2px 0 6px;
    font-size: 18px;
    line-height: 1.2;
  }

  .cozy-theme .mode-switch {
    margin: 0 auto;
  }

  .cozy-theme .mode-switch button {
    padding-block: 4px;
    font-size: 14px;
  }

  .cozy-theme .timer-sheet .focus-clock {
    margin: 10px 0;
    font-size: clamp(64px, 100dvh - 720px, 106px);
    line-height: 1;
  }

  .current-task-caption {
    min-height: 16px;
    margin: 0 auto 7px;
    font-size: 12px;
    line-height: 1.3;
  }

  .cozy-theme .timer-progress {
    height: 7px;
  }

  .cozy-theme .session-caption {
    margin: 6px 0 9px;
    font-size: 11px;
    line-height: 1.4;
  }

  .cozy-theme .timer-actions {
    gap: 10px;
  }

  .cozy-theme .timer-actions .start-button {
    min-height: 38px;
    padding: 8px 14px;
    font-size: 18px;
  }

  .cozy-theme .timer-actions .reset-button {
    min-width: 72px;
    min-height: 36px;
    padding: 6px 10px;
    font-size: 15px;
  }

  .cozy-theme .timer-reward {
    margin-top: 7px;
    font-size: 11px;
    line-height: 1.4;
  }

  .cozy-theme .task-section {
    flex: none;
    padding: 0 12px 8px;
  }

  .cozy-theme .task-header {
    margin: 0 -12px 5px;
    padding: 7px 12px;
  }

  .cozy-theme .task-header .kitty-heading {
    padding: 0;
    font-size: 20px;
  }

  .cozy-theme .task-header .task-details {
    font-size: 11px;
  }

  .cozy-theme .task-list {
    height: clamp(64px, 100dvh - 760px, 114px);
    min-height: 0;
    max-height: 114px;
  }

  .cozy-theme .task-item, .cozy-theme .task-item label {
    height: 32px;
    min-height: 32px;
  }

  .cozy-theme .task-item {
    margin-bottom: 3px;
  }

  .cozy-theme .task-item label {
    font-size: 12px;
  }

  .cozy-theme .task-form {
    grid-template-columns: minmax(0, 1fr) 34px;
  }

  .cozy-theme .task-form input, .cozy-theme .task-form button {
    height: 32px;
    min-height: 32px;
  }

  .cozy-theme .task-add-count {
    grid-column: 1 / -1;
    margin: 0;
    font-size: 10px;
    line-height: 1.2;
  }

  .cozy-theme .task-form {
    gap: 3px 7px;
  }

  .cozy-theme .task-reward-notice:not(:empty), .task-daily-limit {
    margin: 3px 0 0;
    font-size: 10px;
    line-height: 1.3;
  }

  .today-focus {
    flex: none;
  }

  .today-focus h2 {
    padding: 7px 12px;
    font-size: 20px;
  }

  .focus-metrics {
    padding: 8px 12px;
  }

  .focus-metrics strong {
    font-size: 22px;
  }

  .focus-metrics span {
    font-size: 11px;
  }

  .daily-goal {
    gap: 5px;
    margin-inline: 12px;
    padding: 6px 0 9px;
    font-size: 11px;
  }

  .goal-picker select {
    padding: 3px 5px;
    font-size: 11px;
  }

  .goal-segments span {
    height: 7px;
  }

  .cozy-theme .companion {
    height: 100%;
    min-height: 0;
    padding: 10px 12px;
  }

  .cozy-theme .companion-upper {
    grid-template-columns: minmax(0, 1fr) 105px;
    gap: 8px;
    margin: 7px 0 10px;
  }

  .cozy-theme .condition-trigger {
    min-height: 28px;
    padding-block: 2px;
  }

  .cozy-theme .shop-header > .kitty-muted {
    display: none;
  }

  .cozy-theme .shop-header {
    padding: 6px 10px;
  }

  .cozy-theme .companion-panel .shop-header .kitty-heading {
    align-items: center;
    gap: 5px;
    margin: 0;
    font-size: 18px;
    line-height: 1.1;
    display: flex;
  }

  .cozy-theme .menu-toolbar .shop-categories {
    border: 0;
    padding: 0;
  }

  .cozy-theme .accessory-progress .menu-help-button {
    padding: 0 3px;
  }

  .cozy-theme .menu-toolbar {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 4px;
    padding: 5px 8px;
    display: grid;
  }

  .cozy-theme .menu-toolbar .shop-categories {
    grid-area: 1 / 1;
    justify-self: start;
  }

  .cozy-theme .menu-toolbar .collection-remove, .cozy-theme .menu-toolbar .coat-filter {
    grid-area: 1 / 2;
  }

  .cozy-theme .menu-toolbar .accessory-progress {
    grid-area: 2 / 1 / auto / -1;
    font-size: 10px;
    line-height: 1.2;
  }

  .cozy-theme .collection-remove {
    min-height: 28px;
    padding: 4px 6px;
    font-size: 11px;
  }

  .cozy-theme .shop-categories .shop-category {
    min-height: 27px;
    padding: 4px 7px;
    font-size: 12px;
  }

  .cozy-theme .companion-upper .cat-art-placeholder {
    height: clamp(130px, 100dvh - 660px, 276px);
  }

  .cozy-theme .condition-trigger {
    font-size: 11px;
  }

  .cozy-theme .condition-trigger .art-preview {
    width: 21px;
    height: 21px;
  }

  .cozy-theme .companion-controls {
    flex: 1;
    gap: 10px;
    min-height: 0;
  }

  .cozy-theme .companion-tabs button {
    height: 36px;
    min-height: 36px;
    padding: 4px;
    font-size: 14px;
  }

  .cozy-theme .companion-panel, .cozy-theme .companion-panel:has(.shop-panel) {
    flex: 1;
    height: auto;
    min-height: 100px;
    max-height: none;
  }

  .cozy-theme .menu-header {
    padding: 8px 12px;
  }

  .cozy-theme .companion-panel .menu-header .kitty-heading {
    font-size: 20px;
  }

  .cozy-theme .companion-panel .menu-header .kitty-muted {
    font-size: 11px;
  }

  .cozy-theme .care-page .care-row {
    min-height: 65px;
    padding-block: 8px;
  }

  .break-rewards h3 {
    padding: 7px 12px;
    font-size: 20px;
  }

  .break-reward-row {
    padding: 7px 12px;
  }

  .break-reward-label {
    margin-bottom: 4px;
    font-size: 11px;
  }

  .break-reward-label strong {
    font-size: 14px;
  }

  .break-rewards > .menu-help-button {
    margin-bottom: 4px;
    padding-block: 1px;
    font-size: 11px;
  }

  .game-guide {
    grid-template-rows: minmax(100px, 1fr) 150px 155px;
    gap: 12px;
    min-height: 0;
    display: grid;
  }

  .game-guide > section, .game-guide > details {
    min-height: 0;
    margin: 0;
    overflow-y: auto;
  }

  .game-guide > .sidebar-explanation, .game-guide > .session-history {
    flex-direction: column;
    display: flex;
    overflow: hidden;
  }

  .sidebar-explanation header, .session-history header {
    flex: none;
  }

  .sidebar-explanation .menu-help-copy, .session-history .history-list {
    flex: 1;
    min-height: 0;
    max-height: none;
    overflow-y: auto;
  }

  .guide-title {
    padding: 10px 12px;
    font-size: 21px;
  }

  .guide-container > .guide-title {
    cursor: pointer;
  }

  .sidebar-explanation header {
    padding: 9px 12px;
  }

  .sidebar-explanation h3 {
    font-size: 19px;
  }

  .explanation-placeholder {
    padding: 12px;
  }

  .session-history header {
    padding: 9px 12px;
  }

  .session-history h3 {
    font-size: 19px;
  }

  .history-list {
    max-height: 95px;
  }
}

@media (width >= 1200px) and (height >= 740px) and (height <= 900px) {
  .cozy-theme .focus-layout {
    gap: 10px;
    padding: 9px;
  }

  .cozy-theme .focus-desk {
    gap: 7px;
  }

  .cozy-theme .focus-desk > .timer-sheet {
    flex: 1;
    min-height: 245px;
    padding: 8px 12px;
  }

  .cozy-theme .desk-title {
    font-size: 23px;
  }

  .cozy-theme .desk-subtitle {
    display: none;
  }

  .cozy-theme .timer-sheet .focus-clock {
    margin-block: 5px;
    font-size: 64px;
  }

  .cozy-theme .mode-switch button {
    padding-block: 3px;
    font-size: 12px;
  }

  .cozy-theme .session-caption {
    margin-block: 3px 5px;
  }

  .cozy-theme .timer-reward {
    margin-top: 5px;
    font-size: 10px;
  }

  .cozy-theme .timer-actions .start-button {
    min-height: 32px;
    padding: 5px 10px;
    font-size: 16px;
  }

  .cozy-theme .timer-actions .reset-button {
    min-height: 32px;
    font-size: 13px;
  }

  .cozy-theme .task-section {
    padding-bottom: 5px;
  }

  .cozy-theme .task-header {
    margin-bottom: 3px;
    padding-block: 4px;
  }

  .cozy-theme .task-header .kitty-heading {
    font-size: 18px;
  }

  .cozy-theme .task-list {
    height: 36px;
    max-height: 36px;
  }

  .cozy-theme .task-entry {
    padding: 3px 0 0;
  }

  .cozy-theme .task-form input, .cozy-theme .task-form button {
    height: 28px;
    min-height: 28px;
  }

  .cozy-theme .task-form input {
    padding-block: 4px;
    font-size: 12px;
  }

  .cozy-theme .task-form {
    border: 0;
  }

  .cozy-theme .task-daily-limit, .today-focus h2 {
    display: none;
  }

  .focus-metrics {
    padding: 6px 10px;
  }

  .focus-metrics strong {
    font-size: 18px;
    line-height: 1;
  }

  .focus-metrics span {
    font-size: 10px;
    line-height: 1.2;
  }

  .focus-metrics > div {
    gap: 2px;
  }

  .daily-goal {
    gap: 3px;
    margin-inline: 10px;
    padding: 5px 0 6px;
    line-height: 1.2;
  }

  .goal-picker select {
    padding-block: 2px;
    font-size: 10px;
  }

  .goal-segments span {
    height: 5px;
  }

  .cozy-theme .companion {
    padding: 8px 10px;
  }

  .cozy-theme .companion-topline {
    min-height: 26px;
  }

  .cozy-theme .cat-name h2 {
    font-size: 23px;
  }

  .cozy-theme .companion-upper {
    margin-block: 4px 6px;
  }

  .cozy-theme .companion-upper .cat-art-placeholder {
    height: 90px;
    font-size: 10px;
  }

  .cozy-theme .companion-controls {
    gap: 7px;
  }

  .cozy-theme .companion-tabs button {
    height: 31px;
    min-height: 31px;
    font-size: 12px;
  }

  .cozy-theme .companion-tabs .art-preview {
    width: 18px;
    height: 18px;
  }

  .cozy-theme .companion-panel, .cozy-theme .companion-panel:has(.shop-panel) {
    min-height: 110px;
  }

  .break-rewards h3 {
    padding: 4px 10px;
    font-size: 17px;
  }

  .break-rewards {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    display: grid;
  }

  .break-rewards h3 {
    grid-column: 1 / -1;
  }

  .break-rewards > .menu-help-button {
    grid-column: 1 / -1;
    justify-self: start;
  }

  .break-reward-row + .break-reward-row {
    border-top: 0;
    border-left: 1px solid var(--rule);
  }

  .cozy-theme .companion-panel > .purchase-page {
    justify-content: flex-start;
    padding-block: 12px;
    overflow-y: auto;
  }

  .cozy-theme .purchase-page > * {
    flex-shrink: 0;
  }

  .break-reward-row {
    grid-template-columns: 18px minmax(0, 1fr);
    gap: 7px;
    padding: 4px 10px;
  }

  .break-reward-row > .art-preview {
    width: 18px;
    height: 18px;
  }

  .break-reward-label {
    margin-bottom: 2px;
    font-size: 10px;
    line-height: 1.2;
  }

  .break-reward-label strong {
    font-size: 12px;
  }

  .break-reward-row progress {
    height: 5px;
  }

  .game-guide {
    grid-template-rows: minmax(80px, 1fr) 130px 120px;
    gap: 8px;
  }

  .history-list {
    max-height: 63px;
  }
}

@media (width <= 1199px) {
  .app-shell {
    display: block;
    overflow: hidden auto;
  }

  .app-shell #main-content {
    flex: none;
    overflow: visible;
  }

  .cozy-theme .workspace {
    padding-bottom: 18px;
    display: block;
    overflow: visible;
  }

  .dashboard-with-guide {
    grid-template-columns: minmax(0, 1fr);
    display: grid;
  }

  .game-guide {
    width: 100%;
    max-width: 680px;
    margin-inline: auto;
  }

  .guide-container > .guide-title {
    cursor: pointer;
    list-style: revert;
  }

  .cozy-theme .focus-layout {
    height: auto;
  }
}

@media (width <= 700px) {
  .cozy-theme .header-inner {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px;
    padding-block: 10px;
    display: grid;
  }

  .cozy-theme .header-actions {
    display: contents;
  }

  .cozy-theme .header-inner .app-brand {
    white-space: nowrap;
    grid-area: 1 / 1;
    font-size: 21px;
  }

  .cozy-theme .theme-toggle {
    grid-area: 1 / 2;
    min-height: 32px;
    padding: 5px 8px;
    font-size: 12px;
  }

  .cozy-theme .header-pocket-money {
    grid-area: 2 / 1;
    justify-self: start;
    gap: 6px;
    min-width: 0;
    padding: 4px 6px;
  }

  .header-pocket-money strong {
    font-size: 13px;
  }

  .header-pocket-money small {
    display: none;
  }

  .header-pocket-money .art-preview {
    width: 22px;
    height: 22px;
  }

  .cozy-theme .header-pocket-money .claim-button {
    min-height: 28px;
    padding: 4px 7px;
    font-size: 12px;
  }

  .cozy-theme .shell-contact {
    text-align: center;
    grid-area: 2 / 2;
    min-height: 32px;
    padding: 5px 8px;
    font-size: 13px;
  }

  .cozy-theme .footer-main .app-brand {
    white-space: nowrap;
    font-size: 18px;
  }

  .cozy-theme .footer-main {
    padding-block: 20px;
  }

  .cozy-theme .timer-sheet .focus-clock {
    font-size: 90px;
  }
}

.cozy-theme .daily-fact-section {
  width: min(100%, 1120px);
}

.cozy-theme .daily-fact {
  gap: 16px;
  height: 64px;
  min-height: 64px;
  padding: 6px 16px;
}

.fact-copy {
  border-left: 1px solid var(--rule);
  grid-template-rows: 36px 14px;
  min-width: 0;
  padding-left: 16px;
  display: grid;
}

.cozy-theme .fact-text {
  border: 0;
  align-items: center;
  padding: 0;
  font-size: 13px;
  line-height: 18px;
  display: flex;
}

.cozy-theme .fact-source {
  white-space: nowrap;
  margin: 0;
  font-size: 10px;
  line-height: 14px;
}

.progress-sidebar {
  min-width: 0;
}

.cozy-theme .header-inner {
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  display: grid;
}

.cozy-theme .header-actions {
  justify-self: end;
}

.cozy-theme .friends-placeholder {
  opacity: 1;
  background: var(--surface-tint);
  color: var(--soft-ink);
  border-color: var(--edge);
  box-shadow: none;
  justify-self: center;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  display: inline-flex;
}

.friends-placeholder > span {
  border: 1px solid var(--edge);
  border-radius: 5px;
  padding: 3px 5px;
  font: 400 10px / 1.3 Plus Jakarta Sans, sans-serif;
}

.workspace-top {
  flex: none;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  display: grid;
}

.workspace-top:not(:has(.header-pocket-money)) {
  grid-template-columns: minmax(0, 1fr);
}

.cozy-theme .workspace-top > .daily-fact-section {
  margin: 0 auto;
}

.workspace-top > .header-pocket-money {
  justify-self: end;
  gap: 8px;
  width: 100%;
  max-width: 270px;
  padding: 8px 12px;
}

.workspace-top > .header-pocket-money > span {
  flex: 1;
  min-width: 0;
}

.workspace-top > .header-pocket-money strong {
  white-space: nowrap;
  font-size: 15px;
}

.workspace-top > .header-pocket-money small {
  white-space: nowrap;
  font-size: 10px;
}

.workspace-top > .header-pocket-money .art-preview {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
}

.cozy-theme .workspace-top > .header-pocket-money .claim-button {
  flex-shrink: 0;
  min-height: 32px;
  padding: 5px 10px;
  font-size: 13px;
}

@media (width >= 1400px) {
  .workspace-top:has(.header-pocket-money) {
    grid-template-columns: minmax(0, 1fr) 270px;
    gap: 20px;
  }
}

@media (width >= 1200px) and (height >= 740px) {
  .workspace-top {
    margin-bottom: 8px;
  }

  .workspace-top:has(.header-pocket-money) {
    grid-template-columns: minmax(0, 1fr) 250px;
    gap: 16px;
  }
}

@media (width <= 700px) {
  .cozy-theme .header-inner {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .cozy-theme .friends-placeholder {
    grid-area: 2 / 1;
    justify-self: center;
    gap: 4px;
    padding: 6px 8px;
    font-size: 12px;
  }

  .friends-placeholder > span {
    font-size: 8px;
  }
}

.cozy-theme .companion-topline {
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  display: grid;
}

.cozy-theme .companion-topline .cat-condition {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 0;
  display: flex;
}

.cozy-theme .companion-topline .condition-trigger {
  gap: 3px;
  width: auto;
  min-height: 30px;
  padding: 2px;
  font-size: 11px;
}

.cozy-theme .companion-topline .cat-condition .art-preview {
  width: 20px;
  height: 20px;
}

.cozy-theme .companion-topline .cat-name h2 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.cozy-theme .companion-topline .companion-coins {
  justify-self: end;
  padding: 4px 6px;
  font-size: 11px;
}

@media (width <= 700px) {
  .cozy-theme .companion-topline {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 4px 8px;
  }

  .cozy-theme .companion-topline .companion-coins {
    grid-area: 1 / 2;
  }

  .cozy-theme .companion-topline .cat-condition {
    grid-area: 2 / 1 / auto / -1;
    justify-content: center;
    gap: 12px;
  }
}

.cozy-theme .companion-upper {
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  display: flex;
}

.cozy-theme .companion-upper .cat-condition {
  flex-direction: row;
  order: -1;
  justify-content: center;
  gap: 12px;
  display: flex;
}

.cozy-theme .companion-upper .condition-trigger {
  gap: 6px;
  width: auto;
  min-height: 30px;
  padding: 3px 8px;
}

.cozy-theme .companion-upper .companion-room {
  width: 100%;
  max-width: none;
  margin: 0;
}

.cozy-theme :is(.guide-title, .lifetime-tracker header, .progress-panels .session-history header, .sidebar-explanation .explanation-placeholder) {
  text-align: center;
}

.cozy-theme .sidebar-explanation header {
  text-align: center;
  justify-content: center;
  padding-inline: 40px;
  position: relative;
}

.cozy-theme .sidebar-explanation header .menu-help-close {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.cozy-theme .guide-title {
  list-style: none;
}

.cozy-theme .guide-title::-webkit-details-marker {
  display: none;
}

.cozy-theme:has(.timer-dim-overlay.active) .timer-sheet:before {
  content: "";
  z-index: 1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(at 50% 40%, #1e150f75 15%, #120c0994 100%);
  position: absolute;
  inset: 0;
}

.cozy-theme:has(.timer-dim-overlay.active) .timer-sheet:after {
  content: "";
  z-index: 2;
  border-radius: inherit;
  pointer-events: none;
  border: 1px solid #d8b47b80;
  position: absolute;
  inset: 0;
  box-shadow: inset 0 1px #ffe8bf33, inset 0 0 0 5px #fff1cf08, inset 0 0 24px #170f0b18, 0 0 0 1px #170f0b80;
}

.cozy-theme:has(.timer-dim-overlay.active) .timer-sheet {
  box-shadow: 0 18px 55px #0006, 0 0 38px #d59e3510;
}

.progress-panels {
  flex-direction: column;
  gap: 12px;
  display: flex;
}

.lifetime-tracker {
  border: 1px solid var(--rule);
  background: var(--sheet);
  border-radius: 16px;
  overflow: hidden;
}

.lifetime-tracker header {
  border-bottom: 1px solid var(--rule);
  background: var(--surface-tint);
  padding: 12px 14px;
}

.lifetime-tracker h2 {
  font: 500 22px/1.2 var(--display);
  margin: 0;
}

.lifetime-tracker header p {
  color: var(--soft-ink);
  margin: 4px 0 0;
  font-size: 11px;
}

.lifetime-hours {
  align-items: baseline;
  gap: 7px;
  padding: 12px 14px;
  display: flex;
}

.lifetime-hours strong {
  font: 600 29px/1.1 var(--display);
  color: var(--accent-ink);
}

.lifetime-hours span {
  color: var(--soft-ink);
  font-size: 12px;
}

.lifetime-metrics {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  margin: 0 14px;
  display: grid;
}

.lifetime-metrics > div {
  border-top: 1px solid var(--rule);
  flex-direction: column-reverse;
  padding: 10px 0;
  display: flex;
}

.lifetime-metrics dt {
  color: var(--soft-ink);
  font-size: 10px;
  line-height: 1.5;
}

.lifetime-metrics dd {
  font: 500 23px/1.2 var(--display);
  margin: 0;
}

.lifetime-metrics small {
  color: var(--soft-ink);
  font: 400 11px / 1.3 Plus Jakarta Sans, sans-serif;
}

.tracker-note {
  color: var(--soft-ink);
  margin: 8px 14px 12px;
  font-size: 10px;
  line-height: 1.6;
}

.progress-disclosure > summary {
  cursor: pointer;
  font: 500 16px/1.4 var(--display);
  color: var(--ink);
}

.progress-panels > .session-history {
  margin: 0;
}

.cat-journal {
  border: 1px solid var(--edge-strong);
  background: var(--sheet);
  height: 220px;
  min-height: 0;
  box-shadow: inset 0 0 0 3px var(--sheet),
    inset 0 0 0 4px var(--edge),
    0 3px 0 var(--edge);
  border-radius: 18px;
  flex-direction: column;
  flex: 0 0 220px;
  display: flex;
  overflow: hidden;
}

.cat-journal header {
  text-align: center;
  border-bottom: 1px solid var(--edge);
  background: linear-gradient(110deg, var(--chrome), var(--surface-tint));
  flex: none;
  padding: 12px 14px;
}

.cat-journal h3 {
  font: 500 21px/1.3 var(--display);
  letter-spacing: -.015em;
  margin: 0;
}

.cat-journal header > span {
  color: var(--soft-ink);
  margin-top: 3px;
  font-size: 10px;
  display: block;
}

.journal-list {
  scrollbar-width: thin;
  scrollbar-color: var(--edge-strong) transparent;
  flex: 1;
  min-height: 0;
  margin: 0;
  padding: 0 12px;
  list-style: none;
  overflow-y: auto;
}

.journal-entry {
  border-bottom: 1px solid var(--rule);
  align-items: flex-start;
  gap: 8px;
  padding: 11px 0;
  display: flex;
}

.journal-entry:last-child {
  border: 0;
}

.journal-entry p {
  color: var(--ink);
  margin: 0 0 5px;
  font-size: 12px;
  line-height: 1.7;
}

.journal-entry time {
  color: var(--soft-ink);
  font-size: 10px;
}

.journal-mark {
  background: var(--honey);
  border-radius: 50%;
  flex: 0 0 6px;
  width: 6px;
  height: 6px;
  margin-top: 8px;
}

.journal-care .journal-mark {
  background: #9aab79;
}

.journal-encouragement {
  background: var(--surface-tint);
  border-bottom: 0;
  border-radius: 10px;
  margin-block: 7px;
  padding: 10px 8px;
}

.journal-encouragement p {
  color: var(--accent-ink);
  font-style: italic;
}

.journal-encouragement .journal-mark {
  background: var(--honey);
}

.journal-milestone .journal-mark {
  border-radius: 1px;
  transform: rotate(45deg);
}

.journal-empty {
  color: var(--soft-ink);
  padding: 5px 15px;
  font-size: 12px;
  line-height: 1.8;
}

@media (width >= 1884px) and (height >= 740px) {
  .cat-journal {
    flex-basis: clamp(150px, 20dvh, 220px);
    height: clamp(150px, 20dvh, 220px);
  }
}

@media (width >= 721px) and (width <= 1199px) {
  .progress-panels > .cat-journal {
    grid-column: 1 / -1;
  }
}

@media (width >= 1200px) and (height >= 740px) {
  .cozy-theme .game-guide {
    grid-template-rows: minmax(0, 3fr) minmax(0, 2fr);
  }

  .cozy-theme .guide-container {
    max-height: none;
  }
}

.cozy-theme .sidebar-explanation {
  min-height: 240px;
}

.cozy-theme :is(.lifetime-tracker, .progress-panels > .session-history, .game-guide > .guide-container, .game-guide > .sidebar-explanation) {
  border: 1px solid var(--edge-strong);
  box-shadow: inset 0 0 0 3px var(--sheet),
    inset 0 0 0 4px var(--edge),
    0 3px 0 var(--edge),
    0 5px 14px #382b2210;
  border-radius: 18px;
}

.cozy-theme :is(.lifetime-tracker header, .progress-panels .session-history header, .game-guide .guide-title, .game-guide .sidebar-explanation header) {
  background: linear-gradient(110deg, var(--chrome), var(--surface-tint));
  border-bottom: 1px solid var(--edge);
  padding: 13px 16px;
}

.cozy-theme :is(.lifetime-tracker h2, .progress-panels .session-history h3, .game-guide .guide-title, .game-guide .sidebar-explanation h3) {
  letter-spacing: -.015em;
  font-weight: 500;
}

@media (width >= 1200px) and (height >= 740px) {
  .cozy-theme .game-guide > .sidebar-explanation {
    min-height: 0;
  }
}

.cozy-theme .sidebar-explanation .menu-help-copy {
  max-height: 340px;
  padding: 12px 16px 18px;
}

.cozy-theme .sidebar-explanation .menu-help-copy p {
  font-size: 14px;
  line-height: 1.75;
}

@media (width >= 1200px) and (height >= 740px) {
  .cozy-theme .sidebar-explanation .menu-help-copy {
    max-height: none;
  }
}

@media (width >= 1884px) and (height >= 740px) {
  .cozy-theme .workspace {
    width: min(1836px, 100% - 48px);
  }

  .workspace-top:has(.header-pocket-money) {
    grid-template-columns: 220px minmax(0, 1fr) 250px;
    gap: 16px;
  }

  .workspace-top:has(.header-pocket-money) > .daily-fact-section {
    grid-column: 2;
  }

  .workspace-top:has(.header-pocket-money) > .header-pocket-money {
    grid-column: 3;
  }

  .dashboard-with-guide {
    grid-template-columns: 220px minmax(0, 1fr) 250px;
  }

  .progress-sidebar, .progress-disclosure, .progress-panels {
    height: 100%;
    min-height: 0;
  }

  .progress-disclosure > summary {
    display: none;
  }

  .progress-panels > .lifetime-tracker {
    flex: none;
  }

  .progress-panels > .session-history {
    flex-direction: column;
    flex: 1;
    min-height: 0;
    display: flex;
    overflow: hidden;
  }

  .progress-panels .session-history header {
    flex: none;
  }

  .progress-panels .history-list {
    flex: 1;
    min-height: 0;
    max-height: none;
  }
}

@media (width >= 1200px) and (width <= 1883px), (width >= 1884px) and (height <= 739px) {
  .progress-sidebar {
    z-index: 25;
    position: fixed;
    bottom: 150px;
    left: 16px;
  }

  .progress-disclosure > summary {
    border: 1px solid var(--edge-strong);
    background: var(--sheet);
    border-radius: 10px;
    padding: 8px 12px;
    box-shadow: 0 2px 8px #0002;
  }

  .progress-panels {
    background: var(--paper);
    border-radius: 16px;
    width: 240px;
    max-height: calc(100dvh - 230px);
    padding: 3px;
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    overflow-y: auto;
    box-shadow: 0 4px 24px #0003;
  }

  .progress-panels .history-list {
    max-height: 130px;
  }
}

@media (width <= 1199px) {
  .dashboard-with-guide > .focus-layout {
    order: 1;
  }

  .dashboard-with-guide > .progress-sidebar {
    order: 2;
  }

  .dashboard-with-guide > .game-guide {
    order: 3;
  }

  .progress-sidebar {
    width: 100%;
    max-width: 680px;
    margin-inline: auto;
  }

  .progress-disclosure > summary {
    display: none;
  }

  .progress-panels {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    display: grid;
  }

  .progress-panels .session-history .history-list {
    max-height: 290px;
  }
}

@media (width <= 720px) {
  .workspace-top, .workspace-top:has(.header-pocket-money) {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }

  .workspace-top > .header-pocket-money {
    justify-self: center;
  }

  .cozy-theme .daily-fact {
    border-radius: 20px;
    grid-template-rows: 38px 88px;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px 12px;
    height: 174px;
    min-height: 174px;
    padding: 12px 16px;
  }

  .cozy-theme .fact-title h2 {
    font-size: 16px;
  }

  .fact-copy {
    border-left: 0;
    border-top: 1px solid var(--rule);
    grid-area: 2 / 1 / auto / -1;
    grid-template-rows: 60px 18px;
    padding: 8px 0 0;
  }

  .cozy-theme .fact-text {
    font-size: 13px;
    line-height: 20px;
  }

  .cozy-theme .fact-source {
    font-size: 11px;
    line-height: 18px;
  }

  .cozy-theme .fact-next {
    padding: 6px 9px;
    font-size: 12px;
  }

  .progress-panels {
    grid-template-columns: minmax(0, 1fr);
  }
}
`;
