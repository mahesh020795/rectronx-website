export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

type ValidationResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

export function normalizeContactSubmission(input: unknown): ContactSubmission {
  const value = isRecord(input) ? input : {};

  return {
    name: toText(value.name).trim(),
    email: toText(value.email).trim().toLowerCase(),
    phone: toText(value.phone).trim(),
    message: toText(value.message).trim(),
    website: toText(value.website).trim(),
  };
}

export function validateContactSubmission(value: ContactSubmission): ValidationResult {
  if (value.website) return { ok: false, error: "Unable to submit this form." };
  if (!value.name || !value.email || !value.message) return { ok: false, error: "Please complete all required fields." };
  if (value.name.length > 100) return { ok: false, error: "Name is too long." };
  if (value.email.length > 254 || !EMAIL_PATTERN.test(value.email)) return { ok: false, error: "Enter a valid email address." };
  if (value.phone.length > 40) return { ok: false, error: "Phone number is too long." };
  if (value.message.length < 10 || value.message.length > 5000) return { ok: false, error: "Message must be between 10 and 5,000 characters." };
  return { ok: true };
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function isRateLimited(key: string, now = Date.now()) {
  if (attempts.size > 10_000) {
    for (const [storedKey, value] of attempts) {
      if (now > value.resetAt) attempts.delete(storedKey);
    }
  }

  const current = attempts.get(key);

  if (!current || now > current.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function toText(value: unknown) {
  return typeof value === "string" ? value : "";
}
