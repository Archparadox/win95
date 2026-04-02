import { Scrollbar, WindowFrame } from "@/app/_components/ui";
import CaptionControls from "../CaptionControls";
import styles from "./ScrollbarPreview.module.css";

export default function ScrollbarPreview() {
  return (
    <WindowFrame contentFlush controls={<CaptionControls />} size="narrow" title="scrollbars.spec">
      <div className={styles.scrollDemo}>
        <Scrollbar className={styles.verticalScrollbar} />
        <Scrollbar className={styles.horizontalScrollbar} orientation="horizontal" />
      </div>
    </WindowFrame>
  );
}
