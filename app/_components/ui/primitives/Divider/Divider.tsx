import type { HTMLAttributes } from "react";
import classNames from "../../utils/classNames";
import styles from "./Divider.module.css";

type DividerProps = HTMLAttributes<HTMLHRElement> & {
  orientation?: "horizontal" | "vertical";
};

export default function Divider({ className, orientation = "horizontal", ...props }: DividerProps) {
  return <hr className={classNames(styles.root, orientation === "vertical" && styles.vertical, className)} {...props} />;
}
