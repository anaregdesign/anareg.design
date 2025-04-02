export function InqueryForm() {
  const labelStyle = "py-2 px-4 align-middle text-right whitespace-nowrap w-32";

  return (
    <form action="/api/inquiries" method="POST" target="_blank">
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className={labelStyle}>
              <label>ご氏名</label>
            </td>
            <td className="py-2 px-4">
              <input
                type="text"
                name="name"
                className="bg-white border border-black p-2 w-full"
                required
              />
            </td>
          </tr>
          <tr>
            <td className={labelStyle}>
              <label>ご所属</label>
            </td>
            <td className="py-2 px-4">
              <input
                type="text"
                name="affiliation"
                className="bg-white border border-black p-2 w-full"
                required
              />
            </td>
          </tr>
          <tr>
            <td className={labelStyle}>
              <label>部署</label>
            </td>
            <td className="py-2 px-4">
              <input
                type="text"
                name="department"
                className="bg-white border border-black p-2 w-full"
                required
              />
            </td>
          </tr>
          <tr>
            <td className={labelStyle}>
              <label>メールアドレス</label>
            </td>
            <td className="py-2 px-4">
              <input
                type="email"
                name="email"
                className="bg-white border border-black p-2 w-full"
                required
              />
            </td>
          </tr>
          <tr>
            <td className={labelStyle}>
              <label>お問合せ内容</label>
            </td>
            <td className="py-2 px-4">
              <textarea
                name="inquiry"
                rows={10}
                className="bg-white border border-black p-2 w-full"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4" colSpan={2}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="consent"
                  id="consent"
                  required
                  className="mr-2 bg-white"
                />
                <label htmlFor="consent" className="text-gray-600">
                  個人情報の利用に同意する
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
    </form>
  );
}
