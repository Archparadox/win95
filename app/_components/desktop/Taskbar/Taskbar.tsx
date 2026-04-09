"use client";

import Image from "next/image";
import { Button } from "@/app/_components/ui";
import classNames from "@/app/_components/ui/utils/classNames";
import StartButton from "./StartButton";
import styles from "./Taskbar.module.css";

export type TaskbarStartItem = {
  id: string;
  label: string;
  iconSrc: string;
  href?: string;
};

export type TaskbarWindowButton = {
  id: string;
  title: string;
  active?: boolean;
};

export type TaskbarTrayItem = {
  id: string;
  label: string;
  icon: "speaker" | "network" | "activity";
};

const DEFAULT_TRAY_ITEMS: TaskbarTrayItem[] = [
  { id: "speaker", label: "Volume", icon: "speaker" },
  { id: "network", label: "Network", icon: "network" },
  { id: "activity", label: "System activity", icon: "activity" },
];

type TaskbarProps = {
  className?: string;
  clock: string;
  position?: "fixed" | "static";
  startItems: TaskbarStartItem[];
  startMenuBrand?: { label: string; version: string };
  startMenuOpen: boolean;
  trayItems?: TaskbarTrayItem[];
  windowButtons: TaskbarWindowButton[];
  onCloseStartMenu: () => void;
  onSelectStartItem?: (id: string) => void;
  onSelectWindow: (id: string) => void;
  onToggleStartMenu: () => void;
};

export default function Taskbar(props: TaskbarProps) {
  const {
    className,
    clock,
    onCloseStartMenu,
    onSelectStartItem,
    onSelectWindow,
    onToggleStartMenu,
    position = "fixed",
    startItems,
    startMenuBrand = { label: "Windows", version: "95" },
    startMenuOpen,
    trayItems = DEFAULT_TRAY_ITEMS,
    windowButtons,
  } = props;

  return (
    <nav
      className={classNames(
        styles.taskbar,
        styles[position],
        className,
      )}
    >
      <StartButton
        active={startMenuOpen}
        className={styles.taskbarButton}
        onClick={onToggleStartMenu}
      />
      {startMenuOpen ? (
        <div className={`${styles.startMenu} ${styles.chromeWindow}`}>
          <div className={styles.startMenuSidebar}>
            <span>{startMenuBrand.label}</span>
            <strong>{startMenuBrand.version}</strong>
          </div>
          <div className={styles.startMenuItems}>
            {startItems.map((item) =>
              item.href ? (
                <a
                  key={item.id}
                  className={styles.startMenuItem}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onCloseStartMenu}
                >
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </a>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  className={styles.startMenuItem}
                  onClick={() => {
                    onSelectStartItem?.(item.id);
                    onCloseStartMenu();
                  }}
                >
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              ),
            )}
          </div>
        </div>
      ) : null}
      <div className={styles.windows}>
        <span className={styles.windowsDivider} aria-hidden="true" />
        {windowButtons.map((windowItem) => (
          <Button
            key={windowItem.id}
            active={windowItem.active}
            className={classNames(
              styles.taskbarButton,
              styles.windowTaskButton,
            )}
            aria-pressed={windowItem.active}
            onClick={() => onSelectWindow(windowItem.id)}
          >
            {windowItem.title}
          </Button>
        ))}
      </div>
      <div className={styles.tray} aria-label="System tray">
        <span className={styles.trayDivider} aria-hidden="true" />
        {trayItems.map((item) => (
          <span
            key={item.id}
            role="img"
            aria-label={item.label}
            className={classNames(styles.trayIcon, styles[item.icon])}
          />
        ))}
        <div className={styles.clock} aria-label="Clock">
          {clock}
        </div>
      </div>
    </nav>
  );
}
