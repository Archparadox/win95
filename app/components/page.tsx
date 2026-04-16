import { Button, Icon, InsetSurface, WindowFrame } from "@/app/_components/ui";
import ButtonPreview from "@/app/_components/ui/showcase/ButtonPreview";
import CompactPreview from "@/app/_components/ui/showcase/CompactPreview";
import FieldPreview from "@/app/_components/ui/showcase/FieldPreview";
import FoundationHero from "@/app/_components/ui/showcase/FoundationHero";
import ScrollbarPreview from "@/app/_components/ui/showcase/ScrollbarPreview";
import SelectionPreview from "@/app/_components/ui/showcase/SelectionPreview";
import TaskbarPreview from "@/app/_components/ui/showcase/TaskbarPreview";
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
        <div className={styles.compactSection}>
          <CompactPreview />
        </div>
        <div className={styles.shellSection}>
          <TaskbarPreview />
        </div>
        <div className={styles.codepenSection}>
          <WindowFrame
            className={styles.welcomeWindow}
            contentClassName={styles.welcomeContent}
            controls={<Button icon={<Icon name="close" size="small" />} variant="caption" />}
            footer={<Button>Close</Button>}
            footerClassName={styles.welcomeFooter}
            title="Welcome"
          >
            <InsetSurface className={styles.welcomePanel} variant="field">
              <div className={styles.welcomeScroll}>
                <h3>About this project</h3>
                <p>
                  This ongoing web experiment by{" "}
                  <a href="https://gabriellew.ee" target="_blank" rel="noreferrer">
                    Gabrielle Wee
                  </a>{" "}
                  is an attempt to get as close as possible to Windows&nbsp;95 using primarily CSS
                  and HTML, with a little bit of Javascript magic.
                </p>
                <h3>Changelog</h3>
                <ul>
                  <li>October 12, 2023 - Fix bug where window cannot maximize after resizing</li>
                  <li>September 19, 2023 - Launch first version!</li>
                  <li>March 10, 2023 - Begin experiment.</li>
                </ul>
                <h3>Caveats</h3>
                <ul>
                  <li>
                    The code is pretty convoluted and difficult to follow. It&apos;s not really
                    meant to be an example of best practices!
                  </li>
                  <li>
                    On that note, this demo works best in a desktop view. It may work on mobile
                    devices but not all windows will function properly.
                  </li>
                  <li>Items that are not selectable are not functional (yet).</li>
                  <li>
                    There&apos;s some weird sizing issues that mean that this demo is not 1:1 with
                    actual Windows&nbsp;95 and that&apos;s ok!
                  </li>
                  <li>This demo may not be accessible or easy to navigate using the keyboard.</li>
                  <li>
                    Most of the components work without Javascript, but everything works better with
                    Javascript.
                  </li>
                  <li>
                    There are a few bugs that I haven&apos;t ironed out yet. If you notice one, I&apos;m
                    probably in the process of fixing it!
                  </li>
                </ul>
                <h3>To-do</h3>
                <ul>
                  <li>Iron out bugs. Always.</li>
                  <li>Add documents to the Documents menu</li>
                  <li>Add Inbox and Recycle Bin windows</li>
                  <li>Add Find and Run options from Start menu</li>
                  <li>Enable buttons in Taskbar window on the Start Menu Programs tab</li>
                  <li>Enable tooltips in Taskbar window</li>
                  <li>Enabled status bar tips</li>
                  <li>Get window resizing working on most windows</li>
                  <li>Add window stacking when new windows are opened</li>
                  <li>Add shut down sequence</li>
                </ul>
                <h3>Credits</h3>
                <ul>
                  <li>
                    <a
                      href="https://www.pcjs.org/software/pcx86/sys/windows/win95/4.00.950/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Windows 95 emulator
                    </a>
                  </li>
                  <li>
                    <a href="https://codepen.io/louh/pen/oZJQvm" target="_blank" rel="noreferrer">
                      Windows&nbsp;95 scrollbars
                    </a>
                  </li>
                  <li>Icons are modified from the original Windows&nbsp;95 icons</li>
                </ul>
              </div>
            </InsetSurface>
          </WindowFrame>
        </div>
      </section>
    </main>
  );
}
