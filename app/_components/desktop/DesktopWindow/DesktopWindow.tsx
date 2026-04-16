"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { Button, Icon, RaisedSurface, ScrollFrame, TitleBar } from "@/app/_components/ui";
import styles from "./DesktopWindow.module.css";
import type { WindowId, WindowState } from "../types";

type DesktopWindowProps = {
  windowItem: WindowState;
  active: boolean;
  menuItems: string[];
  titleIcon?: ReactNode;
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
    titleIcon,
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
      className={`${styles.window} ${styles.desktopWindow} ${
        windowItem.maximized ? styles.maximized : ""
      } ${active ? styles.active : styles.inactive}`}
      style={style}
      onMouseDown={() => onFocus(windowItem.id)}
    >
      <RaisedSurface className={styles.chromeWindow}>
        <TitleBar
          active={active}
          className={styles.titleBar}
          controls={
            <div className={styles.titleButtons}>
              <Button
                aria-label={`Minimize ${windowItem.title}`}
                icon={<Icon name="minimize" size="small" />}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => onMinimize(windowItem.id)}
                variant="caption"
              />
              <Button
                aria-label={`Maximize ${windowItem.title}`}
                icon={<Icon name="maximize" size="small" />}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => onMaximize(windowItem.id)}
                variant="caption"
              />
              <Button
                aria-label={`Close ${windowItem.title}`}
                icon={<Icon name="close" size="small" />}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => onClose(windowItem.id)}
                variant="caption"
              />
            </div>
          }
          onPointerDown={(event) => onDragStart(windowItem.id, event)}
          title={windowItem.title}
          titleIcon={titleIcon}
        />
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
      </RaisedSurface>
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
