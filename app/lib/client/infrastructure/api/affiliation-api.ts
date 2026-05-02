export async function resolveAffiliationByEmail(
  email: string,
  signal?: AbortSignal,
): Promise<string | null> {
  const response = await fetch(
    `/api/v1/ai/domains/${encodeURIComponent(email)}`,
    { signal },
  );

  if (response.status === 400 || response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to resolve affiliation.");
  }

  const data: unknown = await response.json();

  if (!isAffiliationResponse(data)) {
    return null;
  }

  return data.affiliation.trim() || null;
}

function isAffiliationResponse(
  value: unknown,
): value is { affiliation: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "affiliation" in value &&
    typeof value.affiliation === "string"
  );
}
