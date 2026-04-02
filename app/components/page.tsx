import ButtonPreview from "@/app/_components/ui/showcase/ButtonPreview";
import CompactPreview from "@/app/_components/ui/showcase/CompactPreview";
import FieldPreview from "@/app/_components/ui/showcase/FieldPreview";
import FoundationHero from "@/app/_components/ui/showcase/FoundationHero";
import ScrollbarPreview from "@/app/_components/ui/showcase/ScrollbarPreview";
import SelectionPreview from "@/app/_components/ui/showcase/SelectionPreview";
import styles from "./page.module.css";

export default function ComponentsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.desktop} data-win-resolution="800x600">
        <FoundationHero />

        <div className={styles.windowGrid}>
          <ButtonPreview />
          <FieldPreview />
          <SelectionPreview />
          <ScrollbarPreview />
        </div>
      </section>

      <section className={styles.compactSection}>
        <CompactPreview />
      </section>
    </main>
  );
}
