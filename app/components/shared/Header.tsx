import type { ReactNode } from "react";

import styles from "./Header.module.css";

export function Header({ children }: { children: ReactNode }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>{children}</h1>
    </div>
  );
}
