import { test } from "node:test";
import assert from "node:assert/strict";
import { behaviorCooldown, chooseBehavior, behaviorDurations } from "./behaviors.ts";
import { accessories } from "./accessories.ts";
import { coatCatalog, coatFrame } from "./coats.ts";
import { existsSync, readFileSync } from "node:fs";
test("every coat has distinct artwork for every pose", () => {
  const frames = new Set();
  for (let coat = 0; coat < coatCatalog.length; coat++) {
    for (const pose of ["idle", "rest", "stretch", "drink", "bed"]) {
      const frame = coatFrame(coat, pose);
      assert.ok(existsSync(new URL(`../../public${frame.src}`, import.meta.url)));
      frames.add(`${frame.src}:${frame.viewBox}`);
    }
    assert.deepEqual(coatFrame(coat, "ears"), coatFrame(coat, "idle"));
    assert.deepEqual(coatFrame(coat, "pet"), coatFrame(coat, "idle"));
  }
  assert.equal(frames.size, coatCatalog.length * 5);
});
test("sitting coats keep the original canvas and pose crops use their actual raster sizes", () => {
  const size = (src) => {
    const bytes = readFileSync(new URL(`../../public${src}`, import.meta.url));
    let offset = 12;
    while (offset < bytes.length) {
      const tag = bytes.toString("ascii", offset, offset + 4);
      const length = bytes.readUInt32LE(offset + 4);
      if (tag === "VP8L") {
        assert.equal(bytes[offset + 8], 0x2f);
        const bits = bytes.readUInt32LE(offset + 9);
        return [1 + (bits & 0x3fff), 1 + ((bits >>> 14) & 0x3fff)];
      }
      offset += 8 + length + (length % 2);
    }
    assert.fail(`Expected lossless WebP: ${src}`);
  };
  const sitting = size(coatFrame(0).src);
  assert.deepEqual(sitting, [1296, 1213]);
  for (let coat = 0; coat < coatCatalog.length; coat++) {
    assert.deepEqual(size(coatFrame(coat).src), sitting);
    const frame = coatFrame(coat, "bed");
    assert.deepEqual(size(frame.src), [frame.width, frame.height]);
    assert.deepEqual(frame.viewBox.split(" ").map(Number), [
      frame.width / 2,
      frame.height / 2,
      frame.width / 2,
      frame.height / 2,
    ]);
  }
  assert.deepEqual(coatFrame(Number.NaN), coatFrame(0));
});
test("random behaviors have a 25–40 second cooldown and resting lasts minutes", () => {
  assert.equal(behaviorCooldown(0), 25000);
  assert.equal(behaviorCooldown(1), 40000);
  assert.equal(behaviorDurations.rest, 180000);
  assert.equal(behaviorDurations.bed, 240000);
});
test("drinking is excluded without water and focus uses quiet behaviors", () => {
  for (let n = 0; n <= 100; n++) {
    assert.notEqual(chooseBehavior("idle", 0, false, n / 100), "drink");
    assert.ok(["ears", "tail", "rest"].includes(chooseBehavior("idle", 8, true, n / 100)));
  }
});
test("consecutive random behaviors differ and all have finite durations", () => {
  for (const previous of Object.keys(behaviorDurations)) {
    for (let n = 0; n <= 10; n++) {
      const next = chooseBehavior(previous, 8, false, n / 10);
      assert.notEqual(next, previous);
      assert.ok(behaviorDurations[next] > 0);
    }
  }
});
test("accessories map to distinct artwork and the correct equipped slot", () => {
  assert.equal(accessories[0].art, "bow");
  assert.equal(accessories[0].kind, "bow");
  assert.equal(accessories[4].art, "hat");
  assert.equal(accessories[4].kind, "hat");
  assert.equal(new Set(accessories.map((i) => i.art)).size, 11);
  for (const item of accessories) assert.equal(item.slot, item.id % 2 ? "head" : "neck");
});
