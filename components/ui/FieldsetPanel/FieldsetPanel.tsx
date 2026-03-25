import { Section, WindowFrame } from "../ShowcaseLayout";
import styles from "./FieldsetPanel.module.css";

function CheckboxRow({
  label,
  checked = false,
}: {
  label: string;
  checked?: boolean;
}) {
  return (
    <div className={styles.choiceRow}>
      <span className={styles.checkControl}>
        {checked ? <span className={styles.radioDot} /> : null}
      </span>
      <span className={styles.choiceLabel}>{label}</span>
    </div>
  );
}

export default function FieldsetPanel() {
  return (
    <WindowFrame title="Fieldset" className={styles.panel}>
      <Section title="Fieldset">
        <fieldset className={styles.fieldset}>
          <legend className={styles.fieldsetLegend}>Network options</legend>
          <div className={styles.fieldsetBody}>
            <p>Configured for legacy desktop controls.</p>
            <div className={styles.fieldsetOptions}>
              <CheckboxRow label="Use system defaults" checked />
              <CheckboxRow label="Prompt before closing" />
            </div>
          </div>
        </fieldset>
      </Section>
    </WindowFrame>
  );
}
