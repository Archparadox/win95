"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDownGlyph, ChevronUpGlyph } from "@/components/ui/WinButton/WinButton";
import { Divider, Section, WindowFrame } from "../ShowcaseLayout";
import { CheckIcon } from "../ShowcaseIcons";
import styles from "./InputsPanel.module.css";

type InputState = "default" | "focused" | "disabled";
type LabelOrientation = "vertical" | "horizontal";
type InputKind = "text" | "number" | "color" | "select";

function InputShell({
  state,
  children,
  className,
}: {
  state: InputState;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${styles.inputShell} ${
        state === "focused" ? styles.inputShellFocused : ""
      } ${state === "disabled" ? styles.inputShellDisabled : ""} ${className ?? ""}`}
    >
      {children}
      {state === "focused" ? <span className={styles.inputFocusRing} aria-hidden="true" /> : null}
    </div>
  );
}

function SmallActionButton({ children }: { children: ReactNode }) {
  return (
    <span className={styles.smallActionButton}>
      <span className={styles.smallActionContent}>{children}</span>
    </span>
  );
}

function InputExample({
  kind,
  label,
  orientation,
  state,
}: {
  kind: InputKind;
  label: string;
  orientation: LabelOrientation;
  state: InputState;
}) {
  const value =
    kind === "number"
      ? "128"
      : kind === "color"
        ? "#0f0086"
        : kind === "select"
          ? "Choose option"
          : "Test value";

  return (
    <div className={`${styles.inputExample} ${orientation === "horizontal" ? styles.horizontalField : ""}`}>
      <label className={styles.inputLabel}>{label}</label>
      <InputShell state={state}>
        <span className={styles.inputValue}>{value}</span>
        {kind === "color" ? <span className={styles.colorSwatch} /> : null}
        {kind === "number" ? (
          <span className={styles.spinnerGroup}>
            <SmallActionButton>
              <ChevronUpGlyph className={styles.smallChevron} />
            </SmallActionButton>
            <SmallActionButton>
              <ChevronDownGlyph className={styles.smallChevron} />
            </SmallActionButton>
          </span>
        ) : null}
        {kind === "select" ? (
          <SmallActionButton>
            <ChevronDownGlyph className={styles.smallChevron} />
          </SmallActionButton>
        ) : null}
      </InputShell>
    </div>
  );
}

function CheckControl({
  checked,
  round = false,
  disabled = false,
  focused = false,
}: {
  checked?: boolean;
  round?: boolean;
  disabled?: boolean;
  focused?: boolean;
}) {
  return (
    <span
      className={`${styles.checkControl} ${round ? styles.radioControl : ""} ${
        disabled ? styles.checkControlDisabled : ""
      } ${focused ? styles.checkControlFocused : ""}`}
    >
      {checked ? round ? <span className={styles.radioDot} /> : <CheckIcon disabled={disabled} /> : null}
    </span>
  );
}

function CheckboxRow({
  label,
  checked = false,
  disabled = false,
  focused = false,
}: {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  focused?: boolean;
}) {
  return (
    <div className={`${styles.choiceRow} ${disabled ? styles.choiceRowDisabled : ""}`}>
      <CheckControl checked={checked} disabled={disabled} focused={focused} />
      <span className={`${styles.choiceLabel} ${focused ? styles.choiceLabelFocused : ""}`}>{label}</span>
    </div>
  );
}

function RadioRow({
  label,
  checked = false,
  disabled = false,
  focused = false,
}: {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  focused?: boolean;
}) {
  return (
    <div className={`${styles.choiceRow} ${disabled ? styles.choiceRowDisabled : ""}`}>
      <CheckControl round checked={checked} disabled={disabled} focused={focused} />
      <span className={`${styles.choiceLabel} ${focused ? styles.choiceLabelFocused : ""}`}>{label}</span>
    </div>
  );
}

function SelectionListSample() {
  return (
    <div className={styles.selectionList}>
      <InputShell state="default" className={styles.selectionHeader}>
        <span className={styles.inputValue}>Select item</span>
        <SmallActionButton>
          <ChevronDownGlyph className={styles.smallChevron} />
        </SmallActionButton>
      </InputShell>
      <div className={styles.dropdownSurface}>
        <div className={styles.dropdownOption}>Application Data</div>
        <div className={`${styles.dropdownOption} ${styles.dropdownOptionActive}`}>Desktop Settings</div>
        <div className={styles.dropdownDivider} />
        <div className={styles.dropdownOption}>User Profile</div>
      </div>
    </div>
  );
}

function ComboBoxSample() {
  return (
    <div className={styles.comboBox}>
      <InputShell state="default">
        <span className={styles.inputValue}>Quick Search</span>
        <SmallActionButton>
          <ChevronDownGlyph className={styles.smallChevron} />
        </SmallActionButton>
      </InputShell>
      <div className={styles.comboSuggestions}>
        <div className={styles.dropdownOption}>Recent Files</div>
        <div className={`${styles.dropdownOption} ${styles.dropdownOptionActive}`}>Program Manager</div>
        <div className={styles.dropdownOption}>System Tools</div>
      </div>
    </div>
  );
}

export default function InputsPanel() {
  const [name, setName] = useState("Test value");
  const [count, setCount] = useState(128);
  const [accent, setAccent] = useState("#0f0086");
  const [source, setSource] = useState("Choose option");
  const [search, setSearch] = useState("Program");
  const [checked, setChecked] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState<"primary" | "secondary">("primary");
  const [selectOpen, setSelectOpen] = useState(false);

  const sourceOptions = ["Choose option", "Application Data", "Desktop Settings", "User Profile"];
  const suggestions = useMemo(
    () =>
      ["Program Manager", "Program Files", "System Tools", "Recent Files"].filter((item) =>
        item.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  function incrementCount(delta: number) {
    setCount((value) => value + delta);
  }

  return (
    <WindowFrame title="Input" width="wide" className={styles.panel}>
      <Section title="Live Inputs">
        <div className={styles.liveGrid}>
          <label className={styles.liveField}>
            <span className={styles.inputLabel}>Name</span>
            <input
              className={styles.nativeInput}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label className={styles.liveField}>
            <span className={styles.inputLabel}>Count</span>
            <div className={styles.liveNumberField}>
              <input
                className={styles.nativeInput}
                type="number"
                value={count}
                onChange={(event) => setCount(Number(event.target.value) || 0)}
              />
              <div className={styles.liveSpinner}>
                <button type="button" className={styles.liveSpinnerButton} onClick={() => incrementCount(1)}>
                  <ChevronUpGlyph className={styles.smallChevron} />
                </button>
                <button type="button" className={styles.liveSpinnerButton} onClick={() => incrementCount(-1)}>
                  <ChevronDownGlyph className={styles.smallChevron} />
                </button>
              </div>
            </div>
          </label>

          <label className={styles.liveField}>
            <span className={styles.inputLabel}>Accent</span>
            <label className={styles.liveColorField}>
              <input
                className={styles.liveColorInput}
                type="color"
                value={accent}
                onChange={(event) => setAccent(event.target.value)}
              />
              <span className={styles.liveColorSwatch} style={{ background: accent }} />
              <span className={styles.inputValue}>{accent}</span>
            </label>
          </label>

          <div className={styles.liveField}>
            <span className={styles.inputLabel}>Source</span>
            <div className={styles.liveSelect}>
              <button
                type="button"
                className={styles.liveSelectTrigger}
                onClick={() => setSelectOpen((open) => !open)}
                aria-expanded={selectOpen}
              >
                <span className={styles.inputValue}>{source}</span>
                <span className={styles.liveSelectArrow}>
                  <ChevronDownGlyph className={styles.smallChevron} />
                </span>
              </button>
              {selectOpen ? (
                <div className={styles.liveSelectMenu}>
                  {sourceOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.liveSelectOption} ${source === option ? styles.liveSelectOptionActive : ""}`}
                      onClick={() => {
                        setSource(option);
                        setSelectOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <label className={styles.liveField}>
            <span className={styles.inputLabel}>Combo box</span>
            <input
              className={styles.nativeInput}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className={styles.liveSuggestionList}>
              {suggestions.map((item) => (
                <button key={item} type="button" className={styles.liveSuggestion} onClick={() => setSearch(item)}>
                  {item}
                </button>
              ))}
            </div>
          </label>

          <div className={styles.liveField}>
            <span className={styles.inputLabel}>Checkbox</span>
            <button type="button" className={styles.liveChoice} onClick={() => setChecked((value) => !value)}>
              <CheckControl checked={checked} />
              <span className={styles.choiceLabel}>Enable desktop mode</span>
            </button>
          </div>

          <div className={styles.liveField}>
            <span className={styles.inputLabel}>Radio</span>
            <div className={styles.liveRadioGroup}>
              <button type="button" className={styles.liveChoice} onClick={() => setSelectedRadio("primary")}>
                <CheckControl round checked={selectedRadio === "primary"} />
                <span className={styles.choiceLabel}>Primary</span>
              </button>
              <button type="button" className={styles.liveChoice} onClick={() => setSelectedRadio("secondary")}>
                <CheckControl round checked={selectedRadio === "secondary"} />
                <span className={styles.choiceLabel}>Secondary</span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.liveReadout}>
          <p>Name: {name || "Empty"}</p>
          <p>Count: {count}</p>
          <p>Accent: {accent}</p>
          <p>Source: {source}</p>
          <p>Search: {search || "Empty"}</p>
          <p>Checkbox: {checked ? "Checked" : "Unchecked"}</p>
          <p>Radio: {selectedRadio}</p>
        </div>
      </Section>
      <Divider />
      <Section title="Text Inputs">
        <div className={styles.inputsGrid}>
          <InputExample kind="text" label="Name" orientation="vertical" state="default" />
          <InputExample kind="text" label="Name" orientation="vertical" state="focused" />
          <InputExample kind="text" label="Name" orientation="vertical" state="disabled" />
          <InputExample kind="text" label="Name" orientation="horizontal" state="default" />
          <InputExample kind="text" label="Name" orientation="horizontal" state="focused" />
          <InputExample kind="text" label="Name" orientation="horizontal" state="disabled" />
        </div>
      </Section>
      <Divider />
      <Section title="Number Inputs">
        <div className={styles.inputsGrid}>
          <InputExample kind="number" label="Count" orientation="vertical" state="default" />
          <InputExample kind="number" label="Count" orientation="vertical" state="focused" />
          <InputExample kind="number" label="Count" orientation="vertical" state="disabled" />
          <InputExample kind="number" label="Count" orientation="horizontal" state="default" />
          <InputExample kind="number" label="Count" orientation="horizontal" state="focused" />
          <InputExample kind="number" label="Count" orientation="horizontal" state="disabled" />
        </div>
      </Section>
      <Divider />
      <Section title="Color Inputs">
        <div className={styles.inputsGrid}>
          <InputExample kind="color" label="Accent" orientation="vertical" state="default" />
          <InputExample kind="color" label="Accent" orientation="vertical" state="focused" />
          <InputExample kind="color" label="Accent" orientation="vertical" state="disabled" />
          <InputExample kind="color" label="Accent" orientation="horizontal" state="default" />
          <InputExample kind="color" label="Accent" orientation="horizontal" state="focused" />
          <InputExample kind="color" label="Accent" orientation="horizontal" state="disabled" />
        </div>
      </Section>
      <Divider />
      <Section title="Select Inputs">
        <div className={styles.inputsGrid}>
          <InputExample kind="select" label="Source" orientation="vertical" state="default" />
          <InputExample kind="select" label="Source" orientation="vertical" state="focused" />
          <InputExample kind="select" label="Source" orientation="vertical" state="disabled" />
          <InputExample kind="select" label="Source" orientation="horizontal" state="default" />
          <InputExample kind="select" label="Source" orientation="horizontal" state="focused" />
          <InputExample kind="select" label="Source" orientation="horizontal" state="disabled" />
        </div>
        <div className={styles.selectSupplement}>
          <SelectionListSample />
          <div className={styles.optionStates}>
            <div className={styles.dropdownOption}>Select option/Default</div>
            <div className={`${styles.dropdownOption} ${styles.dropdownOptionActive}`}>
              Select option/Default/Focused
            </div>
            <div className={`${styles.dropdownOption} ${styles.dropdownOptionChecked}`}>
              Select option/Active
            </div>
            <div className={`${styles.dropdownOption} ${styles.dropdownOptionActive} ${styles.dropdownOptionChecked}`}>
              Select option/Active/Focused
            </div>
          </div>
        </div>
      </Section>
      <Divider />
      <Section title="Selection list">
        <SelectionListSample />
      </Section>
      <Divider />
      <Section title="Combo box">
        <ComboBoxSample />
      </Section>
      <Divider />
      <Section title="Checkbox Inputs">
        <div className={styles.choiceGrid}>
          <CheckboxRow label="Checkbox/Unchecked" />
          <CheckboxRow label="Checkbox/Checked" checked />
          <CheckboxRow label="Checkbox/Disabled/Unchecked" disabled />
          <CheckboxRow label="Checkbox/Disabled/Checked" checked disabled />
          <CheckboxRow label="Checkbox/Focused/Unchecked" focused />
          <CheckboxRow label="Checkbox/Focused/Checked" checked focused />
        </div>
      </Section>
      <Divider />
      <Section title="Radio Inputs">
        <div className={styles.choiceGrid}>
          <RadioRow label="Radio/Unchecked" />
          <RadioRow label="Radio/Checked" checked />
          <RadioRow label="Radio/Disabled/Unchecked" disabled />
          <RadioRow label="Radio/Disabled/Checked" checked disabled />
          <RadioRow label="Radio/Focused/Unchecked" focused />
          <RadioRow label="Radio/Focused/Checked" checked focused />
        </div>
      </Section>
    </WindowFrame>
  );
}
