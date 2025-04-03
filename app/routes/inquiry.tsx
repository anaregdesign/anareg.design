import { useState } from "react";
import { Header } from "~/components/basic";
import { InquiryForm } from "~/components/form";
import TermOfUse from "./terms";

export default function Form() {
  const [showTerms, setShowTerms] = useState(false);
  return (
    <div className="space-y-4 my-8 z-0">
      <Header>お問い合わせフォーム</Header>
      <InquiryForm />
      <div
        className="text-center underline text-blue-500 cursor-pointer"
        onClick={() => setShowTerms(!showTerms)}
      >
        個人情報の取り扱いについて
      </div>
      {showTerms && (
        <div className="relative">
          <button
            onClick={() => setShowTerms(false)}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close"
          >
            ✕
          </button>
          <TermOfUse />
        </div>
      )}
    </div>
  );
}
