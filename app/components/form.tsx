import { Form } from "@remix-run/react";

export function InqueryForm() {
  const labelStyle = "py-2 px-4 align-middle text-right whitespace-nowrap w-32";

  return (
    <Form action="/api/v1/inqueries" method="POST" target="/">
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className={labelStyle}>
              <label htmlFor="name">ご氏名</label>
            </td>
            <td className="py-2 px-4">
              <input
                id="name"
                type="text"
                name="name"
                className="bg-white border border-black p-2 w-full"
                required
              />
            </td>
          </tr>
          <tr>
            <td className={labelStyle}>
              <label htmlFor="affiliation">ご所属</label>
            </td>
            <td className="py-2 px-4">
              <input
                id="affiliation"
                type="text"
                name="affiliation"
                className="bg-white border border-black p-2 w-full"
                required
              />
            </td>
          </tr>
          <tr>
            <td className={labelStyle}>
              <label htmlFor="department">部署</label>
            </td>
            <td className="py-2 px-4">
              <input
                id="department"
                type="text"
                name="department"
                className="bg-white border border-black p-2 w-full"
                required
              />
            </td>
          </tr>
          <tr>
            <td className={labelStyle}>
              <label htmlFor="email">メールアドレス</label>
            </td>
            <td className="py-2 px-4">
              <input
                id="email"
                type="email"
                name="email"
                className="bg-white border border-black p-2 w-full"
                required
              />
            </td>
          </tr>
          <tr>
            <td className={labelStyle}>
              <label htmlFor="inquiry">お問合せ内容</label>
            </td>
            <td className="py-2 px-4">
              <textarea
                id="inquiry"
                name="inquiry"
                rows={10}
                className="bg-white border border-black p-2 w-full"
                required
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
                />
                <label htmlFor="consent" className="text-gray-600 text-center">
                  データの利用規約に同意する
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4" colSpan={2}>
              <button
                type="submit"
                className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white"
              >
                送信
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  );
}
