import type { HTMLAttributes, ReactNode } from "react";
import classNames from "../../utils/classNames";
import styles from "./TitleBar.module.css";

type TitleBarProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  active?: boolean;
  controls?: ReactNode;
};

export default function TitleBar({ active = true, className, controls, title, ...props }: TitleBarProps) {
  return (
    <div className={classNames(styles.root, !active && styles.inactive, className)} {...props}>
      <span className={styles.title}>{title}</span>
      {controls ? <span className={styles.controls}>{controls}</span> : null}
    </div>
  );
}
