import type { InputHTMLAttributes, ReactNode } from "react";
import classNames from "../../utils/classNames";
import styles from "./Field.module.css";

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  focused?: boolean;
  label?: ReactNode;
  orientation?: "vertical" | "horizontal";
};

export default function Field({
  className,
  disabled = false,
  focused = false,
  label,
  orientation = "vertical",
  ...props
}: FieldProps) {
  return (
    <label className={classNames(styles.root, styles[orientation], focused && styles.focused, disabled && styles.disabled, className)}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.inputShell}>
        <input className={styles.input} disabled={disabled} type="text" {...props} />
      </span>
    </label>
  );
}
