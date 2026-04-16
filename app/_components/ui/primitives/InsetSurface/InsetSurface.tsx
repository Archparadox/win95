import type { HTMLAttributes } from "react";
import classNames from "../../utils/classNames";
import styles from "./InsetSurface.module.css";

type InsetSurfaceVariant = "panel" | "field";

type InsetSurfaceProps = HTMLAttributes<HTMLDivElement> & {
  selectable?: boolean;
  variant?: InsetSurfaceVariant;
};

export default function InsetSurface({
  className,
  selectable = false,
  variant = "panel",
  ...props
}: InsetSurfaceProps) {
  return (
    <div
      className={classNames(
        styles.root,
        styles[variant],
        selectable && styles.selectable,
        className,
      )}
      data-allow-selection={selectable || undefined}
      {...props}
    />
  );
}
