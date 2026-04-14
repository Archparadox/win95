"use client";

import Image from "next/image";
import { Button, Combobox, Icon, WindowFrame } from "@/app/_components/ui";
import styles from "./FieldPreview.module.css";

type FieldPreviewProps = {
  dataVisualId?: string;
  defaultDropdownOpen?: boolean;
};

export default function FieldPreview({ dataVisualId, defaultDropdownOpen = true }: FieldPreviewProps) {
  return (
    <WindowFrame
      className={styles.runWindow}
      controls={<Button className={styles.closeButton} icon={<Icon name="close" />} variant="caption" />}
      data-visual-id={dataVisualId}
      size="narrow"
      title="Run"
    >
      <div className={styles.panelStack}>
        <div className={styles.intro}>
          <Image alt="" className={styles.introIcon} height={18} src="/icons/work.svg" width={18} />
          <p className={styles.introCopy}>
            Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
          </p>
        </div>
        <Combobox
          className={styles.runField}
          defaultOpen={defaultDropdownOpen}
          defaultValue=""
          label="Open:"
          options={[
            { label: "Resume", value: "resume" },
            { label: "Project", value: "project" },
            { label: "MSN", value: "msn" },
            { label: "Mail", value: "mail" },
            { label: "My Bio", value: "my-bio" },
          ]}
          orientation="horizontal"
        />
        <div className={styles.actionRow}>
          <Button className={styles.dialogButton}>OK</Button>
          <Button className={styles.dialogButton}>Cancel</Button>
          <Button className={styles.dialogButton}>Browse...</Button>
        </div>
      </div>
    </WindowFrame>
  );
}
