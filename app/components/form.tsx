import { Form } from "@remix-run/react";
import { useState } from "react";
import { debounce, isEmail } from "~/lib/util";

export function InquiryForm() {
  const [affiliation, setAffiliation] = useState("ご所属");
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

  const labelStyle =
    "py-2 px-4 align-middle whitespace-nowrap w-32 md:text-right";

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
      <div className="w-full bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">送信内容の確認</h2>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="flex flex-col md:table-row">
              <td className={`${labelStyle} md:w-32 md:text-right font-bold`}>
                姓:
              </td>
              <td className="py-2 px-4 flex-1">{formData.lastName}</td>
            </tr>
            <tr className="flex flex-col md:table-row">
              <td className={`${labelStyle} md:w-32 md:text-right font-bold`}>
                名:
              </td>
              <td className="py-2 px-4 flex-1">{formData.firstName}</td>
            </tr>
            <tr className="flex flex-col md:table-row">
              <td className={`${labelStyle} md:w-32 md:text-right font-bold`}>
                ビジネスメールアドレス:
              </td>
              <td className="py-2 px-4 flex-1">{formData.email}</td>
            </tr>
            <tr className="flex flex-col md:table-row">
              <td className={`${labelStyle} md:w-32 md:text-right font-bold`}>
                ご所属:
              </td>
              <td className="py-2 px-4 flex-1">{formData.affiliation}</td>
            </tr>
            <tr className="flex flex-col md:table-row">
              <td className={`${labelStyle} md:w-32 md:text-right font-bold`}>
                部署:
              </td>
              <td className="py-2 px-4 flex-1">{formData.department}</td>
            </tr>
            <tr className="flex flex-col md:table-row">
              <td className={`${labelStyle} md:w-32 md:text-right font-bold`}>
                お問合せ内容:
              </td>
              <td className="py-2 px-4 flex-1 whitespace-pre-wrap">
                {formData.inquiry}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4" colSpan={2}>
                <div className="flex justify-center gap-4">
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
                    <button
                      onClick={handleEdit}
                      className="m-8 px-4 py-2 max-sm:m-2 max-sm:px-2 bg-gray-300 text-black"
                    >
                      修正する
                    </button>

                    <button
                      type="submit"
                      className="m-8 px-4 py-2 max-sm:m-2 max-sm:px-2 bg-blue-500 text-white"
                    >
                      送信する
                    </button>
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
      <table className="w-full border-collapse">
        <tbody>
          <tr className="flex flex-col md:table-row">
            <td className={`${labelStyle} md:w-32 md:text-right`}>
              <label htmlFor="lastName">姓</label>
            </td>
            <td className="py-2 px-4 flex-1">
              <input
                id="lastName"
                type="text"
                name="lastName"
                className="bg-white border border-black p-2 w-full"
                placeholder="姓"
                required
                minLength={1}
                maxLength={50}
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr className="flex flex-col md:table-row">
            <td className={`${labelStyle} md:w-32 md:text-right`}>
              <label htmlFor="firstName">名</label>
            </td>
            <td className="py-2 px-4 flex-1">
              <input
                id="firstName"
                type="text"
                name="firstName"
                className="bg-white border border-black p-2 w-full"
                placeholder="名"
                required
                minLength={1}
                maxLength={50}
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr className="flex flex-col md:table-row">
            <td className={`${labelStyle} md:w-32 md:text-right`}>
              <label htmlFor="email">ビジネスメールアドレス</label>
            </td>
            <td className="py-2 px-4 flex-1">
              <input
                id="email"
                type="email"
                name="email"
                className="bg-white border border-black p-2 w-full"
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
                      setAffiliation(data.affiliation);
                      setFormData((prev) => ({
                        ...prev,
                        affiliation: data.affiliation,
                      }));
                    }
                  }, 500)();
                }}
              />
            </td>
          </tr>
          <tr className="flex flex-col md:table-row">
            <td className={`${labelStyle} md:w-32 md:text-right`}>
              <label htmlFor="affiliation">ご所属</label>
            </td>
            <td className="py-2 px-4 flex-1">
              <input
                id="affiliation"
                type="text"
                name="affiliation"
                className="bg-white border border-black p-2 w-full"
                placeholder={affiliation}
                required
                minLength={2}
                maxLength={100}
                value={formData.affiliation}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr className="flex flex-col md:table-row">
            <td className={`${labelStyle} md:w-32 md:text-right`}>
              <label htmlFor="department">部署</label>
            </td>
            <td className="py-2 px-4 flex-1">
              <input
                id="department"
                type="text"
                name="department"
                className="bg-white border border-black p-2 w-full"
                placeholder="部署"
                required
                minLength={2}
                maxLength={100}
                value={formData.department}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr className="flex flex-col md:table-row">
            <td className={`${labelStyle} md:w-32 md:text-right`}>
              <label htmlFor="inquiry">お問合せ内容</label>
            </td>
            <td className="py-2 px-4 flex-1">
              <textarea
                id="inquiry"
                name="inquiry"
                rows={10}
                className="bg-white border border-black p-2 w-full"
                placeholder="お問合せ内容"
                required
                minLength={10}
                maxLength={1000}
                value={formData.inquiry}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4" colSpan={2}>
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  name="consent"
                  id="consent"
                  required
                  className="mr-2 bg-white border-black"
                  checked={formData.consent}
                  onChange={handleInputChange}
                />
                <label htmlFor="consent" className="text-gray-600 text-center">
                  個人情報の取り扱いに同意する
                </label>
              </div>
            </td>
          </tr>
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
          <tr>
            <td className="py-2 px-4" colSpan={2}>
              <button
                type="submit"
                className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white"
              >
                内容を確認する
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
