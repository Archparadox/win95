import type { InputHTMLAttributes, ReactNode } from "react";
import classNames from "../../utils/classNames";
import styles from "./Radio.module.css";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  focused?: boolean;
  label: ReactNode;
};

export default function Radio({ checked, className, disabled = false, focused = false, label, onChange, ...props }: RadioProps) {
  return (
    <label className={classNames(styles.root, checked && styles.checked, focused && styles.focused, disabled && styles.disabled, className)}>
      <input
        checked={checked}
        className={styles.input}
        disabled={disabled}
        onChange={onChange}
        readOnly={typeof checked !== "undefined" && !onChange}
        type="radio"
        {...props}
      />
      <span className={styles.circle}>
        <span className={styles.dot} />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
