import Image from "next/image";

const certs = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    year: "2026",
    badgeImage: "/badges/aws-ai-practitioner.png",
  },
  {
    name: "Certified ScrumMaster",
    issuer: "Scrum Alliance",
    year: "2026",
    badgeImage: "/badges/csm.png",
  },
  {
    name: "AWS Certified SysOps Administrator — Associate",
    issuer: "Amazon Web Services",
    year: "2020",
    badgeImage: "/badges/aws-sysops.png",
  },
  {
    name: "Microsoft Certified Solutions Expert",
    issuer: "Microsoft · MCSE 2016",
    year: "2020",
    badgeImage: "/badges/mcse.png",
  },
  {
    name: "Microsoft Certified Solutions Associate",
    issuer: "Microsoft · MCSA 2012",
    year: "2018",
    badgeImage: "/badges/mcsa.png",
  },
  {
    name: "ITIL v3 Foundation",
    issuer: "AXELOS",
    year: "2013",
    badgeImage: "/badges/itil-foundation.png",
  },
  {
    name: "WSQ Data Science",
    issuer: "Vertical Institute",
    year: "2025",
    badgeImage: "/badges/vertical-institute-logo.svg",
    badgeIsLogo: true,
  },
];

const otherCerts = [
  { name: "Exam 744: Securing Windows Server 2016", badgeImage: "/badges/exam-744.png" },
  { name: "MTA: Security Fundamentals", badgeImage: "/badges/mta-security-fundamentals.png" },
  { name: "Exam 412: Configuring Advanced Windows Server 2012 Services", badgeImage: "/badges/exam-412.png" },
  { name: "Exam 411: Administering Windows Server 2012", badgeImage: "/badges/exam-411.png" },
  { name: "Exam 410: Installing and Configuring Windows Server 2012", badgeImage: "/badges/exam-410.png" },
];

const training = [
  "Amazon Machine Learning University (MLU) — Applied AI/ML, 2025–2026",
  "Microsoft Azure Administrator, 2020",
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 border-t border-[#DDD8CC]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-14">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#4CAF50] uppercase">
              Credentials
            </span>
            <h2 className="text-3xl font-bold text-[#1A2E1A] mt-3">
              Certifications &amp; training
            </h2>
          </div>
          <a
            href="https://www.credly.com/users/muhammed-iqbal-bin-abdul-rahman/badges/credly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#2D6A2D] hover:text-[#1E4D1E] underline underline-offset-4"
          >
            View verified badges on Credly ↗
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {certs.map((cert) => (
            <div
              key={cert.name}
              className="bg-white border border-[#DDD8CC] rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#DDD8CC] flex items-center justify-center overflow-hidden ${
                  cert.badgeIsLogo ? "p-1.5" : ""
                }`}
              >
                {cert.badgeImage.endsWith(".svg") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cert.badgeImage}
                    alt={`${cert.issuer} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src={cert.badgeImage}
                    alt={`${cert.issuer} badge`}
                    width={40}
                    height={40}
                    className={cert.badgeIsLogo ? "object-contain" : "object-cover w-full h-full"}
                  />
                )}
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

        <a
          href="https://www.credly.com/users/muhammed-iqbal-bin-abdul-rahman/badges/credly"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 mb-12 group w-fit"
        >
          <div className="flex -space-x-3">
            {otherCerts.map((cert) => (
              <div
                key={cert.name}
                title={cert.name}
                className="w-9 h-9 rounded-full bg-[#FAF8F4] border-2 border-white ring-1 ring-[#DDD8CC] overflow-hidden shrink-0"
              >
                <Image
                  src={cert.badgeImage}
                  alt={cert.name}
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          <span className="text-sm font-medium text-[#556B55] group-hover:text-[#2D6A2D] transition-colors">
            +{otherCerts.length} other certifications ↗
          </span>
        </a>

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
