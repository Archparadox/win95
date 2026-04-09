import type { CSSProperties, HTMLAttributes } from "react";
import classNames from "../utils/classNames";
import styles from "./Icon.module.css";

type IconName =
  | "check"
  | "chevronDown"
  | "chevronLeft"
  | "chevronRight"
  | "chevronUp"
  | "close"
  | "maximize"
  | "minimize";

type IconSize = "small" | "default" | "large";

type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  name: IconName;
  size?: IconSize;
  disabled?: boolean;
};

const sourceMap: Record<IconName, string> = {
  check: "/icons/ui/check.svg",
  chevronDown: "/icons/ui/chevron-down.svg",
  chevronLeft: "/icons/ui/chevron-left.svg",
  chevronRight: "/icons/ui/chevron-right.svg",
  chevronUp: "/icons/ui/chevron-up.svg",
  close: "/icons/ui/close.svg",
  maximize: "/icons/ui/maximize.svg",
  minimize: "/icons/ui/minimize.svg",
};

const sizeMap: Record<IconSize, number> = {
  small: 8,
  default: 12,
  large: 24,
};

export default function Icon({
  className,
  name,
  size = "default",
  disabled = false,
  style,
  ...props
}: IconProps) {
  const pixelSize = sizeMap[size];
  const iconStyle = {
    "--icon-src": `url("${sourceMap[name]}")`,
    width: `${pixelSize}px`,
    height: `${pixelSize}px`,
    ...style,
  } as CSSProperties;

  return (
    <span
      aria-hidden="true"
      className={classNames(styles.root, disabled && styles.disabled, className)}
      style={iconStyle}
      {...props}
    />
  );
}
