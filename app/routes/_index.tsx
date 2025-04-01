import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Banner, Divider, Header, Section } from "~/component/basic";
import {
  ColofulText,
  Color1,
  Color2,
  Color3,
  themeRepository,
} from "~/component/theme";

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
        <p>
          <ColofulText>anaregdesign</ColofulText>
          はミズカミヒロキの個人事務所です。
        </p>
        <p>
          <Color1 theme={theme}>データ</Color1>と
          <Color2 theme={theme}>数学</Color2>、そして
          <Color3 theme={theme}>プログラミング</Color3>
          の力で、皆様がより多くの事を成し遂げるお手伝いをしています。
        </p>
        <p>
          簡単な可視化から業務の自動化、マーケティング関連の分析など、些細なことでもお気軽にお問い合わせくださいませ。
        </p>
      </Section>
      <Section>
        <Divider />
        <Header>シンプルな解決方法を好む</Header>
        <p>常に限りなくシンプルな方法を選択します。</p>
        <p>
          テクノロジーは大抵の場合めっちゃ便利です。でもぶっちゃけ、最新のテクノロジーが常にサイコーとは限りません。
        </p>
        <p>
          最近、世の中の変化のスピードはすごい速くて、複雑な分析を行うとその変化について来れなくなっちゃいます。
        </p>
        <p>
          まぁ実際、難しい方法がすごく有効なこともまぁまぁあるから、ミズカミに相談してくれたらその辺はよしなに、ええ塩梅の解決策を提示します。
        </p>
        <p>
          あと、結構技術に対する理解も重要視してて、その辺りの説明もかなーり重要視してるんで安心してください。
        </p>
      </Section>
      <Section>
        <Divider />
        <Header>で、どんなことしてくれるの？</Header>
        <p>
          以下は実際の取り組みの例です。もちろん全部でも、その一部分だけでも相談してくれれば柔軟に対応します。
        </p>
      </Section>
      <Section>
        <Header>
          <ColofulText theme={theme}>
            意思決定の分岐点となる情報を特定する
          </ColofulText>
        </Header>
        <p>
          難しい決断をする時、もしくは顧客に自社を選択してもらうとき、誰でも何かしらの判断基準があるはずです。
        </p>
        <p>
          分析の最初のフェーズでは、その分岐点となる情報を特定するところから入ります。
        </p>
        <p>
          そして、その情報が最初から手元にあることはすっごく稀なので、その場合このフェーズではその条件を想像で仮置きします。また少しでもサンプルのデータがあれば最近ならそれを生成AIとかでグイーッと引き伸ばしたりします。
        </p>
        <p>
          もちろん永遠に手に入らないデータを妄想してもしょうがないので、この段階では入手方法もある程度目星をつけておくことが大事です。
        </p>
      </Section>
      <Section>
        <Header>
          <ColofulText theme={theme}>意思決定の根拠を明確にする</ColofulText>
        </Header>
        <p>実際に集計や可視化を行い、意思決定の根拠を明確にします。</p>
        <p>
          たとえ、それがダミーデータでもこのフェーズではビビりません。一回分析してみることが大事。
        </p>
        <p>
          あとデータサイエンティストとか呼ばれてるくせに生意気だけど、実はあまり難しい方法は使いたくないってのが本音で、基本はクロス集計と単純な可視化で対処します。
        </p>
        <p>
          何でかっていうと、世の中の変化が死ぬほど早いってのが大きな理由で、急にデータが手に入らなくなったり新しい技術が見つかったりした時に、そこでやり直すのはみんなが不幸になることが多いからです。
        </p>
      </Section>
      <Section>
        <Header>
          <ColofulText theme={theme}>
            最新の情報を常に入手できるようにする
          </ColofulText>
        </Header>
        <p>
          あとは上2つの結果を、いつでも、簡単に、取り出せる仕組みを構築します。
        </p>
        <p>
          基本的にはシステム連携がメインです。場合によっては市場調査や外部ベンダとの連携を提案することもあります。
        </p>
        <p>
          何はともあれデータの取得・加工を自動化することで日常の作業をめっちゃ楽にします。
        </p>
        <p>
          こういう仕組みは「データ基盤」とか呼ばれてて、最近爆流行りしてます。てかもはや持ってないと笑われます。
        </p>
        <p>
          この辺りではプログラミングとかソフトウェアの力を使うんだけど、経験豊富なデータエンジニアのミズカミなら最高戦力として機能します。
        </p>
        <p>
          実際にこのサイトもnodejs/remix/reactで出来てるしね、プログラミングも結構得意です。
        </p>
      </Section>
      <Section></Section>
    </div>
  );
}
