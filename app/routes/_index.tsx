import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Banner, Divider, Section } from "~/component/basic";
import {ColofulText, Color1, Color2, Color3, themeRepository} from "~/component/theme";


export const meta: MetaFunction = () => {
  return [
    { title: "anaregdesign" },
    { name: "description", content: "ミズカミヒロキの個人事務所" },
  ];
};

export default function Index() {
  const [theme, setTheme] = useState(themeRepository.getRandomTheme());

  return (
  <div onClick={() => setTheme(themeRepository.getRandomTheme())}>
    <Banner />
    <Divider />
    <Section>
      <p><ColofulText>anaregdesign</ColofulText>anaregdesignミズカミの個人事務所です。</p>
      <p><Color1 theme={theme}>データ</Color1>と<Color2 theme={theme}>数学</Color2>、そして<Color3 theme={theme}>プログラミング</Color3>の力で、皆様がより多くの事を成し遂げるお手伝いをしています。</p>
    </Section>
    <Divider />
  </div>
  );
}
