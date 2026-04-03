"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AboutContent, ProjectsContent, WorkContent } from "@/app/_components/portfolio";
import {
  desktopIcons,
  profile,
} from "@/data/portfolio";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import DesktopWindow from "../DesktopWindow/DesktopWindow";
import Taskbar from "../Taskbar/Taskbar";
import styles from "./DesktopPortfolio.module.css";
import type { DragState, ResizeState, WindowId, WindowState } from "../types";

type IconPosition = { x: number; y: number };
type MarqueeState = { startX: number; startY: number } | null;
type SelectionBox = { x: number; y: number; width: number; height: number } | null;
type IconDragState = {
  ids: WindowId[];
  pointerStartX: number;
  pointerStartY: number;
  originPositions: Record<WindowId, IconPosition>;
} | null;

const INITIAL_WINDOWS: Record<WindowId, Omit<WindowState, "z">> = {
  about: { id: "about", title: "about_me.txt", x: 220, y: 44, width: 450, height: 360, minimized: false, maximized: false },
  work: { id: "work", title: "work_history.log", x: 500, y: 110, width: 470, height: 390, minimized: false, maximized: false },
  projects: { id: "projects", title: "projects.dat", x: 300, y: 210, width: 430, height: 340, minimized: false, maximized: false },
  contact: { id: "contact", title: "contact_card.vcf", x: 640, y: 260, width: 320, height: 240, minimized: false, maximized: false },
};

const INITIAL_ICON_POSITIONS: Record<WindowId, IconPosition> = {
  about: { x: 12, y: 8 },
  work: { x: 12, y: 98 },
  projects: { x: 12, y: 188 },
  contact: { x: 12, y: 278 },
};

const DEFAULT_OPEN: WindowId[] = ["about", "work"];
const WINDOW_MENUS: Record<WindowId, string[]> = {
  about: ["File", "Edit", "View", "Help"],
  work: ["File", "Edit", "View", "History", "Help"],
  projects: ["File", "Edit", "View", "Project", "Help"],
  contact: ["File", "Edit", "View", "Help"],
};

const TASKBAR_TRAY_ITEMS = [
  { id: "speaker", label: "Volume", icon: "speaker" },
  { id: "network", label: "Network", icon: "network" },
  { id: "activity", label: "System activity", icon: "activity" },
] as const;

function windowContent(id: WindowId): ReactNode {
  switch (id) {
    case "about":
      return (
        <div className={styles.pageContent}>
          <p className={styles.kicker}>C:\PORTFOLIO\ABOUT</p>
          <h2>About</h2>
          <AboutContent variant="desktop" />
        </div>
      );
    case "work":
      return (
        <div className={styles.pageContent}>
          <p className={styles.kicker}>C:\PORTFOLIO\WORK</p>
          <h2>Work History</h2>
          <WorkContent variant="desktop" />
        </div>
      );
    case "projects":
      return (
        <div className={styles.pageContent}>
          <p className={styles.kicker}>C:\PORTFOLIO\PROJECTS</p>
          <h2>Featured Project</h2>
          <ProjectsContent variant="desktop" />
        </div>
      );
    case "contact":
      return (
        <div className={styles.pageContent}>
          <p className={styles.kicker}>C:\PORTFOLIO\CONTACT</p>
          <h2>Contact</h2>
          <p>For now this portfolio uses a single social contact path.</p>
          <div className={`${styles.contactCard} ${styles.insetPanel}`}>
            <p>Name: {profile.name}</p>
            <p>Role: {profile.role}</p>
            <p>Primary network: LinkedIn</p>
          </div>
          <a className={`${styles.winButton} ${styles.activeButton}`} href={profile.linkedin} target="_blank" rel="noreferrer">
            Open LinkedIn
          </a>
        </div>
      );
  }
}

export default function DesktopPortfolio() {
  const desktopAreaRef = useRef<HTMLElement | null>(null);
  const iconRefs = useRef<Partial<Record<WindowId, HTMLButtonElement | null>>>({});
  const openDelaySeedRef = useRef(137);

  function getClockString() {
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date());
  }

  const [windows, setWindows] = useState<WindowState[]>(() => DEFAULT_OPEN.map((id, index) => ({ ...INITIAL_WINDOWS[id], z: index + 1 })));
  const [selectedIconIds, setSelectedIconIds] = useState<WindowId[]>([]);
  const [iconPositions, setIconPositions] = useState<Record<WindowId, IconPosition>>(INITIAL_ICON_POSITIONS);
  const [dragState, setDragState] = useState<DragState>(null);
  const [resizeState, setResizeState] = useState<ResizeState>(null);
  const [iconDragState, setIconDragState] = useState<IconDragState>(null);
  const [marqueeState, setMarqueeState] = useState<MarqueeState>(null);
  const [selectionBox, setSelectionBox] = useState<SelectionBox>(null);
  const [clock, setClock] = useState(getClockString);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const activeWindowId = useMemo(
    () => windows.reduce<WindowState | null>((top, current) => (!top || current.z > top.z ? current : top), null)?.id ?? null,
    [windows],
  );
  const taskbarWindowButtons = windows.map((windowItem) => ({
    id: windowItem.id,
    title: windowItem.title,
    active: activeWindowId === windowItem.id && !windowItem.minimized,
  }));
  const taskbarStartItems = [
    ...desktopIcons.map((icon) => ({
      id: icon.id,
      label: icon.label,
      iconSrc: `/icons/${icon.id}.svg`,
    })),
    {
      id: "linkedin",
      label: "LinkedIn",
      iconSrc: "/icons/contact.svg",
      href: profile.linkedin,
    },
  ];

  useEffect(() => {
    const intervalId = window.setInterval(() => setClock(getClockString()), 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!dragState) return;
    const activeDrag = dragState;
    function handlePointerMove(event: PointerEvent) {
      setWindows((current) =>
        current.map((windowItem) =>
          windowItem.id !== activeDrag.id || windowItem.maximized
            ? windowItem
            : { ...windowItem, x: Math.max(0, event.clientX - activeDrag.offsetX), y: Math.max(0, event.clientY - activeDrag.offsetY) },
        ),
      );
    }
    function handlePointerUp() {
      setDragState(null);
    }
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState]);

  useEffect(() => {
    if (!resizeState) return;
    const activeResize = resizeState;
    function handlePointerMove(event: PointerEvent) {
      setWindows((current) =>
        current.map((windowItem) =>
          windowItem.id !== activeResize.id || windowItem.maximized
            ? windowItem
            : {
                ...windowItem,
                width: Math.max(260, activeResize.startWidth + (event.clientX - activeResize.startX)),
                height: Math.max(180, activeResize.startHeight + (event.clientY - activeResize.startY)),
              },
        ),
      );
    }
    function handlePointerUp() {
      setResizeState(null);
    }
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [resizeState]);

  useEffect(() => {
    if (!marqueeState) return;
    const activeMarquee = marqueeState;
    function handlePointerMove(event: PointerEvent) {
      const desktop = desktopAreaRef.current;
      if (!desktop) return;
      const rect = desktop.getBoundingClientRect();
      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;
      const nextSelection = {
        x: Math.min(activeMarquee.startX, currentX),
        y: Math.min(activeMarquee.startY, currentY),
        width: Math.abs(currentX - activeMarquee.startX),
        height: Math.abs(currentY - activeMarquee.startY),
      };
      setSelectionBox(nextSelection);
      setSelectedIconIds(
        desktopIcons
          .map((icon) => icon.id as WindowId)
          .filter((id) => {
            const node = iconRefs.current[id];
            if (!node) return false;
            const iconRect = node.getBoundingClientRect();
            const left = iconRect.left - rect.left;
            const top = iconRect.top - rect.top;
            const right = left + iconRect.width;
            const bottom = top + iconRect.height;
            return !(
              right < nextSelection.x ||
              left > nextSelection.x + nextSelection.width ||
              bottom < nextSelection.y ||
              top > nextSelection.y + nextSelection.height
            );
          }),
      );
    }
    function handlePointerUp() {
      setMarqueeState(null);
      setSelectionBox(null);
    }
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [marqueeState]);

  useEffect(() => {
    if (!iconDragState) return;
    const activeIconDrag = iconDragState;
    function handlePointerMove(event: PointerEvent) {
      const deltaX = event.clientX - activeIconDrag.pointerStartX;
      const deltaY = event.clientY - activeIconDrag.pointerStartY;
      setIconPositions((current) => {
        const next = { ...current };
        activeIconDrag.ids.forEach((id) => {
          const origin = activeIconDrag.originPositions[id];
          next[id] = { x: Math.max(0, origin.x + deltaX), y: Math.max(0, origin.y + deltaY) };
        });
        return next;
      });
    }
    function handlePointerUp() {
      setIconDragState(null);
    }
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [iconDragState]);

  function nextZIndex(items: WindowState[]) {
    return items.reduce((max, item) => Math.max(max, item.z), 0) + 1;
  }

  function focusWindow(id: WindowId) {
    setWindows((current) => {
      const nextZ = nextZIndex(current);
      return current.map((windowItem) => (windowItem.id === id ? { ...windowItem, z: nextZ } : windowItem));
    });
  }

  function startDrag(id: WindowId, event: ReactPointerEvent<HTMLDivElement>) {
    const currentWindow = windows.find((windowItem) => windowItem.id === id);
    if (!currentWindow || currentWindow.maximized) return;
    focusWindow(id);
    setDragState({ id, offsetX: event.clientX - currentWindow.x, offsetY: event.clientY - currentWindow.y });
  }

  function startResize(id: WindowId, event: ReactPointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const currentWindow = windows.find((windowItem) => windowItem.id === id);
    if (!currentWindow || currentWindow.maximized) return;
    focusWindow(id);
    setResizeState({
      id,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: currentWindow.width,
      startHeight: currentWindow.height,
    });
  }

  function openWindow(id: WindowId) {
    setStartMenuOpen(false);
    setLoadingCount((count) => count + 1);
    openDelaySeedRef.current = (openDelaySeedRef.current * 73 + 19) % 421;
    const delay = 400 + openDelaySeedRef.current;
    window.setTimeout(() => {
      setWindows((current) => {
        const existing = current.find((windowItem) => windowItem.id === id);
        const z = nextZIndex(current);
        if (existing) return current.map((windowItem) => (windowItem.id === id ? { ...windowItem, minimized: false, z } : windowItem));
        return [...current, { ...INITIAL_WINDOWS[id], z }];
      });
      setLoadingCount((count) => Math.max(0, count - 1));
    }, delay);
  }

  function toggleMinimize(id: WindowId) {
    setWindows((current) => {
      const isMinimized = current.find((windowItem) => windowItem.id === id)?.minimized;
      const z = nextZIndex(current);
      return current.map((windowItem) =>
        windowItem.id === id ? { ...windowItem, minimized: !windowItem.minimized, z: isMinimized ? z : windowItem.z } : windowItem,
      );
    });
  }

  function toggleMaximize(id: WindowId) {
    setWindows((current) => {
      const z = nextZIndex(current);
      return current.map((windowItem) =>
        windowItem.id === id ? { ...windowItem, maximized: !windowItem.maximized, minimized: false, z } : windowItem,
      );
    });
  }

  function closeWindow(id: WindowId) {
    setWindows((current) => current.filter((windowItem) => windowItem.id !== id));
  }

  function startDesktopSelection(event: ReactPointerEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const startX = event.clientX - rect.left;
    const startY = event.clientY - rect.top;
    setSelectedIconIds([]);
    setMarqueeState({ startX, startY });
    setSelectionBox({ x: startX, y: startY, width: 0, height: 0 });
  }

  function handleIconPointerDown(id: WindowId, event: ReactPointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const nextSelected = selectedIconIds.includes(id) ? selectedIconIds : [id];
    setSelectedIconIds(nextSelected);
    const originPositions = nextSelected.reduce<Record<WindowId, IconPosition>>((acc, currentId) => {
      acc[currentId] = iconPositions[currentId];
      return acc;
    }, {} as Record<WindowId, IconPosition>);
    setIconDragState({
      ids: nextSelected,
      pointerStartX: event.clientX,
      pointerStartY: event.clientY,
      originPositions,
    });
  }

  return (
    <main className={`${styles.desktopShell} ${styles.win95Desktop} ${loadingCount > 0 ? styles.loading : ""}`}>
      <section ref={desktopAreaRef} className={styles.desktopArea} aria-label="Desktop shortcuts" onPointerDown={startDesktopSelection}>
        {desktopIcons.map((icon) => {
          const id = icon.id as WindowId;
          const position = iconPositions[id];
          return (
            <DesktopIcon
              key={icon.id}
              id={id}
              label={icon.label}
              selected={selectedIconIds.includes(id)}
              style={{ left: `${position.x}px`, top: `${position.y}px` }}
              iconRef={(node) => {
                iconRefs.current[id] = node;
              }}
              onPointerDown={(event) => handleIconPointerDown(id, event)}
              onDoubleClick={() => openWindow(id)}
            />
          );
        })}
        {selectionBox ? (
          <span
            className={styles.selectionBox}
            style={{
              left: `${selectionBox.x}px`,
              top: `${selectionBox.y}px`,
              width: `${selectionBox.width}px`,
              height: `${selectionBox.height}px`,
            }}
          />
        ) : null}
      </section>
      <section className={styles.windowLayer} aria-label="Open windows">
        {windows.filter((windowItem) => !windowItem.minimized).map((windowItem) => (
          <DesktopWindow
            key={windowItem.id}
            windowItem={windowItem}
            active={windowItem.id === activeWindowId}
            menuItems={WINDOW_MENUS[windowItem.id]}
            onFocus={focusWindow}
            onDragStart={startDrag}
            onMinimize={toggleMinimize}
            onMaximize={toggleMaximize}
            onClose={closeWindow}
            onResizeStart={startResize}
          >
            {windowContent(windowItem.id)}
          </DesktopWindow>
        ))}
      </section>
      <Taskbar
        clock={clock}
        onCloseStartMenu={() => setStartMenuOpen(false)}
        onSelectStartItem={(id) => openWindow(id as WindowId)}
        onSelectWindow={(id) => toggleMinimize(id as WindowId)}
        onToggleStartMenu={() => setStartMenuOpen((current) => !current)}
        startItems={taskbarStartItems}
        startMenuOpen={startMenuOpen}
        trayItems={[...TASKBAR_TRAY_ITEMS]}
        windowButtons={taskbarWindowButtons}
      />
    </main>
  );
}
