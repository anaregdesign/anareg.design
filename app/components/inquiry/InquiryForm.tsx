import { Form } from "react-router";

import { Button } from "~/components/shared/Button";
import type { UseInquiryFormResult } from "~/lib/client/usecase/inquiry-form/use-inquiry-form";

import styles from "./InquiryForm.module.css";

export function InquiryForm({
  confirmationRows,
  fields,
  handleEdit,
  handleFieldChange,
  handlePreview,
  state,
}: UseInquiryFormResult) {
  if (state.isConfirmingSubmission) {
    return (
      <div className={styles.surface}>
        <h2 className={styles.heading}>送信内容の確認</h2>
        <table className={styles.fieldTable}>
          <tbody>
            {confirmationRows.map((row) => (
              <tr className={styles.fieldRow} key={row.label}>
                <td className={`${styles.labelCell} ${styles.bold}`}>
                  {row.label}
                </td>
                <td className={styles.fieldCell}>
                  {row.preWrap ? (
                    <span className={styles.preWrap}>{row.value}</span>
                  ) : (
                    row.value
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td className={styles.actionsCell} colSpan={2}>
                <div className={styles.actionBar}>
                  <Form action="/api/v1/inquiries" method="POST">
                    {Object.entries(fields).map(
                      ([key, value]) =>
                        (key === "consent" || value !== false) && (
                          <input
                            key={key}
                            name={key}
                            readOnly
                            type="hidden"
                            value={String(value)}
                          />
                        ),
                    )}
                    <Button
                      density="spacious"
                      onClick={handleEdit}
                      type="button"
                      variant="secondary"
                    >
                      修正する
                    </Button>

                    <Button density="spacious" type="submit">
                      送信する
                    </Button>
                  </Form>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <form onSubmit={handlePreview}>
      <table className={styles.fieldTable}>
        <tbody>
          <tr className={styles.fieldRow}>
            <td className={styles.labelCell}>
              <label htmlFor="lastName">姓</label>
            </td>
            <td className={styles.fieldCell}>
              <input
                className={styles.control}
                id="lastName"
                maxLength={50}
                minLength={1}
                name="lastName"
                onChange={handleFieldChange}
                placeholder="姓"
                required
                type="text"
                value={fields.lastName}
              />
            </td>
          </tr>
          <tr className={styles.fieldRow}>
            <td className={styles.labelCell}>
              <label htmlFor="firstName">名</label>
            </td>
            <td className={styles.fieldCell}>
              <input
                className={styles.control}
                id="firstName"
                maxLength={50}
                minLength={1}
                name="firstName"
                onChange={handleFieldChange}
                placeholder="名"
                required
                type="text"
                value={fields.firstName}
              />
            </td>
          </tr>
          <tr className={styles.fieldRow}>
            <td className={styles.labelCell}>
              <label htmlFor="email">ビジネスメールアドレス</label>
            </td>
            <td className={styles.fieldCell}>
              <input
                className={styles.control}
                id="email"
                maxLength={100}
                name="email"
                onChange={handleFieldChange}
                placeholder="ビジネスメールアドレス"
                required
                type="email"
                value={fields.email}
              />
            </td>
          </tr>
          <tr className={styles.fieldRow}>
            <td className={styles.labelCell}>
              <label htmlFor="affiliation">ご所属</label>
            </td>
            <td className={styles.fieldCell}>
              <input
                className={styles.control}
                id="affiliation"
                maxLength={100}
                minLength={2}
                name="affiliation"
                onChange={handleFieldChange}
                placeholder="ご所属"
                required
                type="text"
                value={fields.affiliation}
              />
            </td>
          </tr>
          <tr className={styles.fieldRow}>
            <td className={styles.labelCell}>
              <label htmlFor="department">部署</label>
            </td>
            <td className={styles.fieldCell}>
              <input
                className={styles.control}
                id="department"
                maxLength={100}
                minLength={2}
                name="department"
                onChange={handleFieldChange}
                placeholder="部署"
                required
                type="text"
                value={fields.department}
              />
            </td>
          </tr>
          <tr className={styles.fieldRow}>
            <td className={styles.labelCell}>
              <label htmlFor="inquiry">お問合せ内容</label>
            </td>
            <td className={styles.fieldCell}>
              <textarea
                className={styles.control}
                id="inquiry"
                maxLength={1000}
                minLength={10}
                name="inquiry"
                onChange={handleFieldChange}
                placeholder="お問合せ内容"
                required
                rows={10}
                value={fields.inquiry}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.cell} colSpan={2}>
              <div className={styles.inlineCenter}>
                <input
                  checked={fields.consent}
                  className={styles.checkbox}
                  id="consent"
                  name="consent"
                  onChange={handleFieldChange}
                  required
                  type="checkbox"
                />
                <label className={styles.mutedLabel} htmlFor="consent">
                  個人情報の取り扱いに同意する
                </label>
              </div>
            </td>
          </tr>
          <tr hidden>
            <td>
              <label htmlFor="website">Website</label>
            </td>
            <td>
              <input
                autoComplete="off"
                id="website"
                name="website"
                tabIndex={-1}
                type="text"
              />
            </td>
          </tr>
          <tr>
            <td className={styles.cell} colSpan={2}>
              <Button centered type="submit">
                内容を確認する
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
