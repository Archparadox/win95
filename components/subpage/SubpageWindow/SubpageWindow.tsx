import type { ReactNode } from "react";
import styles from "./SubpageWindow.module.css";

type Action = {
  label: string;
  href: string;
  external?: boolean;
  active?: boolean;
};

type SubpageWindowProps = {
  title: string;
  kicker: string;
  heading: string;
  children: ReactNode;
  actions?: Action[];
};

export default function SubpageWindow({
  title,
  kicker,
  heading,
  children,
  actions = [],
}: SubpageWindowProps) {
  return (
    <main className={styles.subpageShell}>
      <article className={`${styles.window} ${styles.chromeWindow}`}>
        <div className={styles.titleBar}>
          <span>{title}</span>
          <div className={styles.titleButtons} aria-hidden="true">
            <button type="button" disabled className={styles.titleButton}>
              <span className={`${styles.titleGlyph} ${styles.minimizeGlyph}`} />
            </button>
            <button type="button" disabled className={styles.titleButton}>
              <span className={`${styles.titleGlyph} ${styles.maximizeGlyph}`} />
            </button>
            <button type="button" disabled className={styles.titleButton}>
              <span className={`${styles.titleGlyph} ${styles.closeGlyph}`} />
            </button>
          </div>
        </div>
        <div className={styles.windowBody}>
          <p className={styles.kicker}>{kicker}</p>
          <h1>{heading}</h1>
          <div className={styles.content}>{children}</div>
          {actions.length ? (
            <div className={styles.actions}>
              {actions.map((action) =>
                <a
                  key={action.label}
                  href={action.href}
                  className={`${styles.button} ${action.active ? styles.buttonActive : ""}`}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noreferrer" : undefined}
                >
                  {action.label}
                </a>,
              )}
            </div>
          ) : null}
        </div>
      </article>
    </main>
  );
}
