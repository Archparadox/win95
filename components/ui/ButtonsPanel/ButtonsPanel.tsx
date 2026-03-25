"use client";

import { useState } from "react";
import WinButton, { Mnemonic, ScissorsIcon, CloseIcon, WinIconButton } from "@/components/ui/WinButton/WinButton";
import { Divider, Section, StateRow, WindowFrame } from "../ShowcaseLayout";
import styles from "./ButtonsPanel.module.css";

const textButtonStates = ["Default", "Highlighted", "Active", "Focused", "Disabled"] as const;
const iconButtonStates = ["Default", "Active", "Focused", "Disabled"] as const;
const actionButtonStates = ["Default", "Active", "Focused", "Disabled"] as const;

type TextButtonState = (typeof textButtonStates)[number];
type IconButtonState = (typeof iconButtonStates)[number];
type ActionButtonState = (typeof actionButtonStates)[number];

function TextButton({ state }: { state: TextButtonState }) {
  return (
    <WinButton
      highlighted={state === "Highlighted"}
      pressed={state === "Active"}
      focused={state === "Focused"}
      disabled={state === "Disabled"}
    >
      {state === "Default" ? (
        <>
          <Mnemonic>T</Mnemonic>est button
        </>
      ) : (
        "Test button"
      )}
    </WinButton>
  );
}

function IconButton({ state }: { state: IconButtonState }) {
  const disabled = state === "Disabled";

  return (
    <WinIconButton
      variant="icon"
      pressed={state === "Active"}
      focused={state === "Focused"}
      disabled={disabled}
    >
      <ScissorsIcon disabled={disabled} />
    </WinIconButton>
  );
}

function ActionButton({ state }: { state: ActionButtonState }) {
  const disabled = state === "Disabled";

  return (
    <WinIconButton
      variant="action"
      pressed={state === "Active"}
      focused={state === "Focused"}
      disabled={disabled}
    >
      <CloseIcon disabled={disabled} />
    </WinIconButton>
  );
}

export default function ButtonsPanel() {
  const [launchCount, setLaunchCount] = useState(0);
  const [cutModeEnabled, setCutModeEnabled] = useState(false);
  const [lastAction, setLastAction] = useState("Waiting for input");

  function handleLaunch() {
    setLaunchCount((count) => count + 1);
    setLastAction("Primary button executed");
  }

  function handleToggleCutMode() {
    setCutModeEnabled((enabled) => {
      const nextEnabled = !enabled;
      setLastAction(nextEnabled ? "Icon button enabled cut mode" : "Icon button disabled cut mode");
      return nextEnabled;
    });
  }

  function handleReset() {
    setLaunchCount(0);
    setCutModeEnabled(false);
    setLastAction("Action button reset the demo");
  }

  return (
    <WindowFrame title="Buttons" className={styles.panel}>
      <Section title="Live Buttons">
        <div className={styles.liveControls}>
          <WinButton onClick={handleLaunch}>
            <Mnemonic>L</Mnemonic>aunch task
          </WinButton>
          <WinIconButton
            variant="icon"
            pressed={cutModeEnabled}
            aria-pressed={cutModeEnabled}
            aria-label={cutModeEnabled ? "Disable cut mode" : "Enable cut mode"}
            onClick={handleToggleCutMode}
          >
            <ScissorsIcon />
          </WinIconButton>
          <WinIconButton
            variant="action"
            aria-label="Reset buttons demo"
            onClick={handleReset}
          >
            <CloseIcon />
          </WinIconButton>
        </div>
        <div className={styles.liveReadout}>
          <p>Launch count: {launchCount}</p>
          <p>Cut mode: {cutModeEnabled ? "On" : "Off"}</p>
          <p>Last action: {lastAction}</p>
        </div>
      </Section>
      <Divider />
      <Section title="Text Buttons">
        {textButtonStates.map((state) => (
          <StateRow key={state} label={state} control={<TextButton state={state} />} />
        ))}
      </Section>
      <Divider />
      <Section title="Icon Buttons">
        {iconButtonStates.map((state) => (
          <StateRow key={state} label={state} control={<IconButton state={state} />} />
        ))}
      </Section>
      <Divider />
      <Section title="Action Buttons">
        {actionButtonStates.map((state) => (
          <StateRow key={state} label={state} control={<ActionButton state={state} />} />
        ))}
      </Section>
    </WindowFrame>
  );
}
