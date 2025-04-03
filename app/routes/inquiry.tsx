import { Header, Section } from "~/components/basic";
import { InquiryForm } from "~/components/form";

export default function Form() {
  return (
    <div className="space-y-4 my-8 z-0">
      <Header>お問い合わせフォーム</Header>
      <InquiryForm />
    </div>
  );
}
