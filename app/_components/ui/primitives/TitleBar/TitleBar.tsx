import type { HTMLAttributes, ReactNode } from "react";
import classNames from "../../utils/classNames";
import styles from "./TitleBar.module.css";

type TitleBarProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  title: ReactNode;
  titleIcon?: ReactNode;
  active?: boolean;
  controls?: ReactNode;
};

export default function TitleBar({
  active = true,
  className,
  controls,
  title,
  titleIcon,
  ...props
}: TitleBarProps) {
  return (
    <div className={classNames(styles.root, !active && styles.inactive, className)} {...props}>
      <span className={styles.title}>
        <span className={styles.titleContent}>
          {titleIcon ? <span className={styles.titleIcon}>{titleIcon}</span> : null}
          <span className={styles.titleText}>{title}</span>
        </span>
      </span>
      {controls ? <span className={styles.controls}>{controls}</span> : null}
    </div>
  );
}
