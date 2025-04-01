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
  return <div className="space-y-4 my-8">{children}</div>;
}

import { useState, useEffect, useRef } from "react";

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
