"use client";

import { useState } from "react";
import Taskbar from "@/app/_components/desktop/Taskbar";
import type {
  TaskbarStartItem,
  TaskbarTrayItem,
  TaskbarWindowButton,
} from "@/app/_components/desktop/Taskbar/Taskbar";
import styles from "./TaskbarPreview.module.css";

const START_ITEMS: TaskbarStartItem[] = [
  { id: "programs", label: "Programs", iconSrc: "/window.svg" },
  { id: "documents", label: "Documents", iconSrc: "/file.svg" },
  { id: "settings", label: "Settings", iconSrc: "/icons/about.svg" },
  { id: "find", label: "Find", iconSrc: "/globe.svg" },
  { id: "run", label: "Run...", iconSrc: "/icons/work.svg" },
  { id: "shutdown", label: "Shut Down...", iconSrc: "/icons/contact.svg" },
];

const WINDOW_BUTTONS: TaskbarWindowButton[] = [
  { id: "portfolio", title: "portfolio.exe" },
  { id: "resume", title: "resume.txt" },
  { id: "control", title: "control panel" },
];

const TRAY_ITEMS: TaskbarTrayItem[] = [
  { id: "speaker", label: "Volume", icon: "speaker" },
  { id: "network", label: "Network", icon: "network" },
  { id: "activity", label: "System activity", icon: "activity" },
];

const START_TO_WINDOW: Record<string, string> = {
  programs: "portfolio",
  documents: "resume",
  settings: "control",
};

export default function TaskbarPreview() {
  const [activeWindowId, setActiveWindowId] = useState("portfolio");
  const [startMenuOpen, setStartMenuOpen] = useState(true);

  return (
    <>
      <div className={styles.header}>
        <p className={styles.kicker}>DESKTOP SHELL</p>
        <h2 className={styles.heading}>Taskbar specimen with a Win95-style start strip and boxed tray clock.</h2>
      </div>

      <div className={styles.board} data-win-resolution="800x600">
        <div className={styles.notes}>
          <div className={styles.noteCard}>
            <span className={styles.noteLabel}>Reference cues</span>
            <p>Raised start button, compact task buttons, boxed tray, and a 32px desktop strip.</p>
          </div>
          <div className={styles.noteCard}>
            <span className={styles.noteLabel}>Showcase behavior</span>
            <p>Toggle Start, swap active tasks, and keep the menu visible enough to check item rhythm.</p>
          </div>
          <div className={styles.iconStack} aria-hidden="true">
            <span className={styles.desktopIcon}>My Computer</span>
            <span className={styles.desktopIcon}>Inbox</span>
            <span className={styles.desktopIcon}>Briefcase</span>
          </div>
        </div>

        <Taskbar
          className={styles.taskbar}
          clock="4:00 PM"
          onCloseStartMenu={() => setStartMenuOpen(false)}
          onSelectStartItem={(id) => {
            const nextWindowId = START_TO_WINDOW[id];
            if (nextWindowId) {
              setActiveWindowId(nextWindowId);
            }
          }}
          onSelectWindow={setActiveWindowId}
          onToggleStartMenu={() => setStartMenuOpen((current) => !current)}
          position="static"
          startItems={START_ITEMS}
          startMenuOpen={startMenuOpen}
          trayItems={TRAY_ITEMS}
          windowButtons={WINDOW_BUTTONS.map((item) => ({
            ...item,
            active: item.id === activeWindowId,
          }))}
        />
      </div>
    </>
  );
}
