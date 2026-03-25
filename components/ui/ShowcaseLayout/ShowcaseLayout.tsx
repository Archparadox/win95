import type { ReactNode } from "react";
import { CloseIcon, WinIconButton } from "@/components/ui/WinButton/WinButton";
import styles from "./ShowcaseLayout.module.css";

export function WindowFrame({
  title,
  width = "narrow",
  className,
  children,
}: {
  title: string;
  width?: "narrow" | "wide";
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`${styles.window} ${width === "wide" ? styles.windowWide : styles.windowNarrow} ${
        className ?? ""
      }`}
    >
      <header className={styles.titleBar}>
        <span className={styles.title}>{title}</span>
        <WinIconButton variant="action" className={styles.titleButton}>
          <CloseIcon disabled />
        </WinIconButton>
      </header>
      <div className={styles.windowBody}>{children}</div>
    </article>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export function Divider() {
  return <div className={styles.divider} aria-hidden="true" />;
}

export function StateRow({
  label,
  control,
}: {
  label: string;
  control: ReactNode;
}) {
  return (
    <div className={styles.stateRow}>
      {control}
      <span className={styles.stateLabel}>{label}</span>
    </div>
  );
}
