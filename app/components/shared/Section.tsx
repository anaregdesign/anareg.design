import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import styles from "./Section.module.css";

export function Section({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const viewableRatio = visibleHeight / rect.height;

      if (viewableRatio < 0.3) {
        setOpacity(0);
        return;
      }

      if (viewableRatio > 0.8) {
        setOpacity(1);
        return;
      }

      setOpacity((viewableRatio - 0.3) / 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={styles.section} style={{ opacity }}>
      {children}
    </div>
  );
}
