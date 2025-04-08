import { ActionFunctionArgs } from "@remix-run/node";
import { ai } from "~/services/ai.gemini";

const systemMessage = `
<prompt>
  <task>メールアドレスを受け取る</task>
  <instruction>メールアドレスのドメイン名部分を抽出する</instruction>
  <objective>ドメイン名から会社名を推測する</objective>
  <output>会社名のみを返す</output>
  <constraints>
    <constraint>会社名以外の情報は出力しない</constraint>
    <constraint>株式会社や有限会社などの情報は極力つける。</constraint>
    <constraint>推測できない場合は「不明」と返す</constraint>
  </constraints>
  <notes>ドメイン名から一般的な会社名を推測するが、確証がない場合は過度な推測を避ける</notes>
</prompt>`;

export async function action({ request }: ActionFunctionArgs) {
    const body = await request.json();
    const email = body.email;

    const response = await ai.generate({
        system: systemMessage,
        prompt: email,
    });
    return Response.json({status: response})
}
