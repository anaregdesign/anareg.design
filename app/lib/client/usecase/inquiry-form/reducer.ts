import type {
  AffiliationStatus,
  InquiryFormFieldName,
  InquiryFormState,
} from "./state";

export type InquiryFormAction =
  | {
      type: "fieldChanged";
      name: InquiryFormFieldName;
      value: string | boolean;
    }
  | { type: "previewRequested" }
  | { type: "editRequested" }
  | { type: "affiliationStatusChanged"; status: AffiliationStatus }
  | { type: "affiliationResolved"; affiliation: string };

export function inquiryFormReducer(
  state: InquiryFormState,
  action: InquiryFormAction,
): InquiryFormState {
  switch (action.type) {
    case "fieldChanged":
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.name]: action.value,
        },
        affiliationStatus:
          action.name === "email" ? "idle" : state.affiliationStatus,
      };
    case "previewRequested":
      return {
        ...state,
        isConfirmingSubmission: true,
      };
    case "editRequested":
      return {
        ...state,
        isConfirmingSubmission: false,
      };
    case "affiliationStatusChanged":
      return {
        ...state,
        affiliationStatus: action.status,
      };
    case "affiliationResolved":
      return {
        ...state,
        affiliationStatus: "resolved",
        fields: {
          ...state.fields,
          affiliation: action.affiliation,
        },
      };
  }
}
