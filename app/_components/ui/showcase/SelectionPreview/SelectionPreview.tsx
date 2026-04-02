import { Checkbox, Divider, Radio, WindowFrame } from "@/app/_components/ui";
import CaptionControls from "../CaptionControls";
import styles from "./SelectionPreview.module.css";

export default function SelectionPreview() {
  return (
    <WindowFrame controls={<CaptionControls />} size="narrow" title="checks.spec">
      <div className={styles.panelStack}>
        <Checkbox checked label="Use bevel highlights" />
        <Checkbox focused label="Show focus treatment" />
        <Checkbox checked disabled label="Disabled checked state" />
        <Divider />
        <Radio checked label="800x600" name="resolution-preview" />
        <Radio label="640x480" name="resolution-preview" />
        <Radio disabled label="Mobile later" name="resolution-preview-disabled" />
      </div>
    </WindowFrame>
  );
}
