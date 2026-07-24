export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-16">
      <div className="max-w-5xl mx-auto w-full">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-pulse" />
            <span className="text-sm text-[#556B55] font-medium">
              Open to new opportunities · Singapore
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl font-bold text-[#1A2E1A] leading-tight tracking-tight mb-6"
            style={{
              textShadow:
                "0 0 30px rgba(15,138,114,0.30), 0 0 70px rgba(20,184,166,0.22), 0 0 120px rgba(20,184,166,0.12)",
            }}
          >
            Muhammed
            <br />
            <span className="text-[#0F8A72]">Iqbal</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#556B55] leading-relaxed mb-4 max-w-2xl">
            Engineer at the intersection of AI, operations, and product —
            building internal tools that{" "}
            <span className="text-[#0F8A72] font-semibold">ship at scale.</span>
          </p>

          <p className="text-base text-[#556B55] mb-12 max-w-xl">
            19+ years from field IT to applied AI. I have taken manual tasks
            into AI workflows and ML pipelines tools people actually use.
            Creativity
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-[#0F8A72] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0B6B58] transition-colors"
            >
              View projects
              <span className="text-[#DDD8CC]">↓</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[#DDD8CC] text-[#1A2E1A] px-6 py-3 rounded-full font-semibold hover:border-[#0F8A72] hover:text-[#0F8A72] transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-3 gap-8 max-w-lg border-t border-[#DDD8CC] pt-10">
          {[
            { value: "19+", label: "Years in engineering" },
            {
              value: "100+",
              label: "Users on tools, from local to global use",
            },
            {
              value: "7+",
              label:
                "Physical Stakeholder Engagements, Summits, Hackathons. Worldwide",
            },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-[#0F8A72]">
                {stat.value}
              </div>
              <div className="text-xs text-[#556B55] mt-1 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
