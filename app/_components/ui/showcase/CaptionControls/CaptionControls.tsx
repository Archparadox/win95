import { Button, Icon } from "@/app/_components/ui";
import styles from "./CaptionControls.module.css";

export default function CaptionControls() {
  return (
    <span className={styles.root}>
      <Button icon={<Icon name="minimize" size="small" />} variant="caption" />
      <Button icon={<Icon name="maximize" size="small" />} variant="caption" />
      <Button icon={<Icon name="close" size="small" />} variant="caption" />
    </span>
  );
}
