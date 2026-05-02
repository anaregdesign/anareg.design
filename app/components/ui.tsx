import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

import styles from "./ui.module.css";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function StackBlock({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cx(styles.stackBlock, className)} {...props} />;
}

export function TextArt({ children }: { children: string }) {
  return (
    <div className={styles.centered}>
      <pre className={styles.textArt}>{children}</pre>
    </div>
  );
}

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
        className
      )}
      type={type}
      {...props}
    />
  );
}

export function RelativePanel({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cx(styles.relativePanel, className)} {...props} />;
}

export function CloseButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      aria-label="Close"
      className={cx(styles.closeTopRight, className)}
      density="plain"
      type="button"
      variant="icon"
      {...props}
    />
  );
}

export function Surface({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cx(styles.surface, className)} {...props} />;
}

export function Heading({ children }: { children: ReactNode }) {
  return <h2 className={styles.heading}>{children}</h2>;
}

export function FieldTable({ children }: { children: ReactNode }) {
  return (
    <table className={styles.fieldTable}>
      <tbody>{children}</tbody>
    </table>
  );
}

export function FieldRow({
  children,
  htmlFor,
  label,
  strong = false,
}: {
  children: ReactNode;
  htmlFor?: string;
  label: ReactNode;
  strong?: boolean;
}) {
  return (
    <tr className={styles.fieldRow}>
      <td className={cx(styles.labelCell, strong && styles.bold)}>
        {htmlFor ? <label htmlFor={htmlFor}>{label}</label> : label}
      </td>
      <td className={styles.fieldCell}>{children}</td>
    </tr>
  );
}

export function FieldValue({
  children,
  preWrap = false,
}: {
  children: ReactNode;
  preWrap?: boolean;
}) {
  return <span className={cx(preWrap && styles.preWrap)}>{children}</span>;
}

export function FullRow({
  children,
  padded = false,
}: {
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <tr>
      <td className={padded ? styles.actionsCell : styles.cell} colSpan={2}>
        {children}
      </td>
    </tr>
  );
}

export function ActionBar({ children }: { children: ReactNode }) {
  return <div className={styles.actionBar}>{children}</div>;
}

export function FieldInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(styles.control, className)} {...props} />;
}

export function FieldTextarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(styles.control, className)} {...props} />;
}

export function InlineCenter({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cx(styles.inlineCenter, className)} {...props} />;
}

export function Checkbox({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cx(styles.checkbox, className)}
      type="checkbox"
      {...props}
    />
  );
}

export function MutedLabel({
  className,
  htmlFor,
  ...props
}: ComponentPropsWithoutRef<"label"> & { htmlFor: string }) {
  return (
    <label
      className={cx(styles.mutedLabel, className)}
      htmlFor={htmlFor}
      {...props}
    />
  );
}

export function DocumentTitle({ children }: { children: ReactNode }) {
  return <h2 className={styles.documentTitle}>{children}</h2>;
}

export function DocumentSection({
  children,
  title,
}: {
  children: ReactNode;
  title: ReactNode;
}) {
  return (
    <section className={styles.documentSection}>
      <h3 className={styles.documentHeading}>{title}</h3>
      {children}
    </section>
  );
}

export function DocumentParagraph({
  children,
  spaced = false,
}: {
  children: ReactNode;
  spaced?: boolean;
}) {
  return (
    <p
      className={
        spaced ? styles.documentParagraphSpaced : styles.documentParagraph
      }
    >
      {children}
    </p>
  );
}

export function DocumentList({ children }: { children: ReactNode }) {
  return <ul className={styles.documentList}>{children}</ul>;
}
