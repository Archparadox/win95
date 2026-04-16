import type { HTMLAttributes, ReactNode } from "react";
import RaisedSurface from "../RaisedSurface";
import TitleBar from "../TitleBar";
import classNames from "../../utils/classNames";
import styles from "./WindowFrame.module.css";

type WindowSize = "narrow" | "wide";

type WindowFrameProps = HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
  controls?: ReactNode;
  contentClassName?: string;
  contentFlush?: boolean;
  footer?: ReactNode;
  footerClassName?: string;
  menuBar?: readonly string[];
  size?: WindowSize;
  title: ReactNode;
  titleIcon?: ReactNode;
};

export default function WindowFrame({
  active = true,
  children,
  className,
  contentClassName,
  contentFlush = false,
  controls,
  footer,
  footerClassName,
  menuBar,
  size = "wide",
  title,
  titleIcon,
  ...props
}: WindowFrameProps) {
  return (
    <RaisedSurface className={classNames(styles.root, styles[size], className)} {...props}>
      <TitleBar active={active} controls={controls} title={title} titleIcon={titleIcon} />
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
      {footer ? <div className={classNames(styles.footer, footerClassName)}>{footer}</div> : null}
    </RaisedSurface>
  );
}
