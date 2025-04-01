import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Banner, Divider, Header, Section } from "~/component/basic";
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
      <p><ColofulText>anaregdesign</ColofulText>はミズカミヒロキの個人事務所です。</p>
      <p><Color1 theme={theme}>データ</Color1>と<Color2 theme={theme}>数学</Color2>、そして<Color3 theme={theme}>プログラミング</Color3>の力で、皆様がより多くの事を成し遂げるお手伝いをしています。</p>
      <p>簡単な可視化から業務の自動化、マーケティング関連の分析など、些細なことでもお気軽にお問い合わせくださいませ</p>
    </Section>
    <Section>
    <Divider />
      <Header>シンプルな解決方法を好む</Header>
      <p>常に限りなくシンプルな方法を選択します。</p>
      <p>テクノロジーは大抵の場合めっちゃ便利です。でもぶっちゃけ、最新のテクノロジーが常にサイコーとは限りません。</p>
      <p>最近、世の中の変化のスピードはすごい速くて、複雑な分析を行うとその変化について来れなくなっちゃいます。</p>
      <p>まぁ実際、難しい方法がすごく有効なこともまぁまぁあるから、ミズカミに相談してくれたらその辺はよしなに、ええ塩梅の解決策を提示します。</p>
    </Section>
    <Section>
      <Divider />
      <Header>で、どんなことしてくれるの？</Header>
      <p>以下は実際の取り組みの例です。もちろん全部でも、その一部分だけでも相談してくれれば柔軟に対応します。</p>
    </Section>
    <Section>
      <Header>意思決定の分岐点となる情報を特定する</Header>
      <p>難しい決断をする時、もしくは顧客に自社を選択してもらうとき、必ず何かしらの判断基準があるはずです。</p>
      <p>分析の最初のフェーズでは、その分岐点となる情報を特定するところから入ります。</p>
      <p>そして、その情報が最初から手元にあることはすっごく稀なので、その場合このフェーズではその条件を想像で仮置きします。</p>
      <p>もちろん永遠に手に入らないデータを妄想してもしょうがないので、この段階ではそれがシステム連携なのか、市場調査なのかある程度目星をつけておくことが大事です。</p>
    </Section>
    <Section>
      <Header>情報を意味のある形に変える</Header>
      <p>実際に集計や可視化を行い、意思決定の根拠を明確にします。</p>
      <p>データサイエンティストとか呼ばれてるくせに生意気だけど、実はあまり難しい方法は使いたくないってのが本音で、基本はクロス集計と単純な可視化で対処します。</p>
      <p>何でかっていうと、世の中の変化が死ぬほど早いってのが大きな理由で</p>
    </Section>
    <Section>
      <Header>最新の情報を必要な人が入手できるようにする</Header>
      <p>まず何か困ってるってことは、</p>
      <p></p>
    </Section>
x
  </div>
  );
}
