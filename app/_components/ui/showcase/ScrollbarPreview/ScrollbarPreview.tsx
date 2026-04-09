import { ScrollFrame, WindowFrame } from "@/app/_components/ui";
import CaptionControls from "../CaptionControls";
import styles from "./ScrollbarPreview.module.css";

const previewRows = [
  "A:\\SYSTEM\\BOOT\\IO.SYS",
  "C:\\WINDOWS\\SYSTEM\\SHELL.DLL",
  "C:\\PROGRAM FILES\\ACCESSORIES\\WORDPAD.EXE",
  "C:\\PROJECTS\\WEBSITE_PORT\\SCROLLBAR_PREVIEW_SAMPLE.TXT",
  "D:\\ARCHIVE\\1998\\SPRING\\REFERENCE\\AUTHENTIC_WIN95_SCROLL_REGIONS.DOC",
  "NETWORK\\WORKGROUP\\DESKTOP-01\\SHARED\\STYLEGUIDE\\LAYOUTS\\WINDOW_CHROME.BMP",
];

export default function ScrollbarPreview() {
  return (
    <WindowFrame
      contentFlush
      controls={<CaptionControls />}
      size="narrow"
      title="scrollbars.spec"
    >
      <ScrollFrame className={styles.scrollDemo}>
        <div className={styles.previewCanvas}>
          <div className={styles.previewHeader}>
            <span>Path</span>
            <span>Bytes</span>
            <span>Modified</span>
          </div>
          {previewRows.map((row, index) => (
            <div key={row} className={styles.previewRow}>
              <span>{row}</span>
              <span>{(index + 2) * 4096}</span>
              <span>04/03/96 09:{10 + index} AM</span>
            </div>
          ))}
        </div>
      </ScrollFrame>
    </WindowFrame>
  );
}
