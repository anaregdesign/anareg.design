import { Header, Section } from "~/components/basic";
import { InquiryForm } from "~/components/form";

export default function Form() {
  return (
    <div className="space-y-4">
      <Section>
        <Header>お問い合わせフォーム</Header>
        <InquiryForm />
      </Section>
    </div>
  );
}
