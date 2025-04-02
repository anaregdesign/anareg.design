export function Banner() {
  const ascii2line = `
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

  return (
    <div className="text-center">
      <pre className="inline-block text-left font-mono leading-tight">
        {ascii2line}
      </pre>
    </div>
  );
}

export function Section({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // ビューポート内で見えている部分の高さを計算
        const visibleHeight =
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        // 要素全体の高さに対する表示割合を新しい透明度として設定
        const newOpacity = Math.min(
          Math.max(visibleHeight / rect.height, 0),
          1
        );
        setOpacity(newOpacity);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="space-y-4 my-8 z-0" style={{ opacity }}>
      {children}
    </div>
  );
}

export function StickySection({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 bg-white z-50 py-10 text-center [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)]">
      {children}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { ColofulText, ColorTheme } from "./theme";

export function Divider() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const charWidth = 11.25;
      if (boxRef.current) {
        const newCount = Math.floor(boxRef.current.clientWidth / charWidth);
        setCount(newCount);
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div ref={boxRef} className="text-center my-4">
      {"=".repeat(count)}
    </div>
  );
}

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mt-8 mb-4">
      <h1 className="text-lg font-normal">{children}</h1>
    </div>
  );
}

export function InqueryButton({ theme }: { theme?: ColorTheme }) {
  const button = `+===================+
|  🥺お問合せはこちら🥺  |
+===================+`;
  const lines = button.split("\n");
  return (
    <div className="inline-block text-center font-mono leading-tight">
      {lines.map((line, index) => (
        <>
          <ColofulText>{line}</ColofulText>
          <br />
        </>
      ))}
    </div>
  );
}
