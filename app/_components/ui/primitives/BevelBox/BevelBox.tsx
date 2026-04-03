import type { HTMLAttributes } from "react";
import classNames from "../../utils/classNames";
import styles from "./BevelBox.module.css";

type BevelTone = "raised" | "sunken" | "field";

type BevelBoxProps = HTMLAttributes<HTMLDivElement> & {
  tone?: BevelTone;
  flush?: boolean;
  selectable?: boolean;
};

export default function BevelBox({ className, tone = "raised", flush = false, selectable = false, ...props }: BevelBoxProps) {
  return (
    <div
      className={classNames(styles.root, styles[tone], flush && styles.flush, selectable && styles.selectable, className)}
      data-allow-selection={selectable || undefined}
      {...props}
    />
  );
}
