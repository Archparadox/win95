"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { ScrollFrame } from "@/app/_components/ui";
import styles from "./DesktopWindow.module.css";
import type { WindowId, WindowState } from "../types";

type DesktopWindowProps = {
  windowItem: WindowState;
  active: boolean;
  menuItems: string[];
  children: ReactNode;
  onFocus: (id: WindowId) => void;
  onDragStart: (id: WindowId, event: ReactPointerEvent<HTMLDivElement>) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onResizeStart: (id: WindowId, event: ReactPointerEvent<HTMLButtonElement>) => void;
};

export default function DesktopWindow(props: DesktopWindowProps) {
  const {
    windowItem,
    active,
    menuItems,
    children,
    onFocus,
    onDragStart,
    onMinimize,
    onMaximize,
    onClose,
    onResizeStart,
  } = props;

  const style = windowItem.maximized
    ? undefined
    : {
        top: `${windowItem.y}px`,
        left: `${windowItem.x}px`,
        width: `${windowItem.width}px`,
        height: `${windowItem.height}px`,
        zIndex: windowItem.z,
      };

  return (
    <article
      className={`${styles.window} ${styles.desktopWindow} ${styles.chromeWindow} ${
        windowItem.maximized ? styles.maximized : ""
      } ${active ? styles.active : styles.inactive}`}
      style={style}
      onMouseDown={() => onFocus(windowItem.id)}
    >
      <div className={styles.titleBar} onPointerDown={(event) => onDragStart(windowItem.id, event)}>
        <span>{windowItem.title}</span>
        <div className={styles.titleButtons}>
          <button
            type="button"
            className={styles.titleButton}
            aria-label={`Minimize ${windowItem.title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onMinimize(windowItem.id)}
          >
            <span className={`${styles.titleGlyph} ${styles.minimizeGlyph}`} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.titleButton}
            aria-label={`Maximize ${windowItem.title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onMaximize(windowItem.id)}
          >
            <span className={`${styles.titleGlyph} ${styles.maximizeGlyph}`} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.titleButton}
            aria-label={`Close ${windowItem.title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onClose(windowItem.id)}
          >
            <span className={`${styles.titleGlyph} ${styles.closeGlyph}`} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className={styles.windowBody}>
        <div className={styles.menuBar} aria-hidden="true">
          {menuItems.map((item) => (
            <span key={item} className={styles.menuItem}>
              {item}
            </span>
          ))}
        </div>
        <ScrollFrame>{children}</ScrollFrame>
      </div>
      {!windowItem.maximized ? (
        <button
          type="button"
          className={styles.resizeGrip}
          aria-label={`Resize ${windowItem.title}`}
          onPointerDown={(event) => onResizeStart(windowItem.id, event)}
        />
      ) : null}
    </article>
  );
}
