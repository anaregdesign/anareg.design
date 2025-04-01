import type { MetaFunction } from "@remix-run/node";
import { Banner, Divider, Section } from "~/component/basic";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
  <div>
    <Banner />
    <Section>
      <p>anaregdesignはミズカミの個人事務所です。</p>
      <p>データと数学、そしてプログラミングの力で、皆様がより多くの事を成し遂げるお手伝いをしています。</p>
    </Section>
    <Divider />
  </div>
  );
}
