const certs = [
  {
    name: "Certified ScrumMaster",
    issuer: "Scrum Alliance",
    year: "2026",
    badge: "CSM",
  },
  {
    name: "AWS SysOps Administrator",
    issuer: "Amazon Web Services",
    year: "2020",
    badge: "AWS",
  },
  {
    name: "Microsoft Certified Solutions Expert",
    issuer: "Microsoft · MCSE 2016",
    year: "",
    badge: "MS",
  },
  {
    name: "Microsoft Certified Solutions Associate",
    issuer: "Microsoft · MCSA 2012",
    year: "",
    badge: "MS",
  },
  {
    name: "ITIL v3 Foundation",
    issuer: "AXELOS",
    year: "2013",
    badge: "ITIL",
  },
];

const training = [
  "Amazon Machine Learning University (MLU) — Applied AI/ML, 2025–2026",
  "Vertical Institute — WSQ Data Science, 2025",
  "Microsoft Azure Administrator, 2020",
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 border-t border-[#DDD8CC]">
      <div className="max-w-5xl mx-auto">
        <span className="text-xs font-semibold tracking-widest text-[#4CAF50] uppercase">
          Credentials
        </span>
        <h2 className="text-3xl font-bold text-[#1A2E1A] mt-3 mb-14">
          Certifications &amp; training
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {certs.map((cert) => (
            <div
              key={cert.name}
              className="bg-white border border-[#DDD8CC] rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#DDD8CC] flex items-center justify-center">
                <span className="text-xs font-bold text-[#2D6A2D]">
                  {cert.badge}
                </span>
              </div>
              <div>
                <div className="font-semibold text-sm text-[#1A2E1A] leading-tight">
                  {cert.name}
                </div>
                <div className="text-xs text-[#556B55] mt-0.5">{cert.issuer}</div>
                {cert.year && (
                  <div className="text-xs text-[#4CAF50] mt-1 font-medium">
                    {cert.year}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#1A2E1A] mb-4">Training</h3>
          <ul className="space-y-2">
            {training.map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-[#556B55]">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
