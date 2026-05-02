import { useState } from "react";
import { Header } from "~/components/basic";
import { InquiryForm } from "~/components/form";
import { Button, CloseButton, RelativePanel, StackBlock } from "~/components/ui";
import TermOfUse from "./terms";

export default function Form() {
  const [showTerms, setShowTerms] = useState(false);
  return (
    <StackBlock>
      <Header>お問い合わせフォーム</Header>
      <InquiryForm />
      <Button
        block
        density="plain"
        onClick={() => setShowTerms(!showTerms)}
        variant="link"
      >
        個人情報の取り扱いについて
      </Button>
      {showTerms && (
        <RelativePanel>
          <CloseButton onClick={() => setShowTerms(false)}>
            ✕
          </CloseButton>
          <TermOfUse />
        </RelativePanel>
      )}
    </StackBlock>
  );
}
