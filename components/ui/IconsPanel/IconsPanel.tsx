import {
  ErrorAlertIcon,
  CheckIcon,
  ChevronIcon,
  CloseMarkIcon,
  MaximizeIcon,
  MinimizeIcon,
  QuestionIcon,
  WarningAlertIcon,
} from "../ShowcaseIcons";
import { Divider, Section, WindowFrame } from "../ShowcaseLayout";
import styles from "./IconsPanel.module.css";

const interactionIcons = [
  { label: "Check/Default", icon: <CheckIcon /> },
  { label: "Check/Disabled", icon: <CheckIcon disabled /> },
  { label: "Chevron/Up/Sm/Default", icon: <ChevronIcon direction="up" size="small" /> },
  { label: "Chevron/Up/Sm/Disabled", icon: <ChevronIcon direction="up" size="small" disabled /> },
  { label: "Chevron/Right/Sm/Default", icon: <ChevronIcon direction="right" size="small" /> },
  { label: "Chevron/Right/Sm/Disabled", icon: <ChevronIcon direction="right" size="small" disabled /> },
  { label: "Chevron/Down/Sm/Default", icon: <ChevronIcon direction="down" size="small" /> },
  { label: "Chevron/Down/Sm/Disabled", icon: <ChevronIcon direction="down" size="small" disabled /> },
  { label: "Chevron/Left/Sm/Default", icon: <ChevronIcon direction="left" size="small" /> },
  { label: "Chevron/Left/Sm/Disabled", icon: <ChevronIcon direction="left" size="small" disabled /> },
  { label: "Chevron/Up/Default", icon: <ChevronIcon direction="up" size="default" /> },
  { label: "Chevron/Up/Disabled", icon: <ChevronIcon direction="up" size="default" disabled /> },
  { label: "Chevron/Right/Default", icon: <ChevronIcon direction="right" size="default" /> },
  { label: "Chevron/Right/Disabled", icon: <ChevronIcon direction="right" size="default" disabled /> },
  { label: "Chevron/Down/Default", icon: <ChevronIcon direction="down" size="default" /> },
  { label: "Chevron/Down/Disabled", icon: <ChevronIcon direction="down" size="default" disabled /> },
  { label: "Chevron/Left/Default", icon: <ChevronIcon direction="left" size="default" /> },
  { label: "Chevron/Left/Disabled", icon: <ChevronIcon direction="left" size="default" disabled /> },
  { label: "Close/Default", icon: <CloseMarkIcon /> },
  { label: "Close/Disabled", icon: <CloseMarkIcon disabled /> },
  { label: "Question/Default", icon: <QuestionIcon /> },
  { label: "Question/Disabled", icon: <QuestionIcon disabled /> },
  { label: "Maximize/Default", icon: <MaximizeIcon /> },
  { label: "Maximize/Disabled", icon: <MaximizeIcon disabled /> },
  { label: "Minimize/Default", icon: <MinimizeIcon /> },
  { label: "Minimize/Disabled", icon: <MinimizeIcon disabled /> },
];

export default function IconsPanel() {
  return (
    <WindowFrame title="Icons" className={styles.panel}>
      <Section title="Interaction Icons">
        <div className={styles.iconList}>
          {interactionIcons.map((item) => (
            <div key={item.label} className={styles.iconRow}>
              <span className={styles.iconCell}>{item.icon}</span>
              <span className={styles.iconLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </Section>
      <Divider />
      <Section title="Alert Icons">
        <div className={styles.alertList}>
          <div className={styles.stateRow}>
            <span className={styles.alertCell}>
              <WarningAlertIcon />
            </span>
            <span className={styles.stateLabel}>Warning</span>
          </div>
          <div className={styles.stateRow}>
            <span className={styles.alertCell}>
              <ErrorAlertIcon />
            </span>
            <span className={styles.stateLabel}>Error</span>
          </div>
        </div>
      </Section>
    </WindowFrame>
  );
}
