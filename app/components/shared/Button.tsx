import type { ButtonHTMLAttributes } from "react";

import { cx } from "./cx";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "link" | "icon";
type ButtonDensity = "regular" | "spacious" | "plain";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  block?: boolean;
  centered?: boolean;
  density?: ButtonDensity;
  variant?: ButtonVariant;
};

export function Button({
  block = false,
  centered = false,
  className,
  density = "regular",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        styles.button,
        variant === "primary" && styles.buttonPrimary,
        variant === "secondary" && styles.buttonSecondary,
        variant === "link" && styles.buttonLink,
        variant === "icon" && styles.buttonIcon,
        density === "regular" && styles.buttonRegular,
        density === "spacious" && styles.buttonSpacious,
        block && styles.buttonBlock,
        centered && styles.buttonCentered,
        className,
      )}
      type={type}
      {...props}
    />
  );
}
