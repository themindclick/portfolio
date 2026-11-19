import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import Button from '../components/Button.jsx';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* True once the element has been on screen (stays true). Always true if motion is reduced. */
function useInView(threshold = 0.2) {
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

/* Counts a price like "12,000 LKR" up from 0 when `start` flips true. */
function CountUp({ value, start, delay = 0, duration = 1200 }) {
  const str = String(value);
  const [display, setDisplay] = useState(str);
  useEffect(() => {
    const m = str.match(/^(\D*)(\d[\d,]*\.?\d*)([\s\S]*)$/);
    if (!start || !m || reduced()) return;
    const [, pre, numStr, post] = m;
    const target = parseFloat(numStr.replace(/,/g, ''));
    const dec = (numStr.split('.')[1] || '').length;
    const comma = numStr.includes(',');
    const fmt = (n) => pre + (comma ? n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) : n.toFixed(dec)) + post;
    setDisplay(fmt(0));
    let raf;
    const t = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        setDisplay(fmt(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [start, str, delay, duration]);
  return <span className="tabular-nums">{display}</span>;
}

/* One package: dark text card with the matching photo overlapping its edge.
   Even rows put the photo on the right, odd rows flip it to the left. */
function PackageRow({ plan, index }) {
  const [ref, inView] = useInView(0.2);
  const flip = index % 2 === 1;
  const goContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  const slide = 56; // pixels the card and photo travel while entering
  const cardHidden = { opacity: 0, transform: `translateX(${flip ? slide : -slide}px)` };
  const photoHidden = { opacity: 0, transform: `translateX(${flip ? -slide : slide}px) scale(.92)` };
  const shown = { opacity: 1, transform: 'none' };

  return (
    <div ref={ref} className={`relative flex items-center ${flip ? 'flex-row-reverse' : ''}`}>
      {/* Text card */}
      <div
        className={`relative z-0 flex-1 min-w-0 bg-zinc-900 text-white shadow-xl py-7 sm:py-10 lg:py-14 transition-all duration-700 ease-out motion-reduce:transition-none ${
          flip
            ? '-ml-[10%] pl-[12%] pr-5 sm:pr-8 lg:pr-14 rounded-r-[2.25rem] sm:rounded-r-[3.5rem] text-right'
            : '-mr-[10%] pr-[12%] pl-5 sm:pl-8 lg:pl-14 rounded-l-[2.25rem] sm:rounded-l-[3.5rem]'
        }`}
        style={inView ? shown : cardHidden}
      >
        {plan.popular && (
          <span className={`mb-3 inline-flex items-center gap-1 bg-amber-500 text-black text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full ${flip ? 'flex-row-reverse' : ''}`}>
            <Star size={10} fill="black" /> Most Popular
          </span>
        )}

        <p className="text-zinc-300 text-sm sm:text-lg lg:text-xl">{plan.tag}</p>
        <h3 className="text-white font-bold text-base sm:text-2xl lg:text-3xl leading-snug mt-1 mb-4 sm:mb-5">{plan.name}</h3>

        <ul className="space-y-1.5 sm:space-y-2.5 mb-5 sm:mb-7 text-left">
          {plan.features.map((f, j) => {
            const label = typeof f === 'string' ? null : f.label;
            const text = typeof f === 'string' ? f : f.text;
            return (
              <li
                key={j}
                className="relative pl-3 sm:pl-4 text-zinc-300 text-[11px] sm:text-sm lg:text-base leading-snug sm:leading-relaxed transition-all duration-500 motion-reduce:transition-none"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : `translateX(${flip ? 12 : -12}px)`,
                  transitionDelay: `${350 + j * 90}ms`,
                }}
              >
                <span className="absolute left-0 top-[0.55em] h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-amber-500" />
                {label && <span className="text-white font-semibold">{label}: </span>}
                {text}
              </li>
            );
          })}
        </ul>

        <p className="text-white font-bold text-xl sm:text-3xl lg:text-4xl leading-none mb-4 sm:mb-6">
          <CountUp value={plan.price} start={inView} delay={300} />
          {plan.period && <span className="ml-1.5 text-zinc-400 text-[11px] sm:text-sm font-normal">/ {plan.period}</span>}
        </p>

        <div className={`flex ${flip ? 'justify-end' : ''}`}>
          <Button variant="primary" onClick={goContact}>
            Book This Session
          </Button>
        </div>
      </div>

      {/* Matching photo, overlapping the card edge */}
      <div
        className="relative z-10 w-[42%] sm:w-[38%] shrink-0 transition-all duration-700 ease-out motion-reduce:transition-none"
        style={{ ...(inView ? shown : photoHidden), transitionDelay: '120ms' }}
      >
        <div className="group aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:rounded-[2.25rem] border-[3px] sm:border-4 border-white bg-zinc-300 shadow-2xl">
          {plan.image ? (
            <img
              src={plan.image}
              alt={plan.imageAlt || plan.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 motion-reduce:transition-none"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-zinc-200 to-zinc-400" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const plans = siteConfig.pricing;
  const [headRef, headSeen] = useInView(0.3);

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-zinc-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          ref={headRef}
          className="mb-10 sm:mb-16 transition-all duration-700 ease-out motion-reduce:transition-none"
          style={{ opacity: headSeen ? 1 : 0, transform: headSeen ? 'none' : 'translateY(20px)' }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight">Photography Packages</h2>
          <p className="mt-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-zinc-500">
            {siteConfig.pricingTagline || 'Events / Fashion / Creativity / Weddings'}
          </p>
        </div>

        <div className="space-y-10 sm:space-y-16">
          {plans.map((plan, i) => (
            <PackageRow key={i} plan={plan} index={i} />
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mt-12 sm:mt-16">
          All prices are in Sri Lankan Rupees (LKR). Custom packages available on request.
        </p>
      </div>
    </section>
  );
}