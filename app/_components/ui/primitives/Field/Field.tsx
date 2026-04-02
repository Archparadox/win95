import type { ReactNode } from "react";
import Icon from "../../icons";
import classNames from "../../utils/classNames";
import styles from "./Field.module.css";

type FieldOption = {
  label: string;
  value: string;
};

type FieldProps = {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  focused?: boolean;
  id?: string;
  kind?: "text" | "select";
  label?: ReactNode;
  name?: string;
  options?: readonly FieldOption[];
  orientation?: "vertical" | "horizontal";
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
};

export default function Field({
  className,
  defaultValue,
  disabled = false,
  focused = false,
  id,
  kind = "text",
  label,
  name,
  options = [],
  orientation = "vertical",
  placeholder,
  readOnly = false,
  value,
}: FieldProps) {
  const sharedProps = {
    defaultValue,
    disabled,
    id,
    name,
    value,
  };

  return (
    <label className={classNames(styles.root, styles[orientation], focused && styles.focused, disabled && styles.disabled, className)}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.shell}>
        {kind === "select" ? (
          <>
            <select className={styles.select} {...sharedProps}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className={styles.trigger}>
              <Icon name="chevronDown" />
            </span>
          </>
        ) : (
          <input className={styles.input} placeholder={placeholder} readOnly={readOnly} type="text" {...sharedProps} />
        )}
      </span>
    </label>
  );
}
