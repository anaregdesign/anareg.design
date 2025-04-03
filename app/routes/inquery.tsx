import { Header } from "~/components/basic";
import { InqueryForm } from "~/components/form";

export default function Form() {
  return (
    <div className="space-y-4">
      <Header>お問い合わせフォーム</Header>
      <InqueryForm />
    </div>
  );
}
