import React, { useEffect } from "react";
import { Header, Section } from "~/components/basic";

export default function ThankYou() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 5000);
    return () => clearTimeout(timer);
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
