import { useState } from "react";
import { Form } from "react-router";
import { debounce, isEmail } from "~/lib/util";
import {
  ActionBar,
  Button,
  Checkbox,
  FieldInput,
  FieldRow,
  FieldTable,
  FieldTextarea,
  FieldValue,
  FullRow,
  Heading,
  InlineCenter,
  MutedLabel,
  Surface,
} from "./ui";

export function InquiryForm() {
  const [isConfirmingSubmission, setIsConfirmingSubmission] = useState(false);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    affiliation: "",
    department: "",
    inquiry: "",
    consent: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const checked =
      type === "checkbox" && (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePreview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmingSubmission(true);
  };

  const handleEdit = () => {
    setIsConfirmingSubmission(false);
  };

  if (isConfirmingSubmission) {
    return (
      <Surface>
        <Heading>送信内容の確認</Heading>
        <FieldTable>
          <FieldRow label="姓:" strong>
            {formData.lastName}
          </FieldRow>
          <FieldRow label="名:" strong>
            {formData.firstName}
          </FieldRow>
          <FieldRow label="ビジネスメールアドレス:" strong>
            {formData.email}
          </FieldRow>
          <FieldRow label="ご所属:" strong>
            {formData.affiliation}
          </FieldRow>
          <FieldRow label="部署:" strong>
            {formData.department}
          </FieldRow>
          <FieldRow label="お問合せ内容:" strong>
            <FieldValue preWrap>{formData.inquiry}</FieldValue>
          </FieldRow>
          <FullRow padded>
            <ActionBar>
              <Form action="/api/v1/inquiries" method="POST">
                {Object.entries(formData).map(
                  ([key, value]) =>
                    (key === "consent" || value !== false) && (
                      <input
                        key={key}
                        type="hidden"
                        name={key}
                        value={key === "consent" ? "true" : String(value)}
                        readOnly
                      />
                    )
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
            </ActionBar>
          </FullRow>
        </FieldTable>
      </Surface>
    );
  }

  return (
    <form onSubmit={handlePreview}>
      <FieldTable>
        <FieldRow htmlFor="lastName" label="姓">
          <FieldInput
            id="lastName"
            type="text"
            name="lastName"
            placeholder="姓"
            required
            minLength={1}
            maxLength={50}
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </FieldRow>
        <FieldRow htmlFor="firstName" label="名">
          <FieldInput
            id="firstName"
            type="text"
            name="firstName"
            placeholder="名"
            required
            minLength={1}
            maxLength={50}
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </FieldRow>
        <FieldRow htmlFor="email" label="ビジネスメールアドレス">
          <FieldInput
            id="email"
            type="email"
            name="email"
            placeholder="ビジネスメールアドレス"
            required
            maxLength={100}
            value={formData.email}
            onChange={async (e) => {
              handleInputChange(e);

              debounce(async () => {
                if (isEmail(formData.email)) {
                  const res = await fetch(
                    `/api/v1/ai/domains/${formData.email}`
                  );
                  if (!res.ok) {
                    return;
                  }
                  const data = await res.json();
                  setFormData((prev) => ({
                    ...prev,
                    affiliation: data.affiliation,
                  }));
                }
              }, 500)();
            }}
          />
        </FieldRow>
        <FieldRow htmlFor="affiliation" label="ご所属">
          <FieldInput
            id="affiliation"
            type="text"
            name="affiliation"
            placeholder="ご所属"
            required
            minLength={2}
            maxLength={100}
            value={formData.affiliation}
            onChange={handleInputChange}
          />
        </FieldRow>
        <FieldRow htmlFor="department" label="部署">
          <FieldInput
            id="department"
            type="text"
            name="department"
            placeholder="部署"
            required
            minLength={2}
            maxLength={100}
            value={formData.department}
            onChange={handleInputChange}
          />
        </FieldRow>
        <FieldRow htmlFor="inquiry" label="お問合せ内容">
          <FieldTextarea
            id="inquiry"
            name="inquiry"
            rows={10}
            placeholder="お問合せ内容"
            required
            minLength={10}
            maxLength={1000}
            value={formData.inquiry}
            onChange={handleInputChange}
          />
        </FieldRow>
        <FullRow>
          <InlineCenter>
            <Checkbox
              name="consent"
              id="consent"
              required
              checked={formData.consent}
              onChange={handleInputChange}
            />
            <MutedLabel htmlFor="consent">
              個人情報の取り扱いに同意する
            </MutedLabel>
          </InlineCenter>
        </FullRow>
        <tr style={{ display: "none" }}>
          <td>
            <label htmlFor="website">Website</label>
          </td>
          <td>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </td>
        </tr>
        <FullRow>
          <Button centered type="submit">
            内容を確認する
          </Button>
        </FullRow>
      </FieldTable>
    </form>
  );
}
