import { useEffect } from "react";

import { Header } from "~/components/shared/Header";
import { Section } from "~/components/shared/Section";

export function CompletePage() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div>
      <Section>
        <Header>お問い合わせありがとうございます。</Header>
        <p>順次ご連絡させていただきます。今しばらくお待ちくださいませ。</p>
        <p>5秒後にトップページに戻ります。</p>
      </Section>
    </div>
  );
}
