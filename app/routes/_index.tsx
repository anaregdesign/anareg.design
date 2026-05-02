import type { MetaFunction } from "react-router";

import { HomePage } from "~/components/home/HomePage";

export const meta: MetaFunction = () => {
  return [
    { title: "anaregdesign" },
    { name: "description", content: "データエンジニア ミズカミの個人事務所" },
    { property: "og:title", content: "anaregdesign" },
    {
      property: "og:description",
      content: "データエンジニア ミズカミの個人事務所",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://anareg.design" },
    { property: "og:image", content: "/ogimage.jpg" },
    { property: "og:site_name", content: "anaregdesign" },
    { property: "og:locale", content: "ja_JP" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "anaregdesign" },
    {
      name: "twitter:description",
      content: "データエンジニア ミズカミの個人事務所",
    },
    { name: "twitter:image", content: "/ogimage.jpg" },
    { name: "twitter:creator", content: "@anaregdesign" },
  ];
};

export default function Index() {
  return <HomePage />;
}
