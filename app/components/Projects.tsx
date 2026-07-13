import Image from "next/image";

const projects = [
  {
    id: "auto-negotiator",
    title: "Auto Negotiator",
    category: "Agentic AI",
    tech: ["AI Agents", "Tool Use", "Email API", "Calendar API", "Python"],
    description:
      "Multi-tool AI agent orchestrating email, calendar, and records APIs to automate procurement negotiation end-to-end.",
    goal: "Eliminate manual back-and-forth on routine procurement requests through autonomous agent decision-making.",
    metric: "Target: zero human touchpoints on standard negotiation cycles",
    highlight: true,
    liveUrl: "https://negotiate.fightingwind.com",
    image: "/screenshots/auto-negotiator.png",
  },
  {
    id: "procurement-classifier",
    title: "Procurement Classifier",
    category: "ML · Web App",
    tech: ["ML Classification", "Flask", "Python", "AWS", "React"],
    description:
      "ML classification model integrated into a Flask web application delivering single-click procurement categorization.",
    goal:
      "Replace 4-window context switching with actionable ML intelligence surfaced directly in the workflow.",
    metric: "Deployed to 100+ operational stakeholders across APAC",
    highlight: false,
  },
  {
    id: "opensesame",
    title: "OpenSesame",
    category: "Systems · 3D Web",
    tech: ["PDF Extraction", "SVG Processing", "Three.js", "Python", "Node"],
    description:
      "PDF extraction → SVG processing → 3D web rendering pipeline for real-time indoor asset fault reporting and wayfinding.",
    goal:
      "Give facility and operations teams live visibility into asset status without requiring on-site presence.",
    metric: "Operational visibility for global facility teams across multiple sites",
    highlight: false,
    liveUrl: "https://opensesame.fightingwind.com",
    image: "/screenshots/opensesame.png",
  },
  {
    id: "buslari",
    title: "Buslari",
    category: "Web App · API",
    tech: ["LTA API", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    description:
      "Solari board-inspired transit dashboard integrating Singapore's Land Transport Authority (LTA) API for real-time bus arrival timings.",
    goal:
      "Build a beautiful, retro-styled solari display to show live bus arrival updates for public transit.",
    metric: "Responsive Solari animations with live bus arrival updates",
    highlight: false,
    liveUrl: "https://buslari.fightingwind.com",
    image: "/screenshots/buslari.png",
  },
  {
    id: "eucd-kiosks",
    title: "EUCD Device Kiosks",
    category: "Systems Integration",
    tech: ["Hardware Integration", "Python", "Kiosk UI", "Asset DB", "REST"],
    description:
      "End-to-end hardware-software systems integration powering self-service device check-in/check-out lifecycle management.",
    goal:
      "Remove IT dependency from routine device transactions and create an auditable device lifecycle record.",
    metric: "500 devices managed across 3 operational sites",
    highlight: false,
  },
  {
    id: "printer-fleet",
    title: "Zebra Printer Fleet Tool",
    category: "Fleet Management",
    tech: ["ZPL", "Headless Printing", "Python", "Dashboard", "Fleet API"],
    description:
      "ZPL-based headless printing engine with fleet management dashboard providing single-pane remote control of hardware.",
    goal:
      "Eliminate manual label generation errors and give ops teams remote visibility and control of all printer hardware.",
    metric:
      "95% reduction in label generation time · Global rollout across APAC and ME regions",
    highlight: false,
  },
  {
    id: "tourism-photobooth",
    title: "Tourism Photobooth",
    category: "Creative · Generative AI",
    tech: ["Generative AI", "Image Pipeline", "React", "Node", "Print API"],
    description:
      "Generative AI-powered photobooth experience themed around airline and tourism aesthetics.",
    goal:
      "Demonstrate end-to-end creative AI application — from prompt design to physical printed output.",
    metric: "End-to-end from AI generation to printed output in under 30 seconds",
    highlight: false,
    liveUrl: "https://photobooth.fightingwind.com",
    image: "/screenshots/tourism-photobooth.png",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div
      className={`relative bg-white rounded-2xl p-7 border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group ${
        project.highlight
          ? "border-[#2D6A2D] shadow-sm"
          : "border-[#DDD8CC]"
      }`}
    >
      {project.highlight && (
        <div className="absolute -top-3 left-6 z-10">
          <span className="bg-[#4CAF50] text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      {project.image && (
        <div className="relative z-0 -mx-7 -mt-7 mb-5 aspect-video overflow-hidden rounded-t-2xl border-b border-[#DDD8CC] bg-[#FAF8F4]">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-semibold tracking-wider text-[#4CAF50] uppercase">
          {project.category}
        </span>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white bg-[#2D6A2D] hover:bg-[#245424] transition-colors px-2.5 py-1 rounded-full"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="text-white"
            >
              <path
                d="M2 8L8 2M8 2H3.5M8 2V6.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View live
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-[#556B55] bg-[#FAF8F4] border border-[#DDD8CC] px-2.5 py-1 rounded-full">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="text-[#556B55]"
            >
              <rect
                x="1"
                y="4"
                width="8"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M3 4V3a2 2 0 0 1 4 0v1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            Case study coming soon
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-[#1A2E1A] mb-2 group-hover:text-[#2D6A2D] transition-colors">
        {project.title}
      </h3>

      <p className="text-[#556B55] text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      <p className="text-[#556B55] text-sm leading-relaxed mb-5">
        <span className="text-[#1A2E1A] font-medium">Goal: </span>
        {project.goal}
      </p>

      <div className="bg-[#FAF8F4] rounded-xl px-4 py-3 mb-5 border border-[#DDD8CC]">
        <p className="text-xs text-[#2D6A2D] font-semibold leading-relaxed">
          {project.metric}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs bg-[#F0EBE1] text-[#556B55] px-2.5 py-1 rounded-md font-medium"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-[#DDD8CC]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#4CAF50] uppercase">
            Projects
          </span>
          <h2 className="text-3xl font-bold text-[#1A2E1A] mt-3">
            What I build
          </h2>
          <p className="text-[#556B55] mt-3 max-w-xl">
            Applied AI and systems work — from agentic pipelines to hardware
            integrations. Case studies and demos in progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
