import { Section, WindowFrame } from "../ShowcaseLayout";
import styles from "./ProgressBarPanel.module.css";

function ProgressBar() {
  return (
    <div className={styles.progressFrame}>
      {Array.from({ length: 4 }).map((_, index) => (
        <span key={index} className={styles.progressStep} />
      ))}
    </div>
  );
}

export default function ProgressBarPanel() {
  return (
    <WindowFrame title="Progress bar" className={styles.panel}>
      <Section title="Progress">
        <ProgressBar />
      </Section>
    </WindowFrame>
  );
}
