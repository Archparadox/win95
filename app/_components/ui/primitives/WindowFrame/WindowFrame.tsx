import type { HTMLAttributes, ReactNode } from "react";
import BevelBox from "../BevelBox";
import TitleBar from "../TitleBar";
import classNames from "../../utils/classNames";
import styles from "./WindowFrame.module.css";

type WindowSize = "narrow" | "wide";

type WindowFrameProps = HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
  controls?: ReactNode;
  contentClassName?: string;
  contentFlush?: boolean;
  menuBar?: readonly string[];
  size?: WindowSize;
  title: ReactNode;
};

export default function WindowFrame({
  active = true,
  children,
  className,
  contentClassName,
  contentFlush = false,
  controls,
  menuBar,
  size = "wide",
  title,
  ...props
}: WindowFrameProps) {
  return (
    <BevelBox className={classNames(styles.root, styles[size], className)} {...props}>
      <TitleBar active={active} controls={controls} title={title} />
      {menuBar ? (
        <div className={styles.menuBar}>
          {menuBar.map((item) => (
            <span key={item} className={styles.menuItem}>
              {item}
            </span>
          ))}
        </div>
      ) : null}
      <div className={classNames(styles.content, contentFlush && styles.contentFlush, contentClassName)}>{children}</div>
    </BevelBox>
  );
}
