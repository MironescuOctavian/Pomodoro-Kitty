/** Shared foundation styles for the Kitty UnoCSS preset. */
export default String.raw`
.initial-loading {
  place-items: center;
  min-height: 100svh;
  padding: 24px;
  display: grid;
}

.companion-loading {
  text-align: center;
  background: var(--sheet);
  border: 1px solid var(--rule);
  border-radius: 26px;
  width: min(100%, 520px);
  margin: 32px auto;
  padding: 38px 24px 30px;
  box-shadow: 0 5px #f1e7d7;
}

.loading-art {
  justify-content: center;
  align-items: center;
  gap: 16px;
  min-height: 145px;
  display: flex;
}

.loading-sparkle {
  color: var(--honey);
  font-size: 25px;
}

.loading-sparkle:last-child {
  color: #c46a4b;
  align-self: flex-start;
  margin-top: 12px;
}

.companion-loading h2 {
  color: var(--ink);
  font: 500 clamp(24px, 3vw, 31px)/1.25 var(--display);
  margin: 14px 0 10px;
}

.companion-loading p {
  color: var(--soft-ink);
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

.loading-dots {
  justify-content: center;
  gap: 8px;
  height: 14px;
  margin-top: 24px;
  display: flex;
}

.loading-dots span {
  background: var(--honey);
  border-radius: 50%;
  width: 7px;
  height: 7px;
  animation: 1.4s ease-in-out infinite companion-dot;
}

.loading-dots span:nth-child(2) {
  animation-delay: .15s;
}

.loading-dots span:nth-child(3) {
  animation-delay: .3s;
}

@keyframes companion-breathe {
  50% {
    transform: translateY(-3px);
  }
}

@keyframes companion-dot {
  0%, 80%, 100% {
    opacity: .35;
    transform: translateY(0);
  }

  40% {
    opacity: 1;
    transform: translateY(-4px);
  }
}

.unavailable-reason {
  color: var(--soft-ink);
  font-size: 12px;
  line-height: 1.5;
}

.cozy-theme .companion-panel > .purchase-page {
  z-index: 3;
  background: var(--sheet);
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  padding: 24px;
  display: flex;
  position: absolute;
  inset: 0;
  overflow-y: auto;
}

.purchase-page h3 {
  max-width: 100%;
  font: 500 23px/1.25 var(--display);
  overflow-wrap: anywhere;
  margin: 0;
}

.purchase-page p {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
}

.purchase-page .purchase-balance {
  color: var(--soft-ink);
  font-size: 13px;
}

.purchase-preview {
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  display: flex;
}

.purchase-swatch {
  border: 1px solid var(--rule);
  border-radius: 10px;
  width: 64px;
  height: 48px;
}

.purchase-actions {
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: min(100%, 320px);
  margin-top: 8px;
  display: grid;
}

.cozy-theme .purchase-actions .kitty-button {
  white-space: normal;
  min-width: 0;
  min-height: 42px;
  padding: 9px 10px;
  font-size: 15px;
}

.cozy-theme .purchase-actions .claim-button {
  background: var(--honey);
  border-color: var(--frame-dark);
}

@media (width <= 520px) {
  .cozy-theme .companion-panel > .purchase-page {
    gap: 10px;
    padding: 18px 14px;
  }

  .purchase-page h3 {
    font-size: 21px;
  }
}

.daily-fact-section {
  width: min(100%, 960px);
  margin: 12px auto 24px;
}

.daily-fact {
  min-height: 58px;
  box-shadow: inset 0 1px 0 var(--sheet);
  background: #fbf5e9;
  border: 1px solid #ddbb83;
  border-radius: 999px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 22px;
  padding: 10px 20px;
  display: grid;
}

.fact-title {
  align-items: center;
  gap: 12px;
  display: flex;
}

.fact-art-placeholder {
  background: #f2ebdf;
  border-radius: 7px;
  flex-shrink: 0;
  width: 40px;
  height: 33px;
  display: block;
}

.fact-title h2 {
  font: 600 19px/1.2 var(--display);
  color: var(--ink);
  white-space: nowrap;
  margin: 0;
}

.fact-text {
  color: #514238;
  overflow-wrap: anywhere;
  border-left: 1px solid #ddbb83;
  margin: 0;
  padding-left: 22px;
  font-size: 14px;
  line-height: 1.6;
}

.fact-next {
  background: var(--honey-soft);
  color: #514238;
  font: 500 16px/1.2 var(--display);
  white-space: nowrap;
  border: 1px solid #d8a13e;
  border-radius: 999px;
  padding: 6px 14px;
  transition: background .15s;
}

.fact-next:hover {
  background: #f4d695;
}

.fact-source {
  width: fit-content;
  max-width: 100%;
  color: var(--soft-ink);
  overflow-wrap: anywhere;
  margin: 6px 20px 0 auto;
  font-size: 12px;
  line-height: 1.5;
  text-decoration: none;
  display: block;
}

.fact-source:hover {
  color: var(--accent-ink);
  text-decoration: underline;
}

@media (width <= 720px) {
  .daily-fact {
    border-radius: 22px;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px 16px;
    padding: 12px 16px;
  }

  .fact-title {
    gap: 8px;
  }

  .fact-title h2 {
    white-space: normal;
    font-size: 17px;
  }

  .fact-art-placeholder {
    width: 34px;
    height: 28px;
  }

  .fact-text {
    border-left: 0;
    border-top: 1px solid var(--rule);
    grid-area: 2 / 1 / auto / -1;
    padding: 10px 0 0;
    font-size: 14px;
  }

  .fact-next {
    grid-area: 1 / 2;
    padding: 7px 11px;
    font-size: 14px;
  }

  .fact-source {
    margin-right: 16px;
  }
}

.header-inner {
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  min-height: 80px;
  display: flex;
}

.app-header, .app-footer {
  color: var(--ink);
  font-family: Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif;
}

.app-brand {
  white-space: nowrap;
  color: var(--ink);
  font: 600 24px/1.2 var(--display);
  letter-spacing: -.035em;
  border-radius: 8px;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  display: inline-flex;
}

.brand-dot {
  color: var(--honey);
  margin-left: 1px;
}

.app-footer .app-brand:hover {
  color: var(--ink);
  text-decoration: none;
}

.shell-contact {
  background: var(--honey);
  min-height: 46px;
  color: var(--ink);
  font: 500 18px/1.25 var(--display);
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  padding: 10px 23px;
  transition: background .15s;
  display: inline-flex;
}

.shell-contact:hover {
  background: var(--honey-hover);
}

.footer-main {
  color: #514238;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  padding-block: 24px;
  font-size: 14px;
  line-height: 1.7;
  display: grid;
}

.footer-credit {
  color: var(--soft-ink);
  gap: 2px;
  margin-top: 10px;
  font-size: 13px;
  display: grid;
}

.footer-credit a {
  color: var(--accent-ink);
  font-weight: 600;
}

.footer-credit > span:last-child {
  font-size: 12px;
}

.footer-privacy, .app-footer .footer-links {
  text-align: center;
  width: 100%;
  max-width: 300px;
  padding-top: 3px;
}

.footer-privacy {
  justify-self: center;
}

.app-footer .footer-links {
  flex-wrap: wrap;
  place-content: start center;
  justify-self: end;
  gap: 0 6px;
  display: flex;
}

.footer-main h2 {
  width: 100%;
  max-width: 100%;
  color: var(--accent-ink);
  font: 500 17px/1.3 var(--display);
  margin: 0 auto 8px;
}

.footer-privacy p {
  max-width: 280px;
  margin: 0 auto 5px;
}

.footer-privacy > span {
  color: var(--soft-ink);
  font-size: 14px;
}

.footer-links a {
  color: #514238;
  border-radius: 10px;
  justify-self: center;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  font-weight: 500;
  display: inline-flex;
}

.footer-links a:hover {
  background: var(--honey-soft);
  color: var(--accent-ink);
}

.footer-links a span {
  color: var(--accent-ink);
  font-size: 16px;
}

@media (width <= 800px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    padding-block: 24px;
  }

  .footer-about {
    grid-column: 1 / -1;
  }

  .footer-credit {
    max-width: 430px;
  }
}

@media (width <= 520px) {
  .header-inner {
    gap: 10px;
    min-height: 74px;
  }

  .app-brand {
    gap: 4px;
    font-size: 21px;
  }

  .shell-contact {
    min-height: 44px;
    padding-inline: 15px;
    font-size: 16px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 20px;
    font-size: 14px;
  }

  .footer-about {
    grid-column: auto;
  }

  .footer-privacy, .app-footer .footer-links {
    text-align: left;
    justify-self: stretch;
    max-width: none;
  }

  .footer-main h2 {
    margin-left: 0;
    font-size: 17px;
  }

  .footer-privacy p {
    margin-left: 0;
  }

  .footer-links a {
    justify-self: start;
    padding-left: 0;
  }

  .app-footer .footer-links {
    justify-content: flex-start;
  }
}

:root {
  --paper: #f7f3eb;
  --sheet: #fffef9;
  --ink: #382b22;
  --soft-ink: #78675a;
  --rule: #e6d7c1;
  --honey: #f5ad20;
  --honey-hover: #e49b10;
  --honey-soft: #fff0c8;
  --accent: #c46a4b;
  --accent-ink: #995037;
  --focus: #a65b12;
  --display: "Fredoka", ui-rounded, sans-serif;
}

html {
  background: var(--paper);
  color: var(--ink);
}

body {
  background: var(--paper);
  font-family: Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif;
}

button, input, summary, a {
  -webkit-tap-highlight-color: transparent;
}

button, input {
  font: inherit;
}

button {
  touch-action: manipulation;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: .45;
}

summary {
  cursor: pointer;
}

:is(button, a, summary, input, [tabindex]):focus-visible {
  outline: 3px solid var(--honey);
  outline-offset: 4px;
}

#main-content {
  flex-direction: column;
  display: flex;
}

.workspace, .shell-container {
  width: min(1360px, 100% - 80px);
  margin-inline: auto;
  position: relative;
}

.app-header {
  background: var(--sheet);
  border-bottom: 1px solid var(--honey);
}

.header-actions {
  align-items: center;
  gap: 20px;
  display: flex;
}

.header-actions a {
  text-decoration: none;
}

.kitty-button {
  font-family: var(--display);
  box-shadow: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
}

.claim-button {
  background: var(--honey-soft);
  border-color: var(--honey);
  color: var(--ink);
}

.workspace {
  padding-block: 6px 30px;
}

.focus-layout {
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  align-items: stretch;
  gap: 22px;
  display: grid;
}

.focus-desk, .companion {
  min-width: 0;
}

.focus-desk {
  text-align: center;
  flex-direction: column;
  gap: 20px;
  display: flex;
}

.timer-sheet, .task-section, .companion {
  border: 1px solid var(--rule);
  background: var(--sheet);
  border-radius: 24px;
  box-shadow: 0 4px 10px #382b2208;
}

.timer-sheet {
  padding: 28px 32px 24px;
}

.desk-title {
  font: 600 clamp(28px, 3vw, 42px)/1.1 var(--display);
  color: var(--ink);
  letter-spacing: -.025em;
  margin: 0;
}

.desk-subtitle {
  color: var(--soft-ink);
  margin: 8px 0 24px;
  font-size: 17px;
}

.mode-switch {
  border: 1px solid var(--rule);
  background: var(--paper);
  border-radius: 999px;
  justify-content: center;
  max-width: 460px;
  margin: auto;
  padding: 3px;
  display: flex;
}

.mode-switch button {
  color: var(--ink);
  font: 500 17px/1.2 var(--display);
  white-space: nowrap;
  background: none;
  border: 0;
  border-radius: 999px;
  flex: 1;
  padding: 9px 6px;
}

.mode-switch button[aria-pressed="true"] {
  background: var(--honey);
  color: var(--ink);
}

.focus-clock {
  color: var(--ink);
  font: 600 clamp(85px, 10.5vw, 148px)/1.15 var(--display);
  font-variant-numeric: tabular-nums;
  letter-spacing: -.045em;
  white-space: nowrap;
  margin: 16px 0 10px;
}

.timer-progress {
  background: var(--honey-soft);
  appearance: none;
  border: 0;
  border-radius: 99px;
  width: 100%;
  height: 9px;
  margin: 0 auto 24px;
  display: block;
  overflow: hidden;
}

.timer-progress::-webkit-progress-bar {
  background: var(--honey-soft);
}

.timer-progress::-webkit-progress-value {
  background: var(--honey);
  border-radius: 99px;
}

.timer-progress::-moz-progress-bar {
  background: var(--honey);
  border-radius: 99px;
}

.timer-actions {
  justify-content: center;
  align-items: center;
  gap: 24px;
  display: flex;
}

.timer-actions .start-button {
  font: 600 23px/1.2 var(--display);
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 13px 32px;
  display: inline-flex;
}

.start-button > span {
  font-size: 17px;
}

.quiet-button {
  color: var(--soft-ink);
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  padding: 8px 4px;
}

.quiet-button:hover {
  color: var(--ink);
}

.timer-actions .quiet-button {
  font: 500 18px var(--display);
}

.timer-reward {
  margin: 18px 0 0;
  font-size: 12px;
}

.earned-note {
  color: var(--accent-ink);
  margin-bottom: 0;
  font-size: 13px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: .13em;
  color: var(--soft-ink);
  font-size: 12px;
  font-weight: 600;
}

.task-section {
  text-align: left;
  flex-direction: column;
  flex: 1;
  gap: 10px;
  min-height: 245px;
  padding: 16px 20px;
  display: flex;
}

.task-section .kitty-heading {
  color: var(--ink);
  background: #fbf5e9;
  border-radius: 12px;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 8px 12px;
  font-size: 24px;
  display: flex;
}

.task-count {
  color: var(--soft-ink);
  white-space: nowrap;
  font: 400 12px Plus Jakarta Sans, sans-serif;
}

.task-list {
  flex: 1;
  max-height: 220px;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: auto;
}

.task-item {
  border-bottom: 1px solid var(--rule);
  align-items: center;
  gap: 8px;
  min-height: 43px;
  display: flex;
}

.task-item label {
  cursor: pointer;
  flex: 1;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 9px 0;
  font-size: 14px;
  display: flex;
}

.task-item label span {
  overflow-wrap: anywhere;
}

.task-item input {
  width: 19px;
  height: 19px;
  accent-color: var(--honey);
  flex-shrink: 0;
  margin: 0;
}

.task-done {
  color: var(--soft-ink);
  text-decoration: line-through;
}

.task-delete {
  padding-inline: 8px;
  font-size: 20px;
}

.task-empty {
  color: var(--soft-ink);
  padding: 18px 0;
  font-size: 13px;
}

.task-form {
  border-bottom: 1px solid var(--rule);
  gap: 8px;
  display: flex;
}

.task-form input, .rename-form input {
  width: 100%;
  min-width: 0;
  color: var(--ink);
  font: inherit;
  background: none;
  border: 0;
  padding: 9px 0;
  font-size: 13px;
}

.task-form input::placeholder {
  color: var(--soft-ink);
}

.task-form button {
  white-space: nowrap;
  font-family: var(--display);
}

.task-details {
  color: var(--soft-ink);
  font-size: 12px;
}

.task-details p {
  margin: 8px 0 0;
}

.companion {
  padding: 22px;
  position: relative;
}

.companion-heading {
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  min-height: 42px;
  padding-right: 105px;
  display: flex;
}

.cat-name {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.cat-name h2 {
  font: 600 34px/1.1 var(--display);
  overflow-wrap: anywhere;
  margin: 0;
}

.rename-button {
  font-size: 22px;
}

.hearts {
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  display: flex;
}

.bonus-hearts {
  color: var(--accent-ink);
  font-size: 12px;
}

.coin-balance {
  white-space: nowrap;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  display: inline-flex;
}

.companion-coins {
  border: 1px solid var(--honey);
  background: #fbf5e9;
  border-radius: 999px;
  padding: 6px 10px;
  position: absolute;
  top: 25px;
  right: 22px;
}

.rename-form {
  border-bottom: 1px solid var(--rule);
  gap: 8px;
  margin-block: 12px;
  display: flex;
}

.rename-form button {
  flex-shrink: 0;
}

.kitty-pet {
  background: none;
  border: 0;
  width: 100%;
  margin: 16px 0 0;
  padding: 0;
  display: block;
}

.cat-status {
  text-align: center;
  color: var(--soft-ink);
  margin: 10px 0 22px;
  font-size: 12px;
  line-height: 1.5;
}

.companion-controls {
  grid-template-columns: 76px minmax(0, 1fr);
  align-items: start;
  gap: 12px;
  display: grid;
}

.companion-tabs {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.companion-tabs button {
  background: var(--paper);
  width: 100%;
  min-height: 59px;
  color: var(--ink);
  font: 500 16px/1.1 var(--display);
  box-shadow: 0 3px 0 var(--rule);
  border: 0;
  border-radius: 14px;
  padding: 10px 4px;
}

.companion-tabs button[aria-pressed="true"] {
  box-shadow: 0 3px 0 var(--honey);
  background: #f4d695;
}

.companion-tabs button:hover {
  filter: brightness(.97);
}

.companion-panel {
  overscroll-behavior: contain;
  background: #fbf5e9;
  border-radius: 19px;
  min-width: 0;
  height: 338px;
  padding: 16px;
  overflow: hidden auto;
  box-shadow: 0 5px 13px #382b220a;
}

.companion-panel .kitty-heading {
  color: var(--ink);
  margin-bottom: 12px;
  font-size: 24px;
}

.companion-panel .kitty-muted {
  font-size: 14px;
  line-height: 1.6;
}

.care-row {
  background: var(--sheet);
  border: 1px solid #f4d695;
  border-radius: 15px;
  grid-template-columns: 30px minmax(0, 1fr) auto;
  align-items: center;
  gap: 9px;
  min-height: 73px;
  margin-bottom: 10px;
  padding: 13px 10px;
  display: grid;
}

.care-label {
  min-width: 0;
}

.care-label strong {
  font: 500 17px/1.2 var(--display);
  color: var(--ink);
  display: block;
}

.care-label small {
  color: var(--soft-ink);
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.5;
  display: block;
}

.care-row > button {
  background: var(--honey-soft);
  white-space: nowrap;
  border: 0;
  padding: 7px 10px;
  font-size: 13px;
}

.care-row > .claim-button {
  background: var(--honey);
  color: var(--ink);
}

.art-preview {
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  display: inline-flex;
}

.pal-product .art-preview {
  width: 40px;
  height: 40px;
}

.break-details {
  background: var(--sheet);
  border: 1px solid #f4d695;
  border-radius: 15px;
  padding: 13px 12px;
  font-size: 12px;
}

.break-details summary {
  color: var(--soft-ink);
  flex-wrap: wrap;
  gap: 5px;
  display: flex;
}

.break-details summary > span:first-child {
  width: 100%;
  font: 500 17px var(--display);
  color: var(--ink);
}

.break-details p, .help-details p {
  margin: 10px 0 0;
}

.help-details {
  color: var(--soft-ink);
  margin-block: 12px;
  font-size: 12px;
}

.medal-locked {
  opacity: .5;
}

.shop-panel > div:first-child {
  gap: 8px;
  margin-bottom: 12px;
}

.shop-panel > div:first-child > div:first-child {
  width: 100%;
}

.shop-panel button[aria-pressed] {
  border-radius: 999px;
}

.shop-items .grid-cols-3 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.pal-product {
  border-color: var(--rule);
  background: var(--sheet);
}

:is(.companion-panel, .task-list) {
  scrollbar-width: thin;
  scrollbar-color: var(--rule) transparent;
}

.app-footer {
  background: var(--sheet);
  border-top: 1px solid var(--honey);
  color: var(--soft-ink);
  margin-top: 24px;
}

.app-footer a {
  color: inherit;
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}

.app-footer nav {
  gap: 18px;
  display: flex;
}

.adoption {
  text-align: center;
  max-width: 480px;
  margin: 30px auto;
}

.adoption h1 {
  font: 600 36px/1.2 var(--display);
}

.adoption .kitty-pet {
  margin-block: 24px;
}

.adoption > .kitty-primary {
  font: 500 20px var(--display);
  padding: 13px 26px;
}

@media (width <= 1180px) {
  .workspace, .shell-container {
    width: calc(100% - 48px);
  }

  .companion {
    padding: 18px;
  }

  .companion-coins {
    top: 21px;
    right: 18px;
  }

  .companion-controls {
    grid-template-columns: 65px minmax(0, 1fr);
    gap: 8px;
  }

  .companion-panel {
    padding: 12px;
  }

  .care-row {
    grid-template-columns: 25px minmax(0, 1fr);
    gap: 8px;
  }

  .care-row > button, .care-row > .kitty-badge {
    grid-column: 2;
    justify-self: start;
  }

  .timer-sheet {
    padding-inline: 22px;
  }

  .desk-subtitle {
    font-size: 15px;
  }
}

@media (width <= 900px) {
  .focus-layout {
    grid-template-columns: 1fr;
    max-width: 680px;
    margin: auto;
  }

  .focus-clock {
    font-size: clamp(90px, 18vw, 145px);
  }

  .companion-controls {
    grid-template-columns: 86px minmax(0, 1fr);
    gap: 14px;
  }

  .care-row {
    grid-template-columns: 32px minmax(0, 1fr) auto;
  }

  .care-row > button, .care-row > .kitty-badge {
    grid-column: auto;
  }

  .companion-panel {
    height: 345px;
    padding: 18px;
  }

  .companion-tabs button {
    min-height: 60px;
  }
}

@media (width <= 520px) {
  .workspace, .shell-container {
    width: calc(100% - 28px);
  }

  .timer-sheet {
    padding: 25px 17px;
  }

  .desk-title {
    font-size: 30px;
  }

  .desk-subtitle {
    margin-bottom: 20px;
    font-size: 14px;
  }

  .mode-switch button {
    padding: 9px 3px;
    font-size: 14px;
  }

  .focus-clock {
    font-size: clamp(80px, 24vw, 118px);
  }

  .timer-actions {
    gap: 16px;
  }

  .timer-actions .start-button {
    padding: 12px 24px;
    font-size: 21px;
  }

  .task-section {
    padding: 12px;
  }

  .task-section .kitty-heading {
    font-size: 22px;
  }

  .companion {
    padding: 14px;
  }

  .companion-coins {
    padding: 5px 8px;
    font-size: 12px;
    top: 17px;
    right: 14px;
  }

  .companion-heading {
    gap: 8px;
    padding-right: 95px;
  }

  .cat-name h2 {
    font-size: 29px;
  }

  .companion-controls {
    grid-template-columns: 60px minmax(0, 1fr);
    gap: 8px;
  }

  .companion-tabs button {
    min-height: 62px;
    font-size: 15px;
  }

  .companion-panel {
    height: 354px;
    padding: 12px;
  }

  .companion-panel .kitty-heading {
    font-size: 22px;
  }

  .care-row {
    grid-template-columns: 25px minmax(0, 1fr);
    gap: 7px;
    padding: 11px 8px;
  }

  .care-row > button, .care-row > .kitty-badge {
    grid-column: 2;
    justify-self: start;
  }

  .care-label strong {
    font-size: 16px;
  }

  .art-preview {
    width: 25px;
    height: 25px;
  }

  .shop-items .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}

@media (pointer: coarse) {
  button, summary, .task-item label {
    min-height: 44px;
  }

  .task-form input, .rename-form input {
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, :before, :after {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}

.cat-art-placeholder {
  border: 1px dashed var(--rule);
  min-height: 220px;
  color: var(--soft-ink);
  border-radius: 18px;
  place-items: center;
  margin-block: 18px;
  font-size: 13px;
  display: grid;
}

.cozy-theme {
  --frame: #c99b62;
  --frame-dark: #a87438;
  --stitch: #e6c99f;
  --highlight: #fffdf5;
  --recess: #f1e4cd;
}

.cozy-theme .app-header {
  border-bottom-color: var(--frame);
  box-shadow: none;
}

.cozy-theme .app-footer {
  border-top-color: var(--frame);
  box-shadow: none;
}

.cozy-theme .workspace {
  padding-top: 15px;
}

.cozy-theme .focus-layout {
  border: 1px solid var(--frame-dark);
  box-shadow: inset 0 0 0 2px var(--highlight),
    inset 0 0 0 4px #ecd1aa,
    0 3px 0 var(--frame),
    0 7px 16px #68452012;
  background: linear-gradient(135deg, #fff7e6, #f6e8d0);
  border-radius: 30px;
  gap: 20px;
  padding: 18px;
  position: relative;
}

.cozy-theme :is(.timer-sheet, .task-section, .companion) {
  border-color: var(--stitch);
  background: var(--sheet);
  border-radius: 22px;
  position: relative;
  box-shadow: 0 2px #ead7b9;
}

.cozy-theme .timer-sheet:after {
  content: "";
  border: 1px dashed var(--stitch);
  pointer-events: none;
  border-radius: 16px;
  position: absolute;
  inset: 8px;
}

.cozy-theme .companion:after {
  content: none;
}

.cozy-theme .task-section .kitty-heading {
  box-shadow: inset 0 1px 0 var(--highlight);
  background: linear-gradient(#fff2d2, #f8e3ba);
  border: 1px solid #e9cc99;
  border-radius: 12px;
}

.cozy-theme .task-item {
  border-bottom: 1px dashed var(--stitch);
}

.cozy-theme .task-item input {
  accent-color: #c88820;
}

.cozy-theme :is(.task-form, .rename-form) {
  border: 1px solid var(--stitch);
  background: #fffaf1;
  border-radius: 12px;
  padding-inline: 10px;
  box-shadow: inset 0 2px 3px #68452009;
}

.cozy-theme .mode-switch {
  background: var(--recess);
  box-shadow: inset 0 2px 3px #6845200d,
    0 1px 0 var(--highlight);
  border-color: #d7b887;
}

.cozy-theme :is(.kitty-button, .fact-next, .shell-contact, .companion-tabs button, .mode-switch button[aria-pressed="true"], .shop-panel button[aria-pressed="true"]) {
  border: 1px solid var(--frame-dark);
  background-image: linear-gradient(#fff9e955, #fff0);
  border-radius: 12px;
  transition: background-color .15s, transform .1s, box-shadow .1s;
  box-shadow: inset 0 1px #fffdf5cc, 0 2px #bc8c4e;
}

.cozy-theme :is(.shell-contact, .fact-next) {
  border-radius: 12px;
}

.cozy-theme :is(.kitty-button, .fact-next, .shell-contact, .companion-tabs button):not(:disabled):hover {
  filter: none;
  transform: translateY(-1px);
}

.cozy-theme :is(.kitty-button, .fact-next, .shell-contact, .companion-tabs button):not(:disabled):active {
  box-shadow: inset 0 1px 2px #68452020,
    0 1px 0 var(--highlight);
  transform: translateY(2px);
}

.cozy-theme :is(.kitty-button, .companion-tabs button):disabled {
  box-shadow: inset 0 1px 0 var(--highlight);
  transform: none;
}

.cozy-theme .timer-actions .start-button {
  border-radius: 12px;
  box-shadow: inset 0 2px #fff0c899, 0 3px #ad7629;
}

.cozy-theme .companion-tabs button {
  background-color: #fff3da;
}

.cozy-theme .companion-tabs button[aria-pressed="true"] {
  background-color: var(--honey-soft);
  border-color: var(--frame-dark);
  box-shadow: inset 0 1px 0 var(--highlight),
    inset 0 -2px 0 #cd9e5344,
    0 2px 0 var(--frame-dark);
}

.cozy-theme .companion-panel {
  border: 1px solid var(--stitch);
  box-shadow: none;
  background: #fff8e9;
  border-radius: 17px;
}

.cozy-theme :is(.care-row, .break-details, .pal-product) {
  border: 1px solid var(--rule);
  background: var(--sheet);
  box-shadow: none;
  border-radius: 12px;
}

.cozy-theme .daily-fact {
  border-color: var(--frame);
  background: #fff9ed;
  box-shadow: 0 2px #ead7b9;
}

.cozy-theme .companion-coins {
  border-color: var(--frame);
  background: var(--sheet);
  box-shadow: none;
}

.cozy-theme .purchase-dialog {
  border-color: var(--frame-dark);
  box-shadow: inset 0 0 0 3px var(--highlight),
    inset 0 0 0 4px var(--stitch),
    0 6px 0 #ba8d58,
    0 15px 50px #382b2233;
  border-radius: 23px;
}

.cozy-theme .cat-art-placeholder {
  box-shadow: none;
  background: #f5efe4;
  border: 0;
}

.cozy-theme .timer-progress {
  background: #efdfc1;
}

.cozy-theme .timer-progress::-webkit-progress-bar {
  background: #efdfc1;
}

.cozy-theme .timer-progress::-webkit-progress-value {
  background: linear-gradient(#f9c34f, #eca114);
}

.cozy-theme .timer-progress::-moz-progress-bar {
  background: linear-gradient(#f9c34f, #eca114);
}

.cozy-theme :is(button, a, summary, input, [tabindex]):focus-visible {
  outline-color: var(--focus);
}

@media (width <= 520px) {
  .cozy-theme .focus-layout {
    border-radius: 24px;
    gap: 16px;
    padding: 10px;
  }

  .cozy-theme :is(.timer-sheet, .task-section, .companion) {
    border-radius: 17px;
  }

  .cozy-theme .timer-sheet:after {
    border-radius: 12px;
    inset: 6px;
  }

  .cozy-theme .companion:after {
    border-radius: 13px;
  }

  .cozy-theme .companion-controls {
    grid-template-columns: 54px minmax(0, 1fr);
    gap: 7px;
  }

  .cozy-theme .companion-panel {
    padding: 9px;
  }

  .cozy-theme .companion-tabs button {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cozy-theme :is(.kitty-button, .fact-next, .shell-contact, .companion-tabs button):hover, .cozy-theme :is(.kitty-button, .fact-next, .shell-contact, .companion-tabs button):active {
    transform: none;
  }
}

.cozy-theme .companion-heading {
  grid-template-columns: minmax(0, 1fr);
  gap: 2px;
  padding-right: 112px;
  display: grid;
}

.cozy-theme .cat-name h2 {
  font-size: 30px;
}

.cozy-theme .hearts {
  gap: 7px;
  font-size: 12px;
  line-height: 1.5;
}

.cozy-theme .bonus-hearts {
  font-size: 12px;
}

.cozy-theme .companion-coins {
  font-variant-numeric: tabular-nums;
  max-width: 112px;
  font-size: 14px;
}

.cozy-theme .companion-room {
  border: 1px solid var(--frame-dark);
  background: var(--sheet);
  width: min(92%, 380px);
  box-shadow: inset 0 0 0 2px var(--highlight),
    inset 0 0 0 4px #f0dfc5,
    0 3px 0 #dfc39c;
  border-radius: 20px;
  margin: 18px auto 22px;
  padding: 6px;
  position: relative;
}

.cozy-theme .companion-room .cat-art-placeholder {
  border-radius: 13px;
  height: 160px;
  min-height: 0;
  margin: 0;
  padding: 16px 12px 60px;
  font-size: 12px;
}

.cozy-theme .companion-room .cat-status {
  border-top: 1px solid var(--rule);
  min-height: 48px;
  color: var(--soft-ink);
  margin: 0;
  padding: 8px 0;
  font-size: 12px;
  line-height: 1.5;
  position: absolute;
  bottom: 6px;
  left: 18px;
  right: 18px;
}

.cozy-theme .companion-panel {
  height: 430px;
  box-shadow: inset 0 1px 0 var(--highlight);
}

.cozy-theme .companion-controls {
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  display: grid;
}

.cozy-theme .companion-tabs {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  padding-top: 1px;
  display: grid;
}

.cozy-theme .companion-tabs button {
  border-color: var(--stitch);
  min-height: 44px;
  box-shadow: inset 0 1px 0 var(--highlight),
    0 2px 0 #e4cfad;
  background: #fbf3e5;
  padding: 10px 3px;
  font-size: 16px;
  position: relative;
}

.cozy-theme .companion-tabs button[aria-pressed="true"] {
  border-color: var(--frame-dark);
  background: var(--honey-soft);
  width: 100%;
  box-shadow: inset 0 -3px 0 var(--honey),
    0 2px 0 #e4cfad;
  border-radius: 12px;
}

.cozy-theme .companion-tabs button[aria-pressed="true"]:hover {
  transform: none;
}

.cozy-theme .companion-panel:has(.shop-panel) {
  flex-direction: column;
  padding: 0;
  display: flex;
  overflow: hidden;
}

.cozy-theme .companion-panel:has(.shop-panel) > .kitty-note {
  flex-shrink: 0;
  margin: 10px 10px 0;
}

.cozy-theme .shop-panel {
  flex: 1;
  min-height: 0;
}

.cozy-theme .shop-header {
  border-bottom: 1px solid var(--rule);
  flex-shrink: 0;
  margin: 0;
  padding: 16px 16px 12px;
}

.cozy-theme .shop-header .kitty-heading {
  margin-bottom: 5px;
  font-size: 22px;
}

.cozy-theme .shop-header .kitty-muted {
  font-size: 14px;
}

.cozy-theme .shop-items {
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #d8bd91 transparent;
  flex: 1;
  min-height: 0;
  padding: 0 14px 10px;
  overflow-y: auto;
}

.cozy-theme .shop-items .grid {
  flex-direction: column;
  gap: 0;
  display: flex;
}

.cozy-theme .shop-items .pal-product {
  border: 0;
  border-bottom: 1px solid var(--rule);
  width: 100%;
  min-height: 87px;
  box-shadow: none;
  text-align: left;
  background: none;
  border-radius: 0;
  grid-template-rows: auto auto;
  grid-template-columns: 36px minmax(0, 1fr) auto;
  align-items: center;
  gap: 4px 10px;
  padding: 13px 0;
  display: grid;
}

.cozy-theme .shop-items .pal-product:last-child {
  border-bottom: 0;
}

.cozy-theme .shop-items .pal-product > .art-preview, .cozy-theme .shop-items .pal-product > span[style] {
  grid-area: 1 / 1 / 3;
  width: 34px;
  height: 34px;
}

.cozy-theme .shop-items .pal-product > strong {
  font: 500 16px/1.2 var(--display);
  overflow-wrap: anywhere;
  grid-area: 1 / 2;
}

.cozy-theme .shop-items .pal-product > .kitty-badge {
  grid-area: 2 / 2;
  font-size: 12px;
}

.cozy-theme .shop-items .pal-product > button {
  grid-area: 1 / 3 / 3;
  align-self: center;
  width: auto;
  min-width: 70px;
  margin: 0;
}

.cozy-theme .product-status {
  color: var(--accent-ink);
  white-space: nowrap;
  grid-area: 1 / 3 / 3;
  font-size: 12px;
}

.cozy-theme .shop-items .pal-product > .unavailable-reason {
  grid-area: 3 / 2 / auto / 4;
  font-size: 12px;
}

.cozy-theme .shop-items button.pal-product {
  padding-inline: 5px;
}

.cozy-theme .shop-items button.pal-product > .kitty-badge {
  text-align: right;
  grid-area: 1 / 3 / 3;
  justify-self: end;
  max-width: 85px;
}

.cozy-theme .shop-items button.pal-product > strong {
  grid-row: 1 / 3;
}

.cozy-theme .shop-items button.pal-product[aria-pressed="true"] {
  background: var(--honey-soft);
  box-shadow: inset 3px 0 0 var(--honey);
  border-radius: 9px;
}

.cozy-theme .shop-items button.pal-product:not(:disabled):hover {
  background: #fff0c855;
  transform: none;
}

@media (width <= 520px) {
  .cozy-theme .companion-heading {
    padding-right: 98px;
  }

  .cozy-theme .cat-name h2 {
    font-size: 27px;
  }

  .cozy-theme .companion-coins {
    max-width: 100px;
    font-size: 12px;
  }

  .cozy-theme .companion-room .cat-art-placeholder {
    height: 145px;
  }

  .cozy-theme .companion-tabs {
    gap: 5px;
  }

  .cozy-theme .companion-tabs button {
    padding-inline: 2px;
    font-size: 14px;
  }

  .cozy-theme .shop-header {
    padding: 12px 10px 10px;
  }

  .cozy-theme .shop-header .kitty-heading {
    font-size: 20px;
  }

  .cozy-theme .shop-items {
    padding-inline: 9px;
  }

  .cozy-theme .shop-items .pal-product {
    grid-template-columns: 25px minmax(0, 1fr);
    gap: 5px 8px;
    min-height: 104px;
  }

  .cozy-theme .shop-items .pal-product > .art-preview, .cozy-theme .shop-items .pal-product > span[style] {
    width: 25px;
    height: 25px;
  }

  .cozy-theme .shop-items .pal-product > strong {
    font-size: 15px;
  }

  .cozy-theme .shop-items .pal-product > button, .cozy-theme .shop-items .pal-product > .product-status {
    grid-area: 3 / 2;
    justify-self: start;
  }

  .cozy-theme .shop-items .pal-product > .unavailable-reason {
    grid-area: 4 / 2;
  }

  .cozy-theme .shop-items button.pal-product > strong {
    grid-row: 1;
  }

  .cozy-theme .shop-items button.pal-product > .kitty-badge {
    text-align: left;
    grid-area: 2 / 2;
    justify-self: start;
    max-width: none;
  }
}
`;
