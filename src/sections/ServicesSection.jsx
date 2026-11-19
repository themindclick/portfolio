import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import SectionHeader from '../components/SectionHeader.jsx';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* True once the element has been on screen (stays true). Always true if motion is reduced. */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

export default function ServicesSection() {
  const [gridRef, inView] = useInView(0.08);

  // Cursor-following amber glow (mouse only, so touch devices never get stuck hover states)
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const goContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="services" className="py-16 sm:py-24 bg-zinc-900">
      <style>{`
        @keyframes sv-rise { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }
        @keyframes sv-chip { from { opacity: 0; transform: scale(.85) } to { opacity: 1; transform: none } }
        .sv-rise { animation: sv-rise .7s cubic-bezier(.22,1,.36,1) backwards }
        .sv-chip { animation: sv-chip .4s cubic-bezier(.22,1,.36,1) backwards }
        @media (prefers-reduced-motion: reduce) { .sv-rise, .sv-chip { animation: none } }
      `}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader
          eyebrow="What We Offer"
          title="Photography Services"
          subtitle="From intimate portraits to grand celebrations — we bring our full artistry to every session."
          light
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {siteConfig.services.map((service, i) => {
            const delay = (i % 3) * 110;
            return (
              <article
                key={service.id}
                onPointerMove={onPointerMove}
                className={`group relative overflow-hidden flex flex-col bg-zinc-800/50 border border-zinc-700/50 hover:border-amber-500/40 rounded-2xl p-5 sm:p-7 transition-[border-color,box-shadow,transform] duration-300 md:hover:-translate-y-1 md:hover:shadow-xl md:hover:shadow-amber-500/10 active:scale-[0.99] ${
                  inView ? 'sv-rise' : 'opacity-0'
                }`}
                style={{ animationDelay: `${delay}ms` }}
              >
                {/* Cursor glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), rgba(245,158,11,.13), transparent 70%)' }}
                />
                {/* Top accent line draws in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-amber-500 via-amber-300 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                />

                <div className="relative flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-900/70 border border-zinc-700/50 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      {service.icon}
                    </div>
                    <h3 className="text-white text-lg sm:text-xl font-bold leading-snug">{service.title}</h3>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{service.description}</p>

                  {/* Chips on phones (compact), check-list from sm up */}
                  <ul className="flex flex-wrap gap-2 sm:block sm:space-y-2 mb-6">
                    {service.features.map((f, j) => (
                      <li
                        key={j}
                        className={`inline-flex sm:flex items-center gap-1.5 sm:gap-2 text-zinc-300 text-xs sm:text-sm rounded-full sm:rounded-none bg-zinc-900/60 sm:bg-transparent border border-zinc-700/50 sm:border-0 px-2.5 py-1 sm:p-0 ${
                          inView ? 'sv-chip' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${delay + 300 + j * 60}ms` }}
                      >
                        <Check size={13} className="text-amber-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-zinc-700/50 pt-4 sm:pt-5 flex items-center justify-between">
                    <span className="text-amber-400 font-semibold text-sm">{service.price}</span>
                    <button
                      onClick={goContact}
                      className="inline-flex items-center gap-1 min-h-11 -my-2 pl-3 text-zinc-400 hover:text-amber-400 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:text-amber-400"
                    >
                      Inquire
                      <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}