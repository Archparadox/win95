import { Field, WindowFrame } from "@/app/_components/ui";
import CaptionControls from "../CaptionControls";
import styles from "./FieldPreview.module.css";

export default function FieldPreview() {
  return (
    <WindowFrame active={false} controls={<CaptionControls />} size="wide" title="fields.spec">
      <div className={styles.panelStack}>
        <Field defaultValue="Alex Mercer" label="Name" />
        <Field focused defaultValue="Frontend Engineer" label="Role" />
        <Field
          defaultValue="featured"
          kind="select"
          label="Filter"
          options={[
            { label: "Featured", value: "featured" },
            { label: "Archive", value: "archive" },
          ]}
          orientation="horizontal"
        />
        <Field defaultValue="disabled" disabled label="State" orientation="horizontal" />
      </div>
    </WindowFrame>
  );
}
