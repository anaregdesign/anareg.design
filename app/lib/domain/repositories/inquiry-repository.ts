import type { CustomerProfile } from "~/lib/domain/entities/customer";
import type { Inquiry } from "~/lib/domain/entities/inquiry";

export interface InquiryRepository {
  saveInquiry(inquiry: Inquiry): Promise<void>;
  upsertCustomer(customer: CustomerProfile): Promise<void>;
}
