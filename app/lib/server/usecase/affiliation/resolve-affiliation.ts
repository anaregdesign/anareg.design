import { parseEmailAddress } from "~/lib/domain/value-objects/email-address";

export type GenerateTextInput = {
  maxOutputTokens: number;
  prompt: string;
  system: string;
  temperature: number;
};

export interface TextGenerationGateway {
  generateText(input: GenerateTextInput): Promise<string | undefined>;
}

export class ResolveAffiliationError extends Error {
  constructor(readonly code: "INVALID_EMAIL" | "GATEWAY_FAILED") {
    super(code);
    this.name = "ResolveAffiliationError";
  }
}

const systemMessage = `
<prompt>
  <task>メールアドレスを受け取る</task>
  <instruction>メールアドレスのドメイン名部分を抽出する</instruction>
  <objective>ドメイン名から会社の日本での登記場の正式名称を取得する</objective>
  <output>会社名のみを返す</output>
  <constraints>
    <constraint>会社名以外の情報は出力しない</constraint>
    <constraint>推測できない場合は「」と返す</constraint>
  </constraints>
  <notes>ドメイン名から一般的な会社名を推測するが、確証がない場合は過度な推測を避ける</notes>
</prompt>`;

export async function resolveAffiliationFromEmail({
  email,
  gateway,
}: {
  email: string | undefined;
  gateway: TextGenerationGateway;
}) {
  const parsedEmail = parseEmailAddress(email);

  if (!parsedEmail) {
    throw new ResolveAffiliationError("INVALID_EMAIL");
  }

  try {
    const affiliation = await gateway.generateText({
      system: systemMessage,
      prompt: parsedEmail,
      temperature: 0.0,
      maxOutputTokens: 50,
    });

    return affiliation?.trim() || null;
  } catch {
    throw new ResolveAffiliationError("GATEWAY_FAILED");
  }
}
