import { useState } from "react";

import { Button } from "~/components/shared/Button";
import { Header } from "~/components/shared/Header";
import { StackBlock } from "~/components/shared/StackBlock";
import { TermsBody } from "~/components/terms/TermsBody";
import { useInquiryForm } from "~/lib/client/usecase/inquiry-form/use-inquiry-form";

import { InquiryForm } from "./InquiryForm";
import styles from "./InquiryPage.module.css";

export function InquiryPage() {
  const [showTerms, setShowTerms] = useState(false);
  const inquiryForm = useInquiryForm();

  return (
    <StackBlock>
      <Header>お問い合わせフォーム</Header>
      <InquiryForm {...inquiryForm} />
      <Button
        block
        density="plain"
        onClick={() => setShowTerms((current) => !current)}
        variant="link"
      >
        個人情報の取り扱いについて
      </Button>
      {showTerms && (
        <div className={styles.relativePanel}>
          <Button
            aria-label="Close"
            className={styles.closeTopRight}
            density="plain"
            onClick={() => setShowTerms(false)}
            type="button"
            variant="icon"
          >
            ✕
          </Button>
          <TermsBody />
        </div>
      )}
    </StackBlock>
  );
}
