"use client";

import Image from "next/image";
import { Button } from "@/app/_components/ui";
import classNames from "@/app/_components/ui/utils/classNames";
import styles from "./StartButton.module.css";

type StartButtonProps = {
  active: boolean;
  className?: string;
  onClick: () => void;
};

export default function StartButton({
  active,
  className,
  onClick,
}: StartButtonProps) {
  return (
    <Button
      active={active}
      aria-pressed={active}
      className={classNames(className, styles.startTaskButton)}
      onClick={onClick}
    >
      <Image
        alt=""
        aria-hidden="true"
        className={styles.startLogo}
        height={16}
        src="/icons/windows95_logo_icon.svg"
        width={18}
      />
      <strong>Start</strong>
    </Button>
  );
}
