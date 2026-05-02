import type { EmailAddress } from "~/lib/domain/value-objects/email-address";

export type CustomerProfile = {
  lastName: string;
  firstName: string;
  affiliation: string;
  department: string;
  email: EmailAddress;
  updatedAt: Date;
  ipAddress: string | null;
};

export type CreateCustomerProfileInput = CustomerProfile;

export function createCustomerProfile(
  input: CreateCustomerProfileInput,
): CustomerProfile {
  return {
    lastName: normalizeRequiredText(input.lastName, "lastName"),
    firstName: normalizeRequiredText(input.firstName, "firstName"),
    affiliation: normalizeRequiredText(input.affiliation, "affiliation"),
    department: normalizeRequiredText(input.department, "department"),
    email: input.email,
    updatedAt: input.updatedAt,
    ipAddress: input.ipAddress,
  };
}

function normalizeRequiredText(value: string, fieldName: string) {
  const normalized = value.trim();

  if (!normalized) {
    throw new Error(`${fieldName} is required.`);
  }

  return normalized;
}
