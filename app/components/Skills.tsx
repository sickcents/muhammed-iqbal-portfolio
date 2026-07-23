const techStack = [
  {
    category: "AI / ML",
    items: ["AWS Bedrock", "LLMs", "RAG", "AI Agents", "Prompt Engineering", "ML Feature Engineering"],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS Lambda", "S3", "EC2", "IAM", "Redshift", "CloudFront", "Data Pipelines"],
  },
  {
    category: "Development",
    items: ["Python", "Flask", "JavaScript", "React", "Next.js", "HTML/CSS", "ZPL", "Git"],
  },
  {
    category: "Operations",
    items: ["Site Launch", "Fleet Management", "Vendor Management", "UAT", "Asset Lifecycle", "SOPs"],
  },
];

const experience = [
  {
    role: "IT Support Engineer III (L5)",
    org: "Amazon",
    period: "Nov 2025 — Jul 2026",
    summary:
      "Designed and deployed AI-enabled internal tooling rolled out across APAC and ME. Cut change-management research from 1 hour to under 1 minute. Won Amazon Global Hackathon, Boston 2025.",
  },
  {
    role: "IT Support Engineer II (L4)",
    org: "Amazon",
    period: "Oct 2020 — Oct 2025",
    summary:
      "Led IT commissioning for Singapore's first Amazon Logistics delivery station in 60 days. Managed 500 devices and $70K budget. Co-created globally-launched Zebra printer fleet management tool.",
  },
  {
    role: "Associate Consultant, Systems Engineer",
    org: "NCS Pte. Ltd.",
    period: "Jun 2014 — Oct 2020",
    summary:
      "Managed server estates on VMware and Hyper-V for government and commercial accounts. Developed PowerShell, VBScript, and batch automations compressing repetitive system tasks.",
  },
  {
    role: "Technical Executive, IT Engineer",
    org: "HP Pte. Ltd.",
    period: "Feb 2012 — Jun 2014",
    summary:
      "Field services for government accounts. Built scripting tools reducing ticket resolution time.",
  },
  {
    role: "Shift Deskside Engineer",
    org: "IBM - Thatz International",
    period: "Feb 2010 — Feb 2012",
    summary:
      "Provided rotating-shift desktop support for SingHealth Outram clinical environments. Configured wireless network rollouts for DBS and compliance systems for MAS and LTA.",
  },
  {
    role: "National Service",
    org: "",
    period: "Jan 2008 — Jan 2010",
    summary: "Full-time National Service, Singapore.",
  },
  {
    role: "IT Engineer",
    org: "IBM - Thatz International",
    period: "Apr 2007 — Dec 2007",
    summary:
      "Provided onsite technical support for enterprise infrastructure projects, contributing to large-scale IT deployments and network upgrades across multiple sites.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-[#DDD8CC]">
      <div className="max-w-5xl mx-auto">
        <span className="text-xs font-semibold tracking-widest text-[#4CAF50] uppercase">
          Stack & Experience
        </span>
        <h2 className="text-3xl font-bold text-[#1A2E1A] mt-3 mb-14">
          Tools and track record
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {techStack.map((group) => (
            <div
              key={group.category}
              className="bg-white border border-[#DDD8CC] rounded-2xl p-6"
            >
              <h3 className="text-xs font-semibold tracking-wider text-[#4CAF50] uppercase mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm bg-[#FAF8F4] border border-[#DDD8CC] text-[#1A2E1A] px-3 py-1.5 rounded-lg font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-[#1A2E1A] mb-8">Career arc</h3>
        <div className="space-y-8">
          {experience.map((job, i) => (
            <div key={i} className="pl-12 relative">
              {i < experience.length - 1 ? (
                <div className="absolute left-4 top-[13px] bottom-[-45px] w-px bg-[#DDD8CC]" />
              ) : (
                <div className="absolute left-4 top-[18px] w-px h-2 rounded-full bg-[#DDD8CC]" />
              )}
              <div className="absolute left-3 top-2 w-2.5 h-2.5 rounded-full bg-[#2D6A2D] border-2 border-[#FAF8F4] ring-1 ring-[#2D6A2D]" />
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="font-semibold text-[#1A2E1A]">{job.role}</span>
                {job.org && (
                  <span className="text-[#4CAF50] font-medium text-sm">@ {job.org}</span>
                )}
              </div>
              <div className="text-xs text-[#556B55] mb-2 font-medium">{job.period}</div>
              <p className="text-sm text-[#556B55] leading-relaxed">{job.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
