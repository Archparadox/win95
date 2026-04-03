import { BevelBox, WindowFrame } from "@/app/_components/ui";
import CaptionControls from "../CaptionControls";
import styles from "./FoundationHero.module.css";

export default function FoundationHero() {
  return (
    <WindowFrame
      className={styles.heroWindow}
      controls={<CaptionControls />}
      menuBar={["File", "View", "Window", "Help"]}
      title="control_panel.exe"
    >
      <div className={styles.heroGrid}>
        <div className={styles.copyStack}>
          <p className={styles.kicker}>WINDOWS 95 CONTROL STUDY</p>
          <h1 className={styles.heading}>Compact controls, shell rhythm, and window chrome under test.</h1>
          <p className={styles.body}>
            This page checks whether the rebuilt controls still feel like Windows 95 before they replace the older homepage pieces.
          </p>
        </div>
        <BevelBox className={styles.specPanel} selectable tone="sunken">
          <div className={styles.specGrid}>
            <div>
              <span className={styles.specLabel}>Scale</span>
              <strong>Compact runtime</strong>
            </div>
            <div>
              <span className={styles.specLabel}>Mode</span>
              <strong>800x600</strong>
            </div>
            <div>
              <span className={styles.specLabel}>Control rhythm</span>
              <strong>18 / 23 / 21 / 16</strong>
            </div>
            <div>
              <span className={styles.specLabel}>Reference</span>
              <strong>Homepage + Win95</strong>
            </div>
          </div>
        </BevelBox>
      </div>
    </WindowFrame>
  );
}
