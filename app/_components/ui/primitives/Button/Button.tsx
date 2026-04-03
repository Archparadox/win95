import type { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "../../utils/classNames";
import styles from "./Button.module.css";

type ButtonVariant = "text" | "icon" | "action" | "caption";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  focused?: boolean;
  highlighted?: boolean;
  variant?: ButtonVariant;
  icon?: ReactNode;
};

export default function Button({
  active = false,
  children,
  className,
  disabled = false,
  focused = false,
  highlighted = false,
  icon,
  type = "button",
  variant = "text",
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.root,
        styles[variant],
        active && styles.active,
        focused && styles.focused,
        highlighted && styles.highlighted,
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      <span className={styles.content}>
        {icon}
        {children}
      </span>
    </button>
  );
}
