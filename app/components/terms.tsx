import {
  DocumentList,
  DocumentParagraph,
  DocumentSection,
  DocumentTitle,
  StackBlock,
} from "./ui";

export default function TermsBody() {
  return (
    <StackBlock>
      <DocumentTitle>【個人情報取扱規約】</DocumentTitle>

      <DocumentSection title="1. 目的">
        <DocumentParagraph>
          本規約は、当サイトからご提供いただく個人情報の取扱いについて定め、利用者のプライバシー保護に努めることを目的とします。
        </DocumentParagraph>
      </DocumentSection>

      <DocumentSection title="2. 取り扱う個人情報の範囲">
        <DocumentParagraph>
          本規約で対象とする個人情報は、以下の情報を含みます。
        </DocumentParagraph>
        <DocumentList>
          <li>氏名（姓・名）</li>
          <li>メールアドレス</li>
          <li>ご所属、部署</li>
          <li>お問合せ内容</li>
        </DocumentList>
        <DocumentParagraph spaced>
          ※その他、本サイト上で自発的にご提供いただく情報も対象となります。
        </DocumentParagraph>
      </DocumentSection>

      <DocumentSection title="3. 利用目的">
        <DocumentParagraph>
          ご提供いただいた情報は、<strong>ご案内の送付</strong>
          および関係各種連絡のためにのみ利用いたします。法令に基づく場合を除き、他の目的での利用は一切行いません。
        </DocumentParagraph>
      </DocumentSection>

      <DocumentSection title="4. 個人情報の保管期間・廃棄">
        <DocumentParagraph>
          個人情報は、利用目的を達成するために必要な期間内で管理し、目的達成後または利用者の同意撤回時には、適切な方法により速やかに廃棄いたします。
        </DocumentParagraph>
      </DocumentSection>

      <DocumentSection title="5. 情報の管理措置">
        <DocumentParagraph>
          個人情報の漏洩、不正アクセス、紛失等を防止するため、合理的な安全管理措置（技術的措置・組織的措置）を講じ、情報の保護に努めます。
        </DocumentParagraph>
      </DocumentSection>

      <DocumentSection title="6. 第三者提供の制限">
        <DocumentParagraph>
          利用者の同意がない限り、法令に定める場合や人の生命、身体または財産の保護のために必要な場合を除き、第三者に個人情報を提供することはありません。
        </DocumentParagraph>
        <DocumentParagraph>
          また、個人情報を第三者に提供する場合は、事前に利用者に通知し、同意を得るものとします。
        </DocumentParagraph>
      </DocumentSection>

      <DocumentSection title="7. 利用者の権利及びご要望の窓口">
        <DocumentParagraph>
          利用者は、自己の個人情報に関する開示、訂正、利用停止、削除等を要求する権利があります。これらのご要求につきましては、当サイトのお問い合わせフォームよりお知らせください。合理的な範囲で速やかに対応いたします。
        </DocumentParagraph>
      </DocumentSection>

      <DocumentSection title="8. 規約の改定">
        <DocumentParagraph>
          本規約は、法令改正や業務内容の変更に応じて予告なく変更されることがあります。変更後は、本サイト上に掲載された時点で効力を生じます。
        </DocumentParagraph>
      </DocumentSection>
    </StackBlock>
  );
}
