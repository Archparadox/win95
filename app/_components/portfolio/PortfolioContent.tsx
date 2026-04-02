import { aboutHighlights, featuredProject, profile, workHistory } from "@/data/portfolio";
import styles from "./PortfolioContent.module.css";

type ContentVariant = "desktop" | "page";

function getRootClassName(variant: ContentVariant) {
  return `${styles.root} ${variant === "desktop" ? styles.desktop : styles.page}`;
}

export function AboutContent({ variant = "page" }: { variant?: ContentVariant }) {
  return (
    <div className={getRootClassName(variant)}>
      <p>
        {profile.name} is a {profile.role.toLowerCase()} building interfaces that feel deliberate, legible, and a little
        unexpected.
      </p>
      <div className={styles.surface}>
        <p>{profile.summary}</p>
        <p>{profile.availability}</p>
        <p>{profile.location}</p>
      </div>
      <ul className={styles.list}>
        {aboutHighlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function WorkContent({ variant = "page" }: { variant?: ContentVariant }) {
  return (
    <div className={getRootClassName(variant)}>
      <div className={styles.timeline}>
        {workHistory.map((role) => (
          <section key={`${role.company}-${role.period}`} className={styles.surface}>
            <p className={styles.period}>{role.period}</p>
            <h2>
              {role.title} @ {role.company}
            </h2>
            <p>{role.summary}</p>
            <ul className={styles.list}>
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function ProjectsContent({ variant = "page" }: { variant?: ContentVariant }) {
  return (
    <div className={getRootClassName(variant)}>
      <section className={`${styles.surface} ${styles.projectPanel}`}>
        <p className={styles.period}>{featuredProject.period}</p>
        <h2>{featuredProject.name}</h2>
        <p>{featuredProject.summary}</p>
        <h3>Stack</h3>
        <ul className={styles.list}>
          {featuredProject.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3>Why it exists</h3>
        <ul className={styles.list}>
          {featuredProject.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
