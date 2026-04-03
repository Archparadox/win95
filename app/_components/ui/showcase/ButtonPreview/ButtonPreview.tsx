import { Button, Divider, Icon, WindowFrame } from "@/app/_components/ui";
import CaptionControls from "../CaptionControls";
import styles from "./ButtonPreview.module.css";

export default function ButtonPreview() {
  return (
    <WindowFrame controls={<CaptionControls />} size="wide" title="buttons.spec">
      <div className={styles.panelStack}>
        <div className={styles.rowWrap}>
          <Button>Default</Button>
          <Button highlighted>Highlighted</Button>
          <Button active>Active</Button>
          <Button focused>Focused</Button>
          <Button disabled>Disabled</Button>
        </div>
        <Divider />
        <div className={styles.rowWrap}>
          <Button icon={<Icon name="check" size="large" />} variant="icon" />
          <Button active icon={<Icon name="check" size="large" />} variant="icon" />
          <Button focused icon={<Icon name="check" size="large" />} variant="icon" />
          <Button disabled icon={<Icon disabled name="check" size="large" />} variant="icon" />
        </div>
        <Divider />
        <div className={styles.rowWrap}>
          <Button icon={<Icon name="close" />} variant="action" />
          <Button active icon={<Icon name="close" />} variant="action" />
          <Button focused icon={<Icon name="close" />} variant="action" />
          <Button disabled icon={<Icon disabled name="close" />} variant="action" />
        </div>
      </div>
    </WindowFrame>
  );
}
