export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-[#DDD8CC]">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest text-[#14B8A6] uppercase">
            Contact
          </span>
          <h2 className="text-3xl font-bold text-[#1A2E1A] mt-3 mb-4">
            Let&apos;s talk
          </h2>
          <p className="text-[#556B55] mb-10 text-lg leading-relaxed">
            I&apos;m exploring senior engineering roles in Singapore — AI
            tooling, applied AI, or product-focused engineering where shipping
            matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="mailto:muhammediqbalbar@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-[#0F8A72] text-white px-6 py-3.5 rounded-full font-semibold hover:bg-[#0B6B58] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1"
                  y="3"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="white"
                  strokeWidth="1.4"
                />
                <path
                  d="M1 5.5L8 9.5L15 5.5"
                  stroke="white"
                  strokeWidth="1.4"
                />
              </svg>
              muhammediqbalbar@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/muhammed-iqbal-bin-abdul-rahman-a667b5160/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#DDD8CC] text-[#1A2E1A] px-6 py-3.5 rounded-full font-semibold hover:border-[#0F8A72] hover:text-[#0F8A72] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/sickcents"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#DDD8CC] text-[#1A2E1A] px-6 py-3.5 rounded-full font-semibold hover:border-[#0F8A72] hover:text-[#0F8A72] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.credly.com/users/muhammed-iqbal-bin-abdul-rahman/badges/credly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#DDD8CC] text-[#1A2E1A] px-6 py-3.5 rounded-full font-semibold hover:border-[#0F8A72] hover:text-[#0F8A72] transition-colors"
            >
              Credly credentials
            </a>
          </div>
        </div>

        <div className="border-t border-[#DDD8CC] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-sm text-[#556B55]">
            © 2026 Muhammed Iqbal · Singapore
          </span>
        </div>
      </div>
    </section>
  );
}
