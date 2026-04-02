import { WorkContent } from "@/app/_components/portfolio";
import SubpageWindow from "@/app/_components/subpage/SubpageWindow/SubpageWindow";

export default function WorkPage() {
  return (
    <SubpageWindow
      title="work_history.log"
      kicker="C:\\PORTFOLIO\\WORK"
      heading="Work History"
      actions={[
        { label: "Back Home", href: "/" },
        { label: "Next: Projects", href: "/projects" },
      ]}
    >
      <WorkContent />
    </SubpageWindow>
  );
}
