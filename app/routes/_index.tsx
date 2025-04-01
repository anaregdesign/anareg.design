import type { MetaFunction } from "@remix-run/node";
import { Banner, Divider, Section } from "~/component/basic";
import {ColofulText, Color1, Color2, Color3} from "~/component/theme";


export const meta: MetaFunction = () => {
  return [
    { title: "anaregdesign" },
    { name: "description", content: "ミズカミヒロキの個人事務所" },
  ];
};

export default function Index() {
  return (
  <div>
    <Banner />
    <Divider />
    <Section>
      <p><ColofulText>anaregdesign</ColofulText>ミズカミの個人事務所です。</p>
      <p><Color1>データ</Color1>と数学、そしてプログラミングの力で、皆様がより多くの事を成し遂げるお手伝いをしています。</p>
    </Section>
    <Divider />
  </div>
  );
}
