import styles from "./TextArt.module.css";

export function TextArt({ children }: { children: string }) {
  return (
    <div className={styles.centered}>
      <pre className={styles.textArt}>{children}</pre>
    </div>
  );
}
