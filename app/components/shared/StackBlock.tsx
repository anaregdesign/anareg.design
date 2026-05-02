import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx";
import styles from "./StackBlock.module.css";

export function StackBlock({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cx(styles.stackBlock, className)} {...props} />;
}
