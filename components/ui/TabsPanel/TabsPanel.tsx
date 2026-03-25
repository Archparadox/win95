import { Section, StateRow, WindowFrame } from "../ShowcaseLayout";
import styles from "./TabsPanel.module.css";

const tabs = ["Default", "Active"] as const;

function Tab({ active }: { active?: boolean }) {
  return (
    <div className={`${styles.tabWrapper} ${active ? styles.tabActive : styles.tabDefault}`}>
      <span className={styles.tabLabel}>Test tab</span>
    </div>
  );
}

export default function TabsPanel() {
  return (
    <WindowFrame title="Tabs" className={styles.panel}>
      <Section title="Tab States">
        {tabs.map((state) => (
          <StateRow key={state} label={`Tab/${state}`} control={<Tab active={state === "Active"} />} />
        ))}
      </Section>
    </WindowFrame>
  );
}
