import { Link, Links, Meta, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

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

// Add OpenGraph metadata
export const meta: MetaFunction = () => {
  return [
    { title: "anaregdesign" },
    { name: "description", content: "anaregdesign official website" },
    // Open Graph
    { property: "og:title", content: "anaregdesign" },
    {
      property: "og:description",
      content: "レンタルデータエンジニア ミズカミの個人事務所",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://anareg.design" },
    { property: "og:image", content: "https://anareg.design/og-image.png" },
    { property: "og:site_name", content: "anaregdesign" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "anaregdesign" },
    {
      name: "twitter:description",
      content: "レンタルデータエンジニア ミズカミの個人事務所",
    },
    { name: "twitter:image", content: "https://anareg.design/og-image.png" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const measurementId = "G-6NFHEH43G8";
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
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}');
            `,
          }}
        />
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
