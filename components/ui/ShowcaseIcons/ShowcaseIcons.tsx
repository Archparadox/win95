import styles from "./ShowcaseIcons.module.css";

type ChevronDirection = "up" | "down" | "left" | "right";
type ChevronSize = "small" | "default";

export function ChevronIcon({
  direction,
  size,
  disabled = false,
}: {
  direction: ChevronDirection;
  size: ChevronSize;
  disabled?: boolean;
}) {
  const points =
    direction === "up"
      ? "6,2 10,8 2,8"
      : direction === "down"
        ? "2,4 10,4 6,10"
        : direction === "left"
          ? "2,6 8,2 8,10"
          : "4,2 10,6 4,10";

  const dimension = size === "small" ? 8 : 12;

  return (
    <svg
      className={`${styles.symbolIcon} ${size === "small" ? styles.symbolSmall : styles.symbolDefault}`}
      viewBox="0 0 12 12"
      width={dimension}
      height={dimension}
      aria-hidden="true"
      focusable="false"
    >
      {disabled ? <polygon points={points} className={styles.iconShadowFill} transform="translate(1 1)" /> : null}
      <polygon points={points} className={disabled ? styles.iconDisabledFill : styles.iconSolidFill} />
    </svg>
  );
}

export function CheckIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg className={styles.symbolIcon} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      {disabled ? <path d="M2 6.5 4.5 9 10 2" className={styles.iconShadowStroke} /> : null}
      <path d="M2 6.5 4.5 9 10 2" className={disabled ? styles.iconDisabledStroke : styles.iconSolidStroke} />
    </svg>
  );
}

export function CloseMarkIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg className={styles.symbolIcon} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      {disabled ? (
        <>
          <path d="M2 2 10 10M10 2 2 10" className={styles.iconShadowStroke} />
          <path d="M2 2 10 10M10 2 2 10" className={styles.iconDisabledStroke} />
        </>
      ) : (
        <path d="M2 2 10 10M10 2 2 10" className={styles.iconSolidStroke} />
      )}
    </svg>
  );
}

export function QuestionIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg className={styles.symbolIcon} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      {disabled ? <text x="4" y="10" className={styles.iconShadowText}>?</text> : null}
      <text x="3" y="9" className={disabled ? styles.iconDisabledText : styles.iconText}>?</text>
    </svg>
  );
}

export function MaximizeIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg className={styles.symbolIcon} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      {disabled ? <rect x="2.5" y="3.5" width="8" height="6" className={styles.iconShadowRect} /> : null}
      <rect x="1.5" y="2.5" width="8" height="6" className={disabled ? styles.iconDisabledRect : styles.iconRect} />
    </svg>
  );
}

export function MinimizeIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg className={styles.symbolIcon} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      {disabled ? <rect x="3" y="8" width="6" height="2" className={styles.iconShadowRect} /> : null}
      <rect x="2" y="7" width="6" height="2" className={disabled ? styles.iconDisabledRect : styles.iconRect} />
    </svg>
  );
}

export function WarningAlertIcon() {
  return (
    <svg className={styles.alertIcon} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 2 30 29H2Z" fill="#ffeb00" stroke="#8f7f00" strokeWidth="2" />
      <rect x="14.5" y="10" width="3" height="10" fill="#111111" />
      <rect x="14.5" y="23" width="3" height="3" fill="#111111" />
    </svg>
  );
}

export function ErrorAlertIcon() {
  return (
    <svg className={styles.alertIcon} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="14" fill="#ff0000" stroke="#9f0000" strokeWidth="2" />
      <path d="M10 10 22 22M22 10 10 22" stroke="#ffffff" strokeWidth="4" strokeLinecap="square" />
    </svg>
  );
}
