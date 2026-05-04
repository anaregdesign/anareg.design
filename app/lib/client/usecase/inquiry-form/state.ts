export type InquiryFormFields = {
  lastName: string;
  firstName: string;
  email: string;
  affiliation: string;
  department: string;
  inquiry: string;
  consent: boolean;
};

export type InquiryFormFieldName = keyof InquiryFormFields;

export type AffiliationStatus = "idle" | "loading" | "resolved" | "error";
export type AffiliationValueSource = "empty" | "manual" | "resolved";

export type InquiryFormState = {
  fields: InquiryFormFields;
  isConfirmingSubmission: boolean;
  affiliationStatus: AffiliationStatus;
  affiliationValueSource: AffiliationValueSource;
};

export const initialInquiryFormState: InquiryFormState = {
  fields: {
    lastName: "",
    firstName: "",
    email: "",
    affiliation: "",
    department: "",
    inquiry: "",
    consent: false,
  },
  isConfirmingSubmission: false,
  affiliationStatus: "idle",
  affiliationValueSource: "empty",
};

export function isInquiryFormFieldName(
  value: string,
): value is InquiryFormFieldName {
  return value in initialInquiryFormState.fields;
}
