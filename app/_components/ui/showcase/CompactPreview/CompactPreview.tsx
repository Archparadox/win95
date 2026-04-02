import { Button, Field, Icon, WindowFrame } from "@/app/_components/ui";
import CaptionControls from "../CaptionControls";
import styles from "./CompactPreview.module.css";

export default function CompactPreview() {
  return (
    <>
      <div className={styles.compactHeader}>
        <p className={styles.kicker}>RESOLUTION PREVIEW</p>
        <h2 className={styles.heading}>640x480 keeps the same control grammar with tighter spacing.</h2>
      </div>

      <div className={styles.compactBoard} data-win-resolution="640x480">
        <WindowFrame controls={<CaptionControls />} size="narrow" title="compact_preview.ini">
          <div className={styles.panelStack}>
            <p>Windows stay compact while gutters and desktop spacing tighten.</p>
            <div className={styles.rowWrap}>
              <Button>Open</Button>
              <Button icon={<Icon name="chevronRight" />} variant="action" />
              <Button icon={<Icon name="close" />} variant="caption" />
            </div>
            <Field defaultValue="C:\\PORTFOLIO" label="Path" />
          </div>
        </WindowFrame>
      </div>
    </>
  );
}
