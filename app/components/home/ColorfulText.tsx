import type { ReactNode } from "react";

import type { ColorTheme } from "~/lib/client/usecase/home/home-theme";

import styles from "./ColorfulText.module.css";

export function ColorfulText({
  children,
  theme,
}: {
  children: ReactNode;
  theme: ColorTheme;
}) {
  if (typeof children !== "string") {
    return <span style={{ color: theme.primaryColor }}>{children}</span>;
  }

  const colors = [
    theme.primaryColor,
    theme.secondaryColor,
    theme.tertiaryColor,
  ];

  return (
    <>
      {children.split("").map((char, index) => {
        const color = colors[index % colors.length];

        return (
          <span
            className={styles.bold}
            key={`${char}-${index}`}
            style={{ color }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}
