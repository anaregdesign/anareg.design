import type { LoaderFunctionArgs } from "react-router";

import { geminiTextGenerationGateway } from "~/lib/server/infrastructure/gateways/gemini-text-generation-gateway.server";
import {
  resolveAffiliationFromEmail,
  ResolveAffiliationError,
} from "~/lib/server/usecase/affiliation/resolve-affiliation";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const affiliation = await resolveAffiliationFromEmail({
      email: params.email,
      gateway: geminiTextGenerationGateway,
    });

    if (!affiliation) {
      return new Response("No affiliation found", { status: 404 });
    }

    return Response.json({ affiliation });
  } catch (error) {
    if (error instanceof ResolveAffiliationError) {
      return new Response(
        error.code === "INVALID_EMAIL" ? "Invalid email" : "Gateway error",
        {
          status: error.code === "INVALID_EMAIL" ? 400 : 502,
        },
      );
    }

    return new Response("Error", { status: 500 });
  }
}
