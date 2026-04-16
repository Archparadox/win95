"use client";

import type {
  HTMLAttributes,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "../../utils/classNames";
import Scrollbar from "../Scrollbar";
import styles from "./ScrollFrame.module.css";

const DEFAULT_STEP_SIZE = 40;
const MIN_THUMB_SIZE = 18;
const SCROLLBAR_THICKNESS = 16;

type Orientation = "horizontal" | "vertical";

type ScrollMetrics = {
  clientHeight: number;
  clientWidth: number;
  horizontalTrackSize: number;
  rootHeight: number;
  rootWidth: number;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  verticalTrackSize: number;
};

type ScrollFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const INITIAL_METRICS: ScrollMetrics = {
  clientHeight: 1,
  clientWidth: 1,
  horizontalTrackSize: 1,
  rootHeight: 1,
  rootWidth: 1,
  scrollHeight: 1,
  scrollLeft: 0,
  scrollTop: 0,
  scrollWidth: 1,
  verticalTrackSize: 1,
};

type DragState = {
  orientation: Orientation;
  pointerStart: number;
  scrollStart: number;
};

type ScrollbarVisibility = {
  horizontal: boolean;
  vertical: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function areMetricsEqual(previous: ScrollMetrics, next: ScrollMetrics) {
  return (
    previous.clientHeight === next.clientHeight &&
    previous.clientWidth === next.clientWidth &&
    previous.horizontalTrackSize === next.horizontalTrackSize &&
    previous.rootHeight === next.rootHeight &&
    previous.rootWidth === next.rootWidth &&
    previous.scrollHeight === next.scrollHeight &&
    previous.scrollLeft === next.scrollLeft &&
    previous.scrollTop === next.scrollTop &&
    previous.scrollWidth === next.scrollWidth &&
    previous.verticalTrackSize === next.verticalTrackSize
  );
}

function getThumbSize(
  viewportSize: number,
  contentSize: number,
  trackSize: number,
) {
  if (trackSize <= 0) return 0;
  if (contentSize <= viewportSize) return trackSize;

  return Math.max(MIN_THUMB_SIZE, (viewportSize / contentSize) * trackSize);
}

function getThumbOffset(
  scrollPosition: number,
  viewportSize: number,
  contentSize: number,
  trackSize: number,
  thumbSize: number,
) {
  const scrollRange = contentSize - viewportSize;
  const trackRange = trackSize - thumbSize;

  if (scrollRange <= 0 || trackRange <= 0) return 0;

  return (scrollPosition / scrollRange) * trackRange;
}

function getScrollbarVisibility(
  contentWidth: number,
  contentHeight: number,
  availableWidth: number,
  availableHeight: number,
) {
  let vertical = contentHeight > availableHeight;
  let horizontal = contentWidth > (availableWidth - (vertical ? SCROLLBAR_THICKNESS : 0));

  vertical = contentHeight > (availableHeight - (horizontal ? SCROLLBAR_THICKNESS : 0));
  horizontal = contentWidth > (availableWidth - (vertical ? SCROLLBAR_THICKNESS : 0));

  return { horizontal, vertical } satisfies ScrollbarVisibility;
}

export default function ScrollFrame({
  children,
  className,
  ...props
}: ScrollFrameProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const dragControllerRef = useRef<AbortController | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const horizontalTrackRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const verticalTrackRef = useRef<HTMLDivElement | null>(null);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);

  const updateMetrics = useCallback(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;

    if (!root || !viewport) return;

    const nextMetrics = {
      clientHeight: viewport.clientHeight,
      clientWidth: viewport.clientWidth,
      horizontalTrackSize: horizontalTrackRef.current?.clientWidth ?? 0,
      rootHeight: root.clientHeight,
      rootWidth: root.clientWidth,
      scrollHeight: viewport.scrollHeight,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
      scrollWidth: viewport.scrollWidth,
      verticalTrackSize: verticalTrackRef.current?.clientHeight ?? 0,
    };

    setMetrics((previous) =>
      areMetricsEqual(previous, nextMetrics) ? previous : nextMetrics,
    );
  }, []);

  const stopDragging = useCallback(() => {
    dragStateRef.current = null;
    dragControllerRef.current?.abort();
    dragControllerRef.current = null;
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      const viewport = viewportRef.current;

      if (!dragState || !viewport) return;

      const track =
        dragState.orientation === "vertical"
          ? verticalTrackRef.current
          : horizontalTrackRef.current;

      if (!track) return;

      const currentPointer =
        dragState.orientation === "vertical" ? event.clientY : event.clientX;
      const contentSize =
        dragState.orientation === "vertical"
          ? viewport.scrollHeight
          : viewport.scrollWidth;
      const viewportSize =
        dragState.orientation === "vertical"
          ? viewport.clientHeight
          : viewport.clientWidth;
      const trackSize =
        dragState.orientation === "vertical"
          ? track.clientHeight
          : track.clientWidth;
      const thumbSize = getThumbSize(viewportSize, contentSize, trackSize);
      const scrollRange = contentSize - viewportSize;
      const trackRange = trackSize - thumbSize;

      if (scrollRange <= 0 || trackRange <= 0) return;

      const pointerDelta = currentPointer - dragState.pointerStart;
      const nextScroll = clamp(
        dragState.scrollStart + (pointerDelta / trackRange) * scrollRange,
        0,
        scrollRange,
      );

      if (dragState.orientation === "vertical") {
        viewport.scrollTop = nextScroll;
      } else {
        viewport.scrollLeft = nextScroll;
      }

      updateMetrics();
    },
    [updateMetrics],
  );

  useEffect(() => {
    updateMetrics();

    const resizeObserver = new ResizeObserver(() => {
      updateMetrics();
    });

    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (rootRef.current) resizeObserver.observe(rootRef.current);
    if (contentRef.current) resizeObserver.observe(contentRef.current);
    if (verticalTrackRef.current) resizeObserver.observe(verticalTrackRef.current);
    if (horizontalTrackRef.current) {
      resizeObserver.observe(horizontalTrackRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      stopDragging();
    };
  }, [stopDragging, updateMetrics]);

  function scrollByDelta(left: number, top: number) {
    const viewport = viewportRef.current;

    if (!viewport) return;

    viewport.scrollBy({ left, top, behavior: "auto" });
    updateMetrics();
  }

  function scrollByPage(orientation: Orientation, direction: -1 | 1) {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const amount =
      orientation === "vertical"
        ? Math.max(DEFAULT_STEP_SIZE, viewport.clientHeight - DEFAULT_STEP_SIZE)
        : Math.max(DEFAULT_STEP_SIZE, viewport.clientWidth - DEFAULT_STEP_SIZE);

    scrollByDelta(
      orientation === "horizontal" ? direction * amount : 0,
      orientation === "vertical" ? direction * amount : 0,
    );
  }

  function startThumbDrag(
    orientation: Orientation,
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    const viewport = viewportRef.current;

    if (!viewport) return;

    stopDragging();

    const dragController = new AbortController();

    dragStateRef.current = {
      orientation,
      pointerStart: orientation === "vertical" ? event.clientY : event.clientX,
      scrollStart: orientation === "vertical"
        ? viewport.scrollTop
        : viewport.scrollLeft,
    };
    dragControllerRef.current = dragController;

    event.currentTarget.setPointerCapture(event.pointerId);
    window.addEventListener("pointermove", handlePointerMove, {
      signal: dragController.signal,
    });
    window.addEventListener("pointerup", stopDragging, {
      signal: dragController.signal,
    });
    window.addEventListener("pointercancel", stopDragging, {
      signal: dragController.signal,
    });
  }

  const visibility = getScrollbarVisibility(
    metrics.scrollWidth,
    metrics.scrollHeight,
    metrics.rootWidth || metrics.clientWidth + SCROLLBAR_THICKNESS,
    metrics.rootHeight || metrics.clientHeight + SCROLLBAR_THICKNESS,
  );
  const hasVerticalOverflow = visibility.vertical;
  const hasHorizontalOverflow = visibility.horizontal;
  const verticalThumbSize = getThumbSize(
    metrics.clientHeight,
    metrics.scrollHeight,
    metrics.verticalTrackSize,
  );
  const horizontalThumbSize = getThumbSize(
    metrics.clientWidth,
    metrics.scrollWidth,
    metrics.horizontalTrackSize,
  );
  const verticalThumbOffset = getThumbOffset(
    metrics.scrollTop,
    metrics.clientHeight,
    metrics.scrollHeight,
    metrics.verticalTrackSize,
    verticalThumbSize,
  );
  const horizontalThumbOffset = getThumbOffset(
    metrics.scrollLeft,
    metrics.clientWidth,
    metrics.scrollWidth,
    metrics.horizontalTrackSize,
    horizontalThumbSize,
  );

  return (
    <div
      className={classNames(
        styles.root,
        !hasVerticalOverflow && styles.hideVerticalScrollbar,
        !hasHorizontalOverflow && styles.hideHorizontalScrollbar,
        className,
      )}
      ref={rootRef}
      {...props}
    >
      <div
        className={styles.clientArea}
        onScroll={updateMetrics}
        ref={viewportRef}
      >
        <div className={styles.content} ref={contentRef}>
          {children}
        </div>
      </div>
      {hasVerticalOverflow ? (
        <Scrollbar
          className={styles.verticalScrollbar}
          onPage={(direction) => scrollByPage("vertical", direction)}
          onStep={(direction) => scrollByDelta(0, direction * DEFAULT_STEP_SIZE)}
          onThumbDragStart={(event) => startThumbDrag("vertical", event)}
          orientation="vertical"
          thumbOffset={verticalThumbOffset}
          thumbSize={verticalThumbSize}
          trackRef={verticalTrackRef}
        />
      ) : null}
      {hasHorizontalOverflow ? (
        <Scrollbar
          className={styles.horizontalScrollbar}
          onPage={(direction) => scrollByPage("horizontal", direction)}
          onStep={(direction) => scrollByDelta(direction * DEFAULT_STEP_SIZE, 0)}
          onThumbDragStart={(event) => startThumbDrag("horizontal", event)}
          orientation="horizontal"
          thumbOffset={horizontalThumbOffset}
          thumbSize={horizontalThumbSize}
          trackRef={horizontalTrackRef}
        />
      ) : null}
      {hasVerticalOverflow && hasHorizontalOverflow ? (
        <div className={styles.corner} aria-hidden="true" />
      ) : null}
    </div>
  );
}
