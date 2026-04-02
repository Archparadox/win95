"use client";

import Image from "next/image";
import styles from "./Taskbar.module.css";
import type { WindowId, WindowState } from "../types";

type DesktopIconItem = { id: string; label: string };

type TaskbarProps = {
  desktopIcons: DesktopIconItem[];
  windows: WindowState[];
  activeWindowId: WindowId | null;
  startMenuOpen: boolean;
  clock: string;
  linkedin: string;
  onToggleStartMenu: () => void;
  onOpenWindow: (id: WindowId) => void;
  onToggleWindow: (id: WindowId) => void;
  onCloseStartMenu: () => void;
};

export default function Taskbar(props: TaskbarProps) {
  const {
    desktopIcons,
    windows,
    activeWindowId,
    startMenuOpen,
    clock,
    linkedin,
    onToggleStartMenu,
    onOpenWindow,
    onToggleWindow,
    onCloseStartMenu,
      } = props;

  return (
    <nav className={styles.taskbar}>
      <button
        type="button"
        className={`${styles.winButton} ${styles.startButton} ${startMenuOpen ? styles.open : ""}`}
        aria-pressed={startMenuOpen}
        onClick={onToggleStartMenu}
      >
        <span className={styles.startLogo} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <strong>Start</strong>
      </button>
      {startMenuOpen ? (
        <div className={`${styles.startMenu} ${styles.chromeWindow}`}>
          <div className={styles.startMenuSidebar}>
            <span>Windows</span>
            <strong>95</strong>
          </div>
          <div className={styles.startMenuItems}>
            {desktopIcons.map((icon) => (
              <button
                key={icon.id}
                type="button"
                className={styles.startMenuItem}
                onClick={() => onOpenWindow(icon.id as WindowId)}
              >
                <Image src={`/icons/${icon.id}.svg`} alt="" width={20} height={20} aria-hidden="true" />
                <span>{icon.label}</span>
              </button>
            ))}
            <a
              className={styles.startMenuItem}
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={onCloseStartMenu}
            >
              <Image src="/icons/contact.svg" alt="" width={20} height={20} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      ) : null}
      <div className={styles.windows}>
        {windows.map((windowItem) => {
          const active = activeWindowId === windowItem.id && !windowItem.minimized;

          return (
            <button
              key={windowItem.id}
              type="button"
              className={`${styles.winButton} ${styles.windowButton} ${active ? styles.selected : ""}`}
              aria-pressed={active}
              onClick={() => onToggleWindow(windowItem.id)}
            >
              {windowItem.title}
            </button>
          );
        })}
      </div>
      <div className={styles.tray} aria-label="System tray">
        <span className={`${styles.trayIcon} ${styles.speaker}`} aria-hidden="true" />
        <span className={`${styles.trayIcon} ${styles.network}`} aria-hidden="true" />
        <div className={styles.clock} aria-label="Clock">
          {clock}
        </div>
      </div>
    </nav>
  );
}
