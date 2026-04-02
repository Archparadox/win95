import { Button, Icon } from "@/app/_components/ui";
import styles from "./CaptionControls.module.css";

export default function CaptionControls() {
  return (
    <span className={styles.root}>
      <Button icon={<Icon name="minimize" />} variant="caption" />
      <Button icon={<Icon name="maximize" />} variant="caption" />
      <Button icon={<Icon name="close" />} variant="caption" />
    </span>
  );
}
