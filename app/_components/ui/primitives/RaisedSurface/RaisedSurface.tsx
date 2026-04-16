import type { HTMLAttributes } from "react";
import classNames from "../../utils/classNames";
import styles from "./RaisedSurface.module.css";

type RaisedSurfaceProps = HTMLAttributes<HTMLDivElement>;

export default function RaisedSurface({
  className,
  ...props
}: RaisedSurfaceProps) {
  return <div className={classNames(styles.root, className)} {...props} />;
}
