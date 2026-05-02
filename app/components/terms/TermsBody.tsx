import { StackBlock } from "~/components/shared/StackBlock";

import styles from "./TermsBody.module.css";

export function TermsBody() {
  return (
    <StackBlock>
      <h2 className={styles.documentTitle}>【個人情報取扱規約】</h2>

      <section className={styles.documentSection}>
        <h3 className={styles.documentHeading}>1. 目的</h3>
        <p className={styles.documentParagraph}>
          本規約は、当サイトからご提供いただく個人情報の取扱いについて定め、利用者のプライバシー保護に努めることを目的とします。
        </p>
      </section>

      <section className={styles.documentSection}>
        <h3 className={styles.documentHeading}>2. 取り扱う個人情報の範囲</h3>
        <p className={styles.documentParagraph}>
          本規約で対象とする個人情報は、以下の情報を含みます。
        </p>
        <ul className={styles.documentList}>
          <li>氏名（姓・名）</li>
          <li>メールアドレス</li>
          <li>ご所属、部署</li>
          <li>お問合せ内容</li>
        </ul>
        <p className={styles.documentParagraphSpaced}>
          ※その他、本サイト上で自発的にご提供いただく情報も対象となります。
        </p>
      </section>

      <section className={styles.documentSection}>
        <h3 className={styles.documentHeading}>3. 利用目的</h3>
        <p className={styles.documentParagraph}>
          ご提供いただいた情報は、<strong>ご案内の送付</strong>
          および関係各種連絡のためにのみ利用いたします。法令に基づく場合を除き、他の目的での利用は一切行いません。
        </p>
      </section>

      <section className={styles.documentSection}>
        <h3 className={styles.documentHeading}>4. 個人情報の保管期間・廃棄</h3>
        <p className={styles.documentParagraph}>
          個人情報は、利用目的を達成するために必要な期間内で管理し、目的達成後または利用者の同意撤回時には、適切な方法により速やかに廃棄いたします。
        </p>
      </section>

      <section className={styles.documentSection}>
        <h3 className={styles.documentHeading}>5. 情報の管理措置</h3>
        <p className={styles.documentParagraph}>
          個人情報の漏洩、不正アクセス、紛失等を防止するため、合理的な安全管理措置（技術的措置・組織的措置）を講じ、情報の保護に努めます。
        </p>
      </section>

      <section className={styles.documentSection}>
        <h3 className={styles.documentHeading}>6. 第三者提供の制限</h3>
        <p className={styles.documentParagraph}>
          利用者の同意がない限り、法令に定める場合や人の生命、身体または財産の保護のために必要な場合を除き、第三者に個人情報を提供することはありません。
        </p>
        <p className={styles.documentParagraph}>
          また、個人情報を第三者に提供する場合は、事前に利用者に通知し、同意を得るものとします。
        </p>
      </section>

      <section className={styles.documentSection}>
        <h3 className={styles.documentHeading}>
          7. 利用者の権利及びご要望の窓口
        </h3>
        <p className={styles.documentParagraph}>
          利用者は、自己の個人情報に関する開示、訂正、利用停止、削除等を要求する権利があります。これらのご要求につきましては、当サイトのお問い合わせフォームよりお知らせください。合理的な範囲で速やかに対応いたします。
        </p>
      </section>

      <section className={styles.documentSection}>
        <h3 className={styles.documentHeading}>8. 規約の改定</h3>
        <p className={styles.documentParagraph}>
          本規約は、法令改正や業務内容の変更に応じて予告なく変更されることがあります。変更後は、本サイト上に掲載された時点で効力を生じます。
        </p>
      </section>
    </StackBlock>
  );
}
