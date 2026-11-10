// Local, isolated browser smoke check. Uses Chrome's built-in debugging protocol.
import { mkdir, writeFile } from "node:fs/promises";
const tabs = await (await fetch("http://127.0.0.1:9333/json")).json();
const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
let id = 0;
const pending = new Map();
const errors = [];
ws.addEventListener("message", ({ data }) => {
  const event = JSON.parse(data);
  if (event.id) {
    const waiter = pending.get(event.id);
    pending.delete(event.id);
    if (event.error) waiter.reject(event.error);
    else waiter.resolve(event.result);
  }
  if (event.method === "Runtime.exceptionThrown") errors.push(event.params.exceptionDetails);
  if (event.method === "Runtime.consoleAPICalled" && event.params.type === "error")
    errors.push(event.params.args);
  if (
    event.method === "Runtime.consoleAPICalled" &&
    event.params.type === "warning" &&
    event.params.args.some((arg) => /\[(STRICT_|UNSTABLE_|REACTIVE_)/.test(arg.value ?? ""))
  )
    errors.push(event.params.args);
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const requestId = ++id;
    pending.set(requestId, { resolve, reject });
    ws.send(JSON.stringify({ id: requestId, method, params }));
  });
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const waitFor = async (expression) =>
  evaluate(
    `new Promise((resolve,reject)=>{let count=0;const timer=setInterval(()=>{if(${expression}){clearInterval(timer);resolve(true)}else if(++count>150){clearInterval(timer);reject(new Error('Timed out: '+${JSON.stringify(expression)}))}},100)})`,
  );
await send("Runtime.enable");
await send("Page.enable");
await send("Page.addScriptToEvaluateOnNewDocument", {
  source: "localStorage.removeItem('pomodoro-kitty-v1');localStorage.removeItem('kitty-theme');",
});
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1050,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: "http://127.0.0.1:5173/en" });
await waitFor(
  `document.querySelector('.adoption button') || document.querySelector('.focus-clock')`,
);
await evaluate(`document.querySelector('.adoption .kitty-primary')?.click()`);
await waitFor(`document.querySelector('.focus-clock')`);
await evaluate("document.fonts.ready");
for (const width of [1920, 1774, 1440, 1024, 390]) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 1050,
    deviceScaleFactor: 1,
    mobile: width === 390,
  });
  const strip = await evaluate(
    `(()=>{const fact=document.querySelector('.daily-fact').getBoundingClientRect();const text=document.querySelector('.fact-text').getBoundingClientRect();const pocket=document.querySelector('.header-pocket-money').getBoundingClientRect();return {width:innerWidth,factWidth:fact.width,textWidth:text.width,factHeight:fact.height,pocketHeight:pocket.height,overflow:document.documentElement.scrollWidth>innerWidth}})()`,
  );
  if (strip.textWidth < 140 || strip.factHeight > 240 || strip.pocketHeight > 240 || strip.overflow)
    throw new Error("Broken top strip: " + JSON.stringify(strip));
  console.log("Top strip verified:", width);
}
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1050,
  deviceScaleFactor: 1,
  mobile: false,
});
await waitFor(`Array.from(document.images).every(img=>img.complete)`);
await mkdir("output/design", { recursive: true });
const capture = async (name) => {
  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
  });
  await writeFile(`output/design/${name}.png`, Buffer.from(screenshot.data, "base64"));
};
for (const [width, height] of [
  [1920, 1080],
  [1440, 900],
  [1366, 768],
  [1280, 720],
]) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  const fit = await evaluate(
    `(()=>{const timer=document.querySelector('.timer-sheet').getBoundingClientRect(); const actions=document.querySelector('.timer-actions').getBoundingClientRect();return {height:innerHeight,page:document.documentElement.scrollHeight,footer:document.querySelector('.app-footer').getBoundingClientRect().bottom,timerTop:timer.top,timerBottom:timer.bottom,actionTop:actions.top,actionBottom:actions.bottom}})()`,
  );
  console.log("Viewport fit:", width, height, JSON.stringify(fit));
  if (
    fit.page > height + 1 ||
    fit.actionBottom > fit.timerBottom + 1 ||
    fit.actionTop < fit.timerTop
  )
    throw new Error("Viewport overflow: " + JSON.stringify(fit));
  await capture(`viewport-${width}-${height}`);
}
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1050,
  deviceScaleFactor: 1,
  mobile: false,
});
await capture("desktop");
console.log(
  "Desktop:",
  await evaluate(
    `JSON.stringify({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,clock:document.querySelector('.focus-clock').innerText,room:document.querySelector('.room-art').getBoundingClientRect().toJSON()})`,
  ),
);
await evaluate(`document.querySelector('.start-button').click()`);
await waitFor(`document.querySelector('.start-button').textContent.includes('Pause')`);
await capture("focus-mode");
if (
  await evaluate(
    `getComputedStyle(document.querySelector('.timer-sheet'), '::before').display !== 'none'`,
  )
)
  throw new Error("Focus overlay still covers the timer");
await evaluate(
  `document.querySelector('.start-button').click(); document.querySelector('.reset-button').click()`,
);
await evaluate(
  `(()=>{const input=document.querySelector('.task-form input');input.value='Check the new design';input.dispatchEvent(new Event('input',{bubbles:true}));})()`,
);
await evaluate(`document.querySelector('.task-form').requestSubmit()`);
await waitFor(`document.querySelector('.task-list').textContent.includes('Check the new design')`);
await evaluate(
  `(()=>{const input=document.querySelector('.task-item input');if(!input.checked) input.click()})()`,
);
await waitFor(`document.querySelector('.task-item input').checked`);
const panelHeights = [];
for (const tab of ["closet", "medals", "food"]) {
  await evaluate(
    `document.querySelector('.companion-tabs button:nth-child(${["food", "closet", "medals"].indexOf(tab) + 1})').click()`,
  );
  await waitFor(
    `document.querySelector('.companion-tabs button[aria-pressed="true"]').textContent.toLowerCase().includes('${tab}')`,
  );
  panelHeights.push(
    await evaluate(`document.querySelector('.focus-layout').getBoundingClientRect().height`),
  );
  if (tab === "closet" || tab === "food") await capture(`${tab}-market`);
}
if (Math.max(...panelHeights) - Math.min(...panelHeights) > 1)
  throw new Error(`Dashboard shifted: ${panelHeights.join(", ")}`);
console.log("Stable dashboard heights:", panelHeights);
for (const page of [1, 2]) {
  await evaluate(
    `document.querySelector('.dashboard-help-dock button:nth-child(${page})').focus(); document.querySelector('.dashboard-help-dock button:nth-child(${page})').click()`,
  );
  await waitFor(`document.querySelector('.help-window[open]')`);
  await waitFor(
    `document.querySelector('.help-window[open] .help-window-content').textContent.includes('${page === 1 ? "Your journey" : "Focus & coins"}')`,
  );
  await capture(page === 1 ? "progress-window" : "guide-window");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await waitFor(`!document.querySelector('.help-window[open]')`);
  if (
    !(await evaluate(
      `document.activeElement === document.querySelector('.dashboard-help-dock button:nth-child(${page})')`,
    ))
  )
    throw new Error("Dialog did not return focus");
}
await evaluate(`document.querySelector('.water-hud').click()`);
await waitFor(
  `document.querySelector('.help-window[open]')?.textContent.includes('Water & break rewards')`,
);
await evaluate(`document.querySelector('.help-window[open] .help-window-close').click()`);
await waitFor(`!document.querySelector('.help-window[open]')`);
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await capture("mobile");
await evaluate(`document.querySelector('.dashboard-help-dock button').click()`);
await waitFor(`document.querySelector('.help-window[open]')`);
await capture("mobile-window");
await evaluate(`document.querySelector('.help-window[open] .help-window-close').click()`);
console.log(
  "Mobile:",
  await evaluate(
    `JSON.stringify({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,clockWidth:document.querySelector('.focus-clock').getBoundingClientRect().width})`,
  ),
);
console.log("Runtime errors:", JSON.stringify(errors));
await send("Browser.close");
if (errors.length) process.exitCode = 1;
