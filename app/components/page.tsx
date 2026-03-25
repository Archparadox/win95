import {
  ButtonsPanel,
  FieldsetPanel,
  IconsPanel,
  InputsPanel,
  ProgressBarPanel,
  SliderPanel,
  TabsPanel,
} from "@/components/ui";
import styles from "./page.module.css";

export default function ComponentsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        <ButtonsPanel />
        <IconsPanel />
        <TabsPanel />
        <ProgressBarPanel />
        <FieldsetPanel />
        <SliderPanel />
        <InputsPanel />
      </div>
    </main>
  );
}
