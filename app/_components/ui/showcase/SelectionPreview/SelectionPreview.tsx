"use client";

import {
  Checkbox,
  Divider,
  Radio,
  WindowFrame,
} from "@/app/_components/ui";
import CaptionControls from "../CaptionControls";
import styles from "./SelectionPreview.module.css";
import React from "react";

const radioOptions = [
  { label: "800x600", value: "800x600" },
  { label: "640x480", value: "640x480" },
  { label: "Mobile later", value: "mobile-later", disabled: true },
];

export default function SelectionPreview() {
  const [checkboxTwoToggled, setCheckboxTwoToggled] =
    React.useState(false);
  const [radioToggled, setRadioToggled] = React.useState(
    radioOptions[0].value,
  );

  return (
    <WindowFrame
      controls={<CaptionControls />}
      size="narrow"
      title="checks.spec"
    >
      <div className={styles.panelStack}>
        <Checkbox checked label="Use bevel highlights" />
        <Checkbox
          focused
          onChange={() => setCheckboxTwoToggled(!checkboxTwoToggled)}
          checked={checkboxTwoToggled}
          label="Show focus treatment"
        />
        <Checkbox checked disabled label="Disabled checked state" />
        <Divider />
        {radioOptions.map((option) => (
          <Radio
            key={option.value}
            checked={radioToggled === option.value}
            disabled={option.disabled}
            label={option.label}
            name="resolution-preview"
            onChange={() => setRadioToggled(option.value)}
          />
        ))}

        {/* <Radio checked onChange={() => setRadioToggled(!radioToggled)} label="800x600" name="resolution-preview" />
        <Radio onChange={() => setRadioToggled(!radioToggled)} label="640x480" name="resolution-preview" />
        <Radio
          disabled
          label="Mobile later"
          name="resolution-preview-disabled"
        /> */}
      </div>
    </WindowFrame>
  );
}
