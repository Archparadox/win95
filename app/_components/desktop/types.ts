export type WindowId = "about" | "work" | "projects" | "contact";

export type WindowState = {
  id: WindowId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

export type DragState = {
  id: WindowId;
  offsetX: number;
  offsetY: number;
} | null;

export type ResizeState = {
  id: WindowId;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
} | null;
