import Link from "next/link";
import styles from "./page.module.css";

export default function ComponentsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>RESET IN PROGRESS</p>
        <h1>Component library removed</h1>
        <p>
          The reusable library attempt was cleared so the project can restart from scratch in a future
          session.
        </p>
        <p>
          The homepage desktop remains the active working demo. Use <Link href="/">the homepage</Link> to review
          the current visual direction.
        </p>
      </section>
    </main>
  );
}
