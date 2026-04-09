"use client";

import type {
  HTMLAttributes,
  PointerEvent as ReactPointerEvent,
  Ref,
} from "react";
import Icon from "../../icons";
import classNames from "../../utils/classNames";
import BevelBox from "../BevelBox";
import Button from "../Button";
import styles from "./Scrollbar.module.css";

type ScrollbarDirection = -1 | 1;

type ScrollbarProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  thumbOffset?: number;
  thumbSize?: number;
  trackRef?: Ref<HTMLDivElement>;
  onPage?: (direction: ScrollbarDirection) => void;
  onStep?: (direction: ScrollbarDirection) => void;
  onThumbDragStart?: (event: ReactPointerEvent<HTMLDivElement>) => void;
};

function getPointerOffset(
  event: ReactPointerEvent<HTMLDivElement>,
  orientation: "horizontal" | "vertical",
) {
  const rect = event.currentTarget.getBoundingClientRect();
  return orientation === "vertical" ? event.clientY - rect.top : event.clientX - rect.left;
}

export default function Scrollbar({
  className,
  disabled = false,
  orientation = "vertical",
  thumbOffset = 0,
  thumbSize = 48,
  trackRef,
  onPage,
  onStep,
  onThumbDragStart,
  ...props
}: ScrollbarProps) {
  const isVertical = orientation === "vertical";
  const decrementLabel = isVertical ? "Scroll up" : "Scroll left";
  const incrementLabel = isVertical ? "Scroll down" : "Scroll right";

  function handleTrackPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled || !onPage) return;

    const pointerOffset = getPointerOffset(event, orientation);

    if (pointerOffset < thumbOffset) {
      onPage(-1);
      return;
    }

    if (pointerOffset > thumbOffset + thumbSize) {
      onPage(1);
    }
  }

  function handleThumbPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled || !onThumbDragStart) return;

    event.preventDefault();
    event.stopPropagation();
    onThumbDragStart(event);
  }

  return (
    <div
      className={classNames(styles.root, styles[orientation], className)}
      data-disabled={disabled || undefined}
      {...props}
    >
      <Button
        aria-label={decrementLabel}
        className={styles.button}
        disabled={disabled || !onStep}
        icon={<Icon name={isVertical ? "chevronUp" : "chevronLeft"} />}
        onClick={() => onStep?.(-1)}
        variant="action"
      />
      <div className={styles.track} onPointerDown={handleTrackPointerDown} ref={trackRef}>
        <BevelBox
          className={styles.thumb}
          onPointerDown={handleThumbPointerDown}
          style={
            isVertical
              ? { height: `${thumbSize}px`, transform: `translateY(${thumbOffset}px)` }
              : { width: `${thumbSize}px`, transform: `translateX(${thumbOffset}px)` }
          }
        />
      </div>
      <Button
        aria-label={incrementLabel}
        className={styles.button}
        disabled={disabled || !onStep}
        icon={<Icon name={isVertical ? "chevronDown" : "chevronRight"} />}
        onClick={() => onStep?.(1)}
        variant="action"
      />
    </div>
  );
}
