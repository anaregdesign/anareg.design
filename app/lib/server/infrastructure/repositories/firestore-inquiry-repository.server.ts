import type { Firestore } from "@google-cloud/firestore";

import type { CustomerProfile } from "~/lib/domain/entities/customer";
import type { Inquiry } from "~/lib/domain/entities/inquiry";
import type { InquiryRepository } from "~/lib/domain/repositories/inquiry-repository";
import { getFirestore } from "~/lib/server/infrastructure/config/firestore.server";

export class FirestoreInquiryRepository implements InquiryRepository {
  constructor(private readonly db: Firestore) {}

  async saveInquiry(inquiry: Inquiry) {
    await this.db
      .collection("inquiries")
      .doc(inquiry.createdAt.toISOString())
      .set(toInquiryRecord(inquiry));
  }

  async upsertCustomer(customer: CustomerProfile) {
    const customerRef = this.db.collection("customers").doc(customer.email);
    const existingCustomerDoc = await customerRef.get();

    if (existingCustomerDoc.exists) {
      await customerRef.update(toCustomerRecord(customer));
      return;
    }

    await customerRef.set({
      ...toCustomerRecord(customer),
      createdAt: customer.updatedAt,
    });
  }
}

export function createFirestoreInquiryRepository(): InquiryRepository {
  return new FirestoreInquiryRepository(getFirestore());
}

function toInquiryRecord(inquiry: Inquiry) {
  return {
    lastName: inquiry.lastName,
    firstName: inquiry.firstName,
    affiliation: inquiry.affiliation,
    department: inquiry.department,
    email: inquiry.email,
    inquiry: inquiry.inquiry,
    consent: inquiry.consent,
    createdAt: inquiry.createdAt,
    ipAddress: inquiry.ipAddress,
  };
}

function toCustomerRecord(customer: CustomerProfile) {
  return {
    lastName: customer.lastName,
    firstName: customer.firstName,
    affiliation: customer.affiliation,
    department: customer.department,
    email: customer.email,
    updatedAt: customer.updatedAt,
    ipAddress: customer.ipAddress,
  };
}
