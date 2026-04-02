import type { SVGProps } from "react";
import classNames from "../utils/classNames";
import styles from "./Icon.module.css";

type IconName =
  | "check"
  | "chevronDown"
  | "chevronLeft"
  | "chevronRight"
  | "chevronUp"
  | "close"
  | "maximize"
  | "minimize";

type IconSize = "small" | "default" | "large";

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: IconSize;
  disabled?: boolean;
};

const sizeMap: Record<IconSize, number> = {
  small: 8,
  default: 12,
  large: 24,
};

function renderPaths(name: IconName) {
  switch (name) {
    case "close":
      return (
        <>
          <path d="M2 2L10 10" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges" />
          <path d="M10 2L2 10" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges" />
        </>
      );
    case "minimize":
      return <path d="M1 9H11V11H1z" fill="currentColor" shapeRendering="crispEdges" />;
    case "maximize":
      return (
        <>
          <path d="M1 1H11V11H1z" fill="none" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges" />
          <path d="M1 1H11V3H1z" fill="currentColor" shapeRendering="crispEdges" />
        </>
      );
    case "check":
      return <path d="M1 6L4 9L10 1" fill="none" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges" />;
    case "chevronUp":
      return <path d="M1 9L6 3L11 9" fill="none" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges" />;
    case "chevronDown":
      return <path d="M1 3L6 9L11 3" fill="none" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges" />;
    case "chevronLeft":
      return <path d="M9 1L3 6L9 11" fill="none" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges" />;
    case "chevronRight":
      return <path d="M3 1L9 6L3 11" fill="none" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges" />;
  }
}

export default function Icon({ className, name, size = "default", disabled = false, ...props }: IconProps) {
  const pixelSize = sizeMap[size];

  return (
    <svg
      aria-hidden="true"
      className={classNames(styles.root, disabled && styles.disabled, className)}
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {renderPaths(name)}
    </svg>
  );
}
