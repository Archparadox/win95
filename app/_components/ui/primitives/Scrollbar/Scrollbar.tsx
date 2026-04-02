import type { HTMLAttributes } from "react";
import Icon from "../../icons";
import classNames from "../../utils/classNames";
import BevelBox from "../BevelBox";
import Button from "../Button";
import styles from "./Scrollbar.module.css";

type ScrollbarProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export default function Scrollbar({ className, orientation = "vertical", ...props }: ScrollbarProps) {
  const isVertical = orientation === "vertical";

  return (
    <div className={classNames(styles.root, styles[orientation], className)} {...props}>
      <Button icon={<Icon name={isVertical ? "chevronUp" : "chevronLeft"} />} variant="action" />
      <div className={styles.track}>
        <BevelBox className={styles.thumb} />
      </div>
      <Button icon={<Icon name={isVertical ? "chevronDown" : "chevronRight"} />} variant="action" />
    </div>
  );
}
