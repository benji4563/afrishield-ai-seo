// Run: node --test engine/tests
import test from "node:test";
import assert from "node:assert/strict";
import { similarity, compareToCorpus, angleMarkers, buildIdf } from "../lib/similarity.mjs";
import { parseCsv, objectsToCsv, csvToObjects } from "../lib/csv.mjs";
import { allocateId, transition, loadConfig } from "../lib/core.mjs";
import { screenClaims, normalizeCta, isLabeledHypothetical } from "../lib/classify.mjs";

const cfg = loadConfig();
const T = { duplicate: cfg.dedupe.duplicate_threshold, related: cfg.dedupe.related_threshold };

test("master-prompt example: reworded hotel/ChatGPT idea is a duplicate", () => {
  const corpus = [{ content_id: "AFR-CONTENT-000001", topic: "Why ChatGPT doesn't recommend your hotel", hook: "Why ChatGPT doesn't recommend your hotel" }];
  const r = compareToCorpus({ topic: "Why your hotel is invisible in ChatGPT", hook: "Why your hotel is invisible in ChatGPT" }, corpus, T);
  assert.equal(r.verdict, "DUPLICATE");
});

test("master-prompt example: original research on the same theme is related with NEW_PROOF, not duplicate", () => {
  const corpus = [{ content_id: "AFR-CONTENT-000001", topic: "Why ChatGPT doesn't recommend your hotel", hook: "Why ChatGPT doesn't recommend your hotel" }];
  const idea = { topic: "I tested 20 Tanzanian hotels in ChatGPT", hook: "I tested 20 Tanzanian hotels in ChatGPT — here's what I found" };
  const r = compareToCorpus(idea, corpus, T);
  assert.notEqual(r.verdict, "DUPLICATE");
  assert.ok(angleMarkers(idea.hook).has("NEW_PROOF"));
});

test("unrelated ideas are distinct", () => {
  const s = similarity("My AI assistant cleared 40 emails before breakfast", "Here lies 'best safari Africa'. RIP.", buildIdf(["a"]));
  assert.ok(s < T.related, `score ${s}`);
});

test("CSV round-trips quotes, commas and the em dash", () => {
  const rows = [{ Hook: 'He said "hi", then left — fast', CTA: 'Comment "AI"' }];
  const back = csvToObjects(objectsToCsv(rows, ["Hook", "CTA"]));
  assert.deepEqual(back, rows);
  assert.equal(parseCsv('a,"b\nc"\n1,2').length, 2);
});

test("IDs are never reused after an item disappears", () => {
  const db = { meta: { id_counters: {} }, items: [{ content_id: "AFR-CONTENT-000005" }] };
  assert.equal(allocateId(db, "AFR-CONTENT-", 6, "content_id"), "AFR-CONTENT-000006");
  db.items = [];
  assert.equal(allocateId(db, "AFR-CONTENT-", 6, "content_id"), "AFR-CONTENT-000007");
});

test("lifecycle gates: no SCHEDULED without QA, no PUBLISHED without approval", () => {
  const item = { content_id: "X", status: "QA", history: [] };
  assert.throws(() => transition(cfg, item, "SCHEDULED"), /QA has not passed/);
  item.qa = { passed: true };
  transition(cfg, item, "SCHEDULED");
  assert.throws(() => transition(cfg, item, "PUBLISHED"), /approval/);
  assert.throws(() => transition(cfg, { content_id: "Y", status: "IDEA", history: [] }, "PUBLISHED"), /not an allowed transition/);
});

test("autopilot items cannot be APPROVED without a recorded human approval", () => {
  const item = { content_id: "Z", status: "SCORED", source: { type: "autopilot" }, history: [] };
  assert.throws(() => transition(cfg, item, "APPROVED"), /calendar approval/);
});

test("claim screen separates invented events from labeled hypotheticals", () => {
  assert.ok(screenClaims("A hotel owner showed me his analytics.").some((c) => c.type === "THIRD_PARTY_EVENT"));
  assert.ok(isLabeledHypothetical("Imagine a lodge owner who pays 18% to OTAs."));
  assert.ok(screenClaims("This lodge has 4.9 stars and 300 reviews.").some((c) => c.type === "STATISTIC"));
});

test("CTA normalization collapses quote variants", () => {
  assert.equal(normalizeCta('Comment "AI"'), normalizeCta("Comment “AI”"));
  assert.equal(normalizeCta("DM “AUDIT”"), "Dm AUDIT");
});
