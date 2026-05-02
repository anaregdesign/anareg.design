import { useEffect, useMemo, useReducer } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { resolveAffiliationByEmail } from "~/lib/client/infrastructure/api/affiliation-api";
import { isEmailAddress } from "~/lib/domain/value-objects/email-address";

import { inquiryFormReducer } from "./reducer";
import { selectConfirmationRows } from "./selectors";
import type { ConfirmationRow } from "./selectors";
import {
  initialInquiryFormState,
  isInquiryFormFieldName,
  type InquiryFormFields,
  type InquiryFormState,
} from "./state";

type FieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type UseInquiryFormResult = {
  state: InquiryFormState;
  fields: InquiryFormFields;
  confirmationRows: ConfirmationRow[];
  handleFieldChange(event: FieldChangeEvent): void;
  handlePreview(event: FormEvent<HTMLFormElement>): void;
  handleEdit(): void;
};

export function useInquiryForm(): UseInquiryFormResult {
  const [state, dispatch] = useReducer(
    inquiryFormReducer,
    initialInquiryFormState,
  );
  const { email } = state.fields;

  useEffect(() => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!isEmailAddress(normalizedEmail)) {
      dispatch({ type: "affiliationStatusChanged", status: "idle" });
      return;
    }

    const abortController = new AbortController();
    const timer = window.setTimeout(() => {
      dispatch({ type: "affiliationStatusChanged", status: "loading" });

      void resolveAffiliationByEmail(normalizedEmail, abortController.signal)
        .then((affiliation) => {
          if (affiliation) {
            dispatch({ type: "affiliationResolved", affiliation });
            return;
          }

          dispatch({ type: "affiliationStatusChanged", status: "idle" });
        })
        .catch((error: unknown) => {
          if (isAbortError(error)) {
            return;
          }

          dispatch({ type: "affiliationStatusChanged", status: "error" });
        });
    }, 500);

    return () => {
      window.clearTimeout(timer);
      abortController.abort();
    };
  }, [email]);

  const confirmationRows = useMemo(
    () => selectConfirmationRows(state.fields),
    [state.fields],
  );

  return {
    state,
    fields: state.fields,
    confirmationRows,
    handleFieldChange(event) {
      const { name, type, value } = event.target;

      if (!isInquiryFormFieldName(name)) {
        return;
      }

      const nextValue =
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value;

      dispatch({ type: "fieldChanged", name, value: nextValue });
    },
    handlePreview(event) {
      event.preventDefault();
      dispatch({ type: "previewRequested" });
    },
    handleEdit() {
      dispatch({ type: "editRequested" });
    },
  };
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}
