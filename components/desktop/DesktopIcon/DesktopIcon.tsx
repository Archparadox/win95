"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import styles from "./DesktopIcon.module.css";
import type { WindowId } from "../types";

type DesktopIconProps = {
  id: WindowId;
  label: string;
  selected: boolean;
  style: CSSProperties;
  iconRef: (node: HTMLButtonElement | null) => void;
  onPointerDown: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  onDoubleClick: () => void;
};

export default function DesktopIcon({
  id,
  label,
  selected,
  style,
  iconRef,
  onPointerDown,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <button
      type="button"
      ref={iconRef}
      data-icon-id={id}
      className={`${styles.desktopIcon} ${selected ? styles.selected : ""}`}
      style={style}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
    >
      <Image
        className={styles.graphic}
        src={`/icons/${id}.svg`}
        alt=""
        width={32}
        height={32}
        aria-hidden="true"
      />
      <span>{label}</span>
    </button>
  );
}
