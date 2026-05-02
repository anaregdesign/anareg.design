import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";

import { createFirestoreInquiryRepository } from "~/lib/server/infrastructure/repositories/firestore-inquiry-repository.server";
import {
  submitInquiry,
  SubmitInquiryError,
  type SubmitInquiryInput,
} from "~/lib/server/usecase/inquiries/submit-inquiry";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("website")) {
    return new Response("OK", { status: 200 });
  }

  try {
    await submitInquiry({
      input: parseInquiryFormData(formData, getClientIpAddress(request)),
      repository: createFirestoreInquiryRepository(),
    });

    return redirect("/complete");
  } catch (error) {
    if (error instanceof SubmitInquiryError) {
      return new Response(
        error.code === "VALIDATION_FAILED" ? error.message : "Error",
        {
          status: error.code === "VALIDATION_FAILED" ? 400 : 500,
        },
      );
    }

    return new Response("Error", { status: 500 });
  }
}

function parseInquiryFormData(
  formData: FormData,
  ipAddress: string | null,
): SubmitInquiryInput {
  return {
    lastName: readFormString(formData, "lastName"),
    firstName: readFormString(formData, "firstName"),
    affiliation: readFormString(formData, "affiliation"),
    department: readFormString(formData, "department"),
    email: readFormString(formData, "email"),
    inquiry: readFormString(formData, "inquiry"),
    consent: readFormBoolean(formData, "consent"),
    ipAddress,
  };
}

function readFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function readFormBoolean(formData: FormData, key: string) {
  const value = formData.get(key);

  return value === "on" || value === "true";
}

function getClientIpAddress(request: Request) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  const xRealIp = request.headers.get("x-real-ip");

  return (
    (xForwardedFor ? xForwardedFor.split(",")[0].trim() : null) ||
    xRealIp ||
    request.headers.get("cf-connecting-ip") ||
    null
  );
}
