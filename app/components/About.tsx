export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-[#DDD8CC]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <span className="text-xs font-semibold tracking-widest text-[#14B8A6] uppercase">
              About
            </span>
            <h2 className="text-3xl font-bold text-[#1A2E1A] mt-3 leading-tight">
              Ops roots,
              <br />
              AI focus.
            </h2>
          </div>

          <div className="md:col-span-8 space-y-5 text-[#556B55] text-lg leading-relaxed">
            <p>
              I started in field IT support and spent 19+ years working my way
              through enterprise systems engineering, site launches, and fleet
              management.
            </p>
            <p>
              Somewhere along the way I started automating everything — first
              with scripts, then with ML pipelines, then with LLMs.
            </p>
            <p>
              Now I build AI-powered tools that solve real operational problems:
              the kind that cut an hour of manual research down to a minute.
            </p>
            <p className="text-[#1A2E1A] font-medium">
              I&apos;m interested in roles where engineering means shipping
              things that change how people work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
