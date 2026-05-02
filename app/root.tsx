import { Link, Links, Meta, Outlet, Scripts } from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import type { ReactNode } from "react";

import "./styles/global.css";
import { Divider } from "./components/shared/Divider";
import { TextArt } from "./components/shared/TextArt";
import styles from "./root.module.css";

const brandBanner = `
 .d8b.  d8b   db  .d8b.  d8888b. d88888b  d888b
d8' '8b 888o  88 d8' '8b 88  '8D 88'     88' Y8b
88ooo88 88V8o 88 88ooo88 88oobY' 88ooooo 88
88~~~88 88 V8o88 88~~~88 88 8b   88~~~~~ 88  ooo
88   88 88  V888 88   88 88 '88. 88.     88. ~8~
YP   YP VP   V8P YP   YP 88   YD Y88888P  Y888P

d8888b. d88888b .d8888. d888888b  d888b  d8b   db
88  '8D 88'     88'  YP   '88'   88' Y8b 888o  88
88   88 88ooooo '8bo.      88    88      88V8o 88
88   88 88~~~~~   'Y8b.    88    88  ooo 88 V8o88
88  .8D 88.     db   8D   .88.   88. ~8~ 88  V888
Y8888D' Y88888P '8888Y' Y888888P  Y888P  VP   V8P
    `;

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
    { name: "description", content: "データエンジニア ミズカミの個人事務所" },
    // Open Graph
    { property: "og:title", content: "anaregdesign" },
    {
      property: "og:description",
      content: "データエンジニア ミズカミの個人事務所",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://anareg.design" },
    { property: "og:image", content: "/ogimage.jpg" },
    { property: "og:site_name", content: "anaregdesign" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "anaregdesign" },
    {
      name: "twitter:description",
      content: "データエンジニア ミズカミの個人事務所",
    },
    { name: "twitter:image", content: "/ogimage.jpg" },
    { property: "og:locale", content: "ja_JP" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:creator", content: "@anaregdesign" },
  ];
};

export function Layout({ children }: { children: ReactNode }) {
  const measurementId = "G-6NFHEH43G8";
  return (
    <html lang="en" className={styles.document}>
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
      <body className={styles.body}>
        <div className={styles.pageShell}>
          <Link to="/">
            <TextArt>{brandBanner}</TextArt>
          </Link>
          <Divider />
          {children}
        </div>
        <Scripts />
        <footer className={styles.footer}>
          <ul className={styles.footerList}>
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
