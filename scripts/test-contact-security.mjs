import assert from "node:assert/strict";
import {
  escapeHtml,
  isRateLimited,
  normalizeContactSubmission,
  validateContactSubmission,
} from "../lib/contact-security.ts";

assert.equal(
  escapeHtml('<img src=x onerror="alert(1)">&'),
  "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&amp;",
  "HTML must be escaped before email rendering",
);

const normalized = normalizeContactSubmission({
  name: "  Mahesh  ",
  email: " USER@Example.COM ",
  phone: " +60 14 860 0454 ",
  message: "  Project details  ",
  website: "",
});

assert.deepEqual(normalized, {
  name: "Mahesh",
  email: "user@example.com",
  phone: "+60 14 860 0454",
  message: "Project details",
  website: "",
});

assert.equal(validateContactSubmission(normalized).ok, true);
assert.equal(validateContactSubmission({ ...normalized, email: "not-an-email" }).ok, false);
assert.equal(validateContactSubmission({ ...normalized, website: "https://spam.example" }).ok, false);
assert.equal(validateContactSubmission({ ...normalized, message: "x".repeat(5001) }).ok, false);
assert.equal(validateContactSubmission({ ...normalized, name: "" }).ok, false);

for (let attempt = 0; attempt < 5; attempt += 1) {
  assert.equal(isRateLimited("test-ip", 1_000), false);
}
assert.equal(isRateLimited("test-ip", 1_000), true);
assert.equal(isRateLimited("test-ip", 1_000 + 15 * 60 * 1_000 + 1), false);

console.log("Contact security tests passed.");
