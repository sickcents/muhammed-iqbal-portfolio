"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#DDD8CC] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <a
          href="#"
          className="font-semibold text-[#1A2E1A] tracking-tight hover:text-[#0F8A72] transition-colors shrink-0"
        >
          MI
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#556B55] hover:text-[#0F8A72] transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm bg-[#0F8A72] text-white px-4 py-2 rounded-full hover:bg-[#0B6B58] transition-colors font-medium whitespace-nowrap shrink-0"
          >
            Get in touch
          </a>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <a
            href="#contact"
            className="text-sm bg-[#0F8A72] text-white px-4 py-2 rounded-full hover:bg-[#0B6B58] transition-colors font-medium whitespace-nowrap shrink-0"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-[#DDD8CC] text-[#1A2E1A] hover:border-[#0F8A72] hover:text-[#0F8A72] transition-colors"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <line x1="3.5" y1="3.5" x2="14.5" y2="14.5" />
                  <line x1="14.5" y1="3.5" x2="3.5" y2="14.5" />
                </>
              ) : (
                <>
                  <line x1="2" y1="5" x2="16" y2="5" />
                  <line x1="2" y1="9" x2="16" y2="9" />
                  <line x1="2" y1="13" x2="16" y2="13" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#DDD8CC] shadow-sm">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#556B55] hover:text-[#0F8A72] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
