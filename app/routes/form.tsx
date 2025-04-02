import { InqueryForm } from "~/components/form";

export default function Form() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">お問合せフォーム</h1>
      <p>以下のフォームに必要事項をご記入の上、送信してください。</p>
      <InqueryForm />
    </div>
  );
}
