import { useEffect, useRef, useState } from "react";

import styles from "./Divider.module.css";

export function Divider() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const charWidth = 11.25;

      if (boxRef.current) {
        setCount(Math.floor(boxRef.current.clientWidth / charWidth));
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div ref={boxRef} className={styles.divider}>
      {"=".repeat(count)}
    </div>
  );
}
