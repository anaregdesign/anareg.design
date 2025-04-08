import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ai } from "~/services/ai.gemini";

const systemMessage = `
<prompt>
  <task>メールアドレスを受け取る</task>
  <instruction>メールアドレスのドメイン名部分を抽出する</instruction>
  <objective>ドメイン名から会社の日本での登記場の正式名称を取得する</objective>
  <output>会社名のみを返す</output>
  <constraints>
    <constraint>会社名以外の情報は出力しない</constraint>
    <constraint>推測できない場合は「」と返す</constraint>
    <constraint>gmail.comやyahoo.co.jpなどの一般的なドメイン名の場合は「個人」とする</constraint>
  </constraints>
  <notes>ドメイン名から一般的な会社名を推測するが、確証がない場合は過度な推測を避ける</notes>
</prompt>`;

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await ai.generate({
    system: systemMessage,
    prompt: params.email,
    config: {
      temperature: 0.0,
      maxOutputTokens: 50,
    },
  });
  const affiliation = response.message?.content[0].text;
  if (!affiliation) {
    return new Response("No affiliation found", { status: 404 });
  }

  return Response.json({ affiliation });
}
