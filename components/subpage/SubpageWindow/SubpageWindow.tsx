import type { ReactNode } from "react";
import {
  CloseGlyph,
  MaximizeGlyph,
  MinimizeGlyph,
  WinIconButton,
  WinLinkButton,
} from "@/components/ui/WinButton/WinButton";
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
            <WinIconButton variant="titlebar" disabled className={styles.titleButton}>
              <MinimizeGlyph />
            </WinIconButton>
            <WinIconButton variant="titlebar" disabled className={styles.titleButton}>
              <MaximizeGlyph />
            </WinIconButton>
            <WinIconButton variant="titlebar" disabled className={styles.titleButton}>
              <CloseGlyph />
            </WinIconButton>
          </div>
        </div>
        <div className={styles.windowBody}>
          <p className={styles.kicker}>{kicker}</p>
          <h1>{heading}</h1>
          <div className={styles.content}>{children}</div>
          {actions.length ? (
            <div className={styles.actions}>
              {actions.map((action) =>
                <WinLinkButton
                  key={action.label}
                  href={action.href}
                  external={action.external}
                  pressed={action.active}
                  className={styles.button}
                >
                  {action.label}
                </WinLinkButton>,
              )}
            </div>
          ) : null}
        </div>
      </article>
    </main>
  );
}
