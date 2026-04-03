import type { InputHTMLAttributes, ReactNode } from "react";
import Icon from "../../icons";
import classNames from "../../utils/classNames";
import styles from "./Checkbox.module.css";

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  focused?: boolean;
  label: ReactNode;
};

export default function Checkbox({
  checked,
  className,
  disabled = false,
  focused = false,
  label,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={classNames(
        styles.root,
        checked && styles.checked,
        focused && styles.focused,
        disabled && styles.disabled,
        className,
      )}
    >
      <input
        checked={checked}
        className={styles.input}
        disabled={disabled}
        onChange={onChange}
        readOnly={typeof checked !== "undefined" && !onChange}
        type="checkbox"
        {...props}
      />
      <span className={styles.box}>
        <span className={styles.indicator}>
          <Icon disabled={disabled} name="check" />
        </span>
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
