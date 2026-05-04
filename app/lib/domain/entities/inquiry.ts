import type { EmailAddress } from "~/lib/domain/value-objects/email-address";
import { normalizeRequiredText } from "~/lib/domain/value-objects/required-text";

export type Inquiry = {
  lastName: string;
  firstName: string;
  affiliation: string;
  department: string;
  email: EmailAddress;
  inquiry: string;
  consent: true;
  createdAt: Date;
  ipAddress: string | null;
};

export type CreateInquiryInput = Omit<Inquiry, "consent"> & {
  consent: boolean;
};

export function createInquiry(input: CreateInquiryInput): Inquiry {
  if (!input.consent) {
    throw new Error("Consent is required to submit an inquiry.");
  }

  return {
    lastName: normalizeRequiredText(input.lastName, "lastName"),
    firstName: normalizeRequiredText(input.firstName, "firstName"),
    affiliation: normalizeRequiredText(input.affiliation, "affiliation"),
    department: normalizeRequiredText(input.department, "department"),
    email: input.email,
    inquiry: normalizeRequiredText(input.inquiry, "inquiry"),
    consent: true,
    createdAt: input.createdAt,
    ipAddress: input.ipAddress,
  };
}
