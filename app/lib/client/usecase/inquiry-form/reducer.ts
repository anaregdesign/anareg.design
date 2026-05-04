import type {
  AffiliationStatus,
  AffiliationValueSource,
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
        affiliationValueSource:
          action.name === "affiliation" && typeof action.value === "string"
            ? getManualAffiliationSource(action.value)
            : state.affiliationValueSource,
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
      if (
        state.affiliationValueSource === "manual" &&
        state.fields.affiliation.trim()
      ) {
        return {
          ...state,
          affiliationStatus: "resolved",
        };
      }

      return {
        ...state,
        affiliationStatus: "resolved",
        fields: {
          ...state.fields,
          affiliation: action.affiliation,
        },
        affiliationValueSource: "resolved",
      };
  }
}

function getManualAffiliationSource(value: string): AffiliationValueSource {
  return value.trim() ? "manual" : "empty";
}
