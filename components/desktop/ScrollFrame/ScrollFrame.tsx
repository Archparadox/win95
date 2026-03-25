"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDownGlyph,
  ChevronLeftGlyph,
  ChevronRightGlyph,
  ChevronUpGlyph,
  WinIconButton,
} from "@/components/ui/WinButton/WinButton";
import styles from "./ScrollFrame.module.css";

export default function ScrollFrame({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [metrics, setMetrics] = useState({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 1,
    scrollWidth: 1,
    clientHeight: 1,
    clientWidth: 1,
  });

  useEffect(() => {
    function updateMetrics() {
      const element = contentRef.current;
      if (!element) return;
      setMetrics({
        scrollTop: element.scrollTop,
        scrollLeft: element.scrollLeft,
        scrollHeight: element.scrollHeight,
        scrollWidth: element.scrollWidth,
        clientHeight: element.clientHeight,
        clientWidth: element.clientWidth,
      });
    }

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  const hasVerticalOverflow = metrics.scrollHeight > metrics.clientHeight;
  const hasHorizontalOverflow = metrics.scrollWidth > metrics.clientWidth;
  const verticalThumbHeight = hasVerticalOverflow
    ? Math.max(18, (metrics.clientHeight / metrics.scrollHeight) * (metrics.clientHeight - 32))
    : metrics.clientHeight - 32;
  const verticalTrackRange = Math.max(0, metrics.clientHeight - 32 - verticalThumbHeight);
  const verticalThumbTop =
    hasVerticalOverflow && verticalTrackRange > 0
      ? (metrics.scrollTop / (metrics.scrollHeight - metrics.clientHeight)) *
        verticalTrackRange
      : 0;
  const horizontalThumbWidth = hasHorizontalOverflow
    ? Math.max(18, (metrics.clientWidth / metrics.scrollWidth) * (metrics.clientWidth - 32))
    : metrics.clientWidth - 32;
  const horizontalTrackRange = Math.max(0, metrics.clientWidth - 32 - horizontalThumbWidth);
  const horizontalThumbLeft =
    hasHorizontalOverflow && horizontalTrackRange > 0
      ? (metrics.scrollLeft / (metrics.scrollWidth - metrics.clientWidth)) *
        horizontalTrackRange
      : 0;

  function updateFromElement() {
    const element = contentRef.current;
    if (!element) return;
    setMetrics({
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
      scrollHeight: element.scrollHeight,
      scrollWidth: element.scrollWidth,
      clientHeight: element.clientHeight,
      clientWidth: element.clientWidth,
    });
  }

  function scrollByDelta(left: number, top: number) {
    const element = contentRef.current;
    if (!element) return;
    element.scrollBy({ left, top, behavior: "auto" });
    updateFromElement();
  }

  return (
    <div className={styles.scrollFrame}>
      <div ref={contentRef} className={styles.clientArea} onScroll={updateFromElement}>
        {children}
      </div>
      <div className={`${styles.scrollbar} ${styles.vertical}`} aria-hidden="true">
        <WinIconButton
          variant="scrollbar"
          className={`${styles.button} ${!hasVerticalOverflow ? styles.disabled : ""}`}
          onClick={() => scrollByDelta(0, -40)}
          disabled={!hasVerticalOverflow}
        >
          <ChevronUpGlyph className={styles.arrow} />
        </WinIconButton>
        <div className={styles.track}>
          <span
            className={`${styles.thumb} ${!hasVerticalOverflow ? styles.disabled : ""}`}
            style={{
              height: `${Math.max(18, verticalThumbHeight)}px`,
              transform: `translateY(${verticalThumbTop}px)`,
            }}
          />
        </div>
        <WinIconButton
          variant="scrollbar"
          className={`${styles.button} ${!hasVerticalOverflow ? styles.disabled : ""}`}
          onClick={() => scrollByDelta(0, 40)}
          disabled={!hasVerticalOverflow}
        >
          <ChevronDownGlyph className={styles.arrow} />
        </WinIconButton>
      </div>
      <div className={`${styles.scrollbar} ${styles.horizontal}`} aria-hidden="true">
        <WinIconButton
          variant="scrollbar"
          className={`${styles.button} ${!hasHorizontalOverflow ? styles.disabled : ""}`}
          onClick={() => scrollByDelta(-40, 0)}
          disabled={!hasHorizontalOverflow}
        >
          <ChevronLeftGlyph className={styles.arrow} />
        </WinIconButton>
        <div className={styles.track}>
          <span
            className={`${styles.thumb} ${!hasHorizontalOverflow ? styles.disabled : ""}`}
            style={{
              width: `${Math.max(18, horizontalThumbWidth)}px`,
              transform: `translateX(${horizontalThumbLeft}px)`,
            }}
          />
        </div>
        <WinIconButton
          variant="scrollbar"
          className={`${styles.button} ${!hasHorizontalOverflow ? styles.disabled : ""}`}
          onClick={() => scrollByDelta(40, 0)}
          disabled={!hasHorizontalOverflow}
        >
          <ChevronRightGlyph className={styles.arrow} />
        </WinIconButton>
      </div>
      <div className={styles.corner} aria-hidden="true" />
    </div>
  );
}
