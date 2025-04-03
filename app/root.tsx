import { Link, Links, Meta, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { Banner, Divider } from "./components/basic";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="bg-white text-black text-lg font-mono leading-relaxed appearance-none"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-black">
        <div className="max-w-2xl min-h-80 bg-white mx-auto my-12 p-4">
          <Link to="/">
            <Banner />
          </Link>
          <Divider />
          {children}
        </div>
        <Scripts />
        <footer className="text-center my-4">
          <ul className="flex space-x-4 justify-center">
            <li>適格請求書発行事業者登録番号: T6810853446838 </li>
            <li>© 2025 anaregdesign All rights reserved.</li>
          </ul>
        </footer>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
