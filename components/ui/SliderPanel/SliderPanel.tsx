import { Section, StateRow, WindowFrame } from "../ShowcaseLayout";
import styles from "./SliderPanel.module.css";

function SliderThumb() {
  return <span className={styles.sliderThumb} aria-hidden="true" />;
}

function SliderTrack() {
  return <span className={styles.sliderTrack} aria-hidden="true" />;
}

function Slider() {
  return (
    <div className={styles.sliderControl}>
      <SliderTrack />
      <SliderThumb />
    </div>
  );
}

export default function SliderPanel() {
  return (
    <WindowFrame title="Slider" className={styles.panel}>
      <Section title="Slider Parts">
        <StateRow label="Slider/Thumb" control={<SliderThumb />} />
        <StateRow label="Slider/Track" control={<SliderTrack />} />
        <StateRow label="Slider" control={<Slider />} />
      </Section>
    </WindowFrame>
  );
}
