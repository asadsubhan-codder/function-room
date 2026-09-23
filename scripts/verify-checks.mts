import assert from "node:assert/strict";
import fs from "node:fs";
import { makeCheck, correct, expected, parseNumber } from "../app/checks.ts";
const units = JSON.parse(
  fs.readFileSync(new URL("../app/curriculum.json", import.meta.url), "utf8"),
);
let total = 0;
const errors: string[] = [];
for (const u of units)
  for (const l of u.lessons) {
    assert.ok(l.videos.length >= 2, l.id + " has alternatives");
    assert.ok(l.courseware.length > 0, l.id + " has paper practice");
    for (let seed = 0; seed < 100; seed++) {
      const qs = makeCheck(l.id, seed);
      assert.ok(qs.length >= 4, l.id + " question count");
      for (const q of qs) {
        total++;
        const answer = q.choices ? q.answer : (q.numeric ?? q.accepted?.[0]);
        assert.ok(
          correct(q, String(answer)),
          q.id + " rejects canonical " + answer,
        );
        if (q.choices && new Set(q.choices).size !== q.choices.length)
          errors.push(q.id + " duplicate choices: " + q.choices.join(" | "));
        if (q.numeric !== undefined)
          assert.ok(correct(q, expected(q)), q.id + " display answer rejected");
        assert.ok(!correct(q, ""), q.id + " blank accepted");
      }
    }
  }
assert.deepEqual(errors, []);
for (const [s, n] of [
  ["-2^2", -4],
  ["(-2)^2", 4],
  ["2^-3", 0.125],
  ["1/3", 1 / 3],
  ["5-2*3", -1],
  ["2^3^2", 512],
] as const)
  assert.equal(parseNumber(s), n, s);
for (const v of ["NaN", "Infinity", "1/0", "alert(1)", "3abc", "2**3"])
  assert.equal(parseNumber(v), null, v);
console.log(
  `${total} question variants verified; all lessons have free alternatives and practice. Arithmetic parser checks passed.`,
);
