import { AboutContent } from "@/app/_components/portfolio";
import { profile } from "@/data/portfolio";
import SubpageWindow from "@/app/_components/subpage/SubpageWindow/SubpageWindow";

export default function AboutPage() {
  return (
    <SubpageWindow
      title="about_me.txt"
      kicker="C:\\PORTFOLIO\\ABOUT"
      heading="About"
      actions={[
        { label: "Back Home", href: "/" },
        { label: "LinkedIn", href: profile.linkedin, external: true, active: true },
      ]}
    >
      <AboutContent />
    </SubpageWindow>
  );
}
