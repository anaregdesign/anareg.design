import type { InquiryFormFields } from "./state";

export type ConfirmationRow = {
  label: string;
  value: string;
  preWrap?: boolean;
};

export function selectConfirmationRows(
  fields: InquiryFormFields,
): ConfirmationRow[] {
  return [
    { label: "姓:", value: fields.lastName },
    { label: "名:", value: fields.firstName },
    { label: "ビジネスメールアドレス:", value: fields.email },
    { label: "ご所属:", value: fields.affiliation },
    { label: "部署:", value: fields.department },
    { label: "お問合せ内容:", value: fields.inquiry, preWrap: true },
  ];
}
