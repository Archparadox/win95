import { ProjectsContent } from "@/components/portfolio";
import SubpageWindow from "@/components/subpage/SubpageWindow/SubpageWindow";

export default function ProjectsPage() {
  return (
    <SubpageWindow
      title="projects.dat"
      kicker="C:\\PORTFOLIO\\PROJECTS"
      heading="Featured Project"
      actions={[
        { label: "Back Home", href: "/" },
        { label: "Review Work History", href: "/work" },
      ]}
    >
      <ProjectsContent />
    </SubpageWindow>
  );
}
