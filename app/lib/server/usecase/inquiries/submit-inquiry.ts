import {
  createCustomerProfile,
  type CustomerProfile,
} from "~/lib/domain/entities/customer";
import { createInquiry, type Inquiry } from "~/lib/domain/entities/inquiry";
import type { InquiryRepository } from "~/lib/domain/repositories/inquiry-repository";
import { parseEmailAddress } from "~/lib/domain/value-objects/email-address";

export type SubmitInquiryInput = {
  lastName: string;
  firstName: string;
  affiliation: string;
  department: string;
  email: string;
  inquiry: string;
  consent: boolean;
  ipAddress: string | null;
};

export class SubmitInquiryError extends Error {
  constructor(
    readonly code: "VALIDATION_FAILED" | "PERSISTENCE_FAILED",
    message: string,
  ) {
    super(message);
    this.name = "SubmitInquiryError";
  }
}

export async function submitInquiry({
  input,
  repository,
}: {
  input: SubmitInquiryInput;
  repository: InquiryRepository;
}) {
  const email = parseEmailAddress(input.email);

  if (!email) {
    throw new SubmitInquiryError(
      "VALIDATION_FAILED",
      "A valid email address is required.",
    );
  }

  let inquiry: Inquiry;
  let customer: CustomerProfile;

  try {
    const now = new Date();

    inquiry = createInquiry({
      ...input,
      email,
      createdAt: now,
    });
    customer = createCustomerProfile({
      lastName: input.lastName,
      firstName: input.firstName,
      affiliation: input.affiliation,
      department: input.department,
      email,
      updatedAt: now,
      ipAddress: input.ipAddress,
    });
  } catch (error) {
    throw new SubmitInquiryError(
      "VALIDATION_FAILED",
      error instanceof Error ? error.message : "Invalid inquiry input.",
    );
  }

  try {
    await repository.saveInquiry(inquiry);
    await repository.upsertCustomer(customer);
  } catch (error) {
    throw new SubmitInquiryError(
      "PERSISTENCE_FAILED",
      error instanceof Error ? error.message : "Failed to save inquiry.",
    );
  }
}
