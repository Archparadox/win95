import Link from "next/link";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import styles from "./WinButton.module.css";

type SharedProps = {
  children?: ReactNode;
  className?: string;
  pressed?: boolean;
  focused?: boolean;
  highlighted?: boolean;
  fullWidth?: boolean;
};

type WinButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SharedProps & {
    variant?: "text" | "taskbar";
  };

type WinIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SharedProps & {
    variant?: "icon" | "action" | "titlebar" | "scrollbar";
  };

type WinLinkButtonProps = SharedProps & {
  href: string;
  external?: boolean;
  variant?: "text" | "taskbar";
};

type GlyphProps = HTMLAttributes<HTMLSpanElement>;

function joinClassNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function getVariantClassName(variant: "text" | "taskbar" | "icon" | "action" | "titlebar" | "scrollbar") {
  switch (variant) {
    case "taskbar":
      return styles.taskbar;
    case "icon":
      return styles.icon;
    case "action":
      return styles.action;
    case "titlebar":
      return styles.titlebar;
    case "scrollbar":
      return styles.scrollbar;
    case "text":
    default:
      return styles.text;
  }
}

function getClassName(
  variant: "text" | "taskbar" | "icon" | "action" | "titlebar" | "scrollbar",
  {
    pressed,
    focused,
    highlighted,
    fullWidth,
    disabled,
    className,
  }: Pick<SharedProps, "pressed" | "focused" | "highlighted" | "fullWidth" | "className"> & {
    disabled?: boolean;
  },
) {
  return joinClassNames(
    styles.control,
    getVariantClassName(variant),
    pressed && styles.pressed,
    focused && styles.focused,
    highlighted && styles.highlighted,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className,
  );
}

function FocusRing({ focused }: { focused?: boolean }) {
  return focused ? <span className={styles.focusRing} aria-hidden="true" /> : null;
}

export default function WinButton({
  children,
  variant = "text",
  className,
  pressed = false,
  focused = false,
  highlighted = false,
  fullWidth = false,
  disabled,
  type = "button",
  ...rest
}: WinButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={getClassName(variant, { pressed, focused, highlighted, fullWidth, disabled, className })}
    >
      <span className={styles.content}>{children}</span>
      <FocusRing focused={focused} />
    </button>
  );
}

export function WinIconButton({
  children,
  variant = "icon",
  className,
  pressed = false,
  focused = false,
  highlighted = false,
  fullWidth = false,
  disabled,
  type = "button",
  ...rest
}: WinIconButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={getClassName(variant, { pressed, focused, highlighted, fullWidth, disabled, className })}
    >
      {children}
      <FocusRing focused={focused} />
    </button>
  );
}

export function WinLinkButton({
  href,
  external = false,
  children,
  variant = "text",
  className,
  pressed = false,
  focused = false,
  highlighted = false,
  fullWidth = false,
}: WinLinkButtonProps) {
  const resolvedClassName = getClassName(variant, {
    pressed,
    focused,
    highlighted,
    fullWidth,
    className,
  });

  const content = (
    <>
      <span className={styles.content}>{children}</span>
      <FocusRing focused={focused} />
    </>
  );

  return external ? (
    <a className={resolvedClassName} href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <Link className={resolvedClassName} href={href}>
      {content}
    </Link>
  );
}

export function Mnemonic({ children }: { children: ReactNode }) {
  return <span className={styles.mnemonic}>{children}</span>;
}

export function ScissorsIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="8" cy="17" r="3.25" className={disabled ? styles.iconBlue : styles.iconBlue} />
      <circle cx="15.75" cy="17" r="3.25" className={disabled ? styles.iconBlue : styles.iconBlue} />
      <path d="M8.2 13.8 11 9.2M15.4 13.7 12.1 8.8M12 8.8V4.2" className={styles.iconStroke} />
      <path d="m12.1 9.4 4.2-3.2" className={styles.iconStroke} />
    </svg>
  );
}

export function CloseIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg className={styles.iconSvg} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {disabled ? <path d="M7 7l10 10M17 7 7 17" className={styles.iconShadowStroke} /> : null}
      <path
        d="M7 7l10 10M17 7 7 17"
        className={disabled ? styles.iconLightStroke : styles.iconStroke}
      />
    </svg>
  );
}

export function MinimizeGlyph(props: GlyphProps) {
  return <span {...props} className={joinClassNames(styles.titlebarGlyph, styles.minimizeGlyph, props.className)} />;
}

export function MaximizeGlyph(props: GlyphProps) {
  return <span {...props} className={joinClassNames(styles.titlebarGlyph, styles.maximizeGlyph, props.className)} />;
}

export function CloseGlyph(props: GlyphProps) {
  return <span {...props} className={joinClassNames(styles.titlebarGlyph, styles.closeGlyph, props.className)} />;
}

export function ChevronUpGlyph(props: GlyphProps) {
  return <span {...props} className={joinClassNames(styles.chevronUp, props.className)} />;
}

export function ChevronDownGlyph(props: GlyphProps) {
  return <span {...props} className={joinClassNames(styles.chevronDown, props.className)} />;
}

export function ChevronLeftGlyph(props: GlyphProps) {
  return <span {...props} className={joinClassNames(styles.chevronLeft, props.className)} />;
}

export function ChevronRightGlyph(props: GlyphProps) {
  return <span {...props} className={joinClassNames(styles.chevronRight, props.className)} />;
}
