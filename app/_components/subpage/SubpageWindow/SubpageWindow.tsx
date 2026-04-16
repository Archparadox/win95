import type { ReactNode } from "react";
import { Button, Icon, RaisedSurface, TitleBar } from "@/app/_components/ui";
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
      <article className={styles.window}>
        <RaisedSurface className={styles.chromeWindow}>
          <TitleBar
            controls={
              <div className={styles.titleButtons} aria-hidden="true">
                <Button disabled icon={<Icon name="minimize" size="small" />} variant="caption" />
                <Button disabled icon={<Icon name="maximize" size="small" />} variant="caption" />
                <Button disabled icon={<Icon name="close" size="small" />} variant="caption" />
              </div>
            }
            title={title}
          />
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
        </RaisedSurface>
      </article>
    </main>
  );
}
