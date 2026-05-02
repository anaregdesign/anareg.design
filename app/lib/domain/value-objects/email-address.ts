export type EmailAddress = string & {
  readonly __emailAddressBrand: unique symbol;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailAddress(value: string): value is EmailAddress {
  return emailPattern.test(value);
}

export function parseEmailAddress(value: unknown): EmailAddress | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (!isEmailAddress(normalized)) {
    return null;
  }

  return normalized;
}
