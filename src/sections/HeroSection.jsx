import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/siteConfig.js';
import Button from '../components/Button.jsx';

const SLIDE_MS = 5000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Counts a stat like "500+", "10K", "4.9" up from 0 once, keeping prefix/suffix. */
function CountUp({ value, delay = 0, duration = 1600 }) {
  const str = String(value);
  const match = str.match(/^(\D*)(\d[\d,]*\.?\d*)([\s\S]*)$/);
  const [display, setDisplay] = useState(() => (match && !prefersReducedMotion() ? null : str));

  useEffect(() => {
    if (!match || prefersReducedMotion()) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ''));
    const decimals = (numStr.split('.')[1] || '').length;
    const useComma = numStr.includes(',');
    const fmt = (n) =>
      prefix +
      (useComma
        ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals)) +
      suffix;

    setDisplay(fmt(0));
    let raf;
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(fmt(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, duration]);

  return <span className="tabular-nums">{display ?? str}</span>;
}

export default function HeroSection() {
  const { hero } = siteConfig;
  const images = hero.heroImages;
  const [currentImg, setCurrentImg] = useState(0);
  const bgRef = useRef(null);
  const sectionRef = useRef(null);

  // Autoplay: resets whenever the slide changes (including manual taps) so the progress bar stays in sync
  useEffect(() => {
    if (images.length < 2) return;
    const t = setTimeout(() => setCurrentImg((i) => (i + 1) % images.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [currentImg, images.length]);

  // Preload so crossfades never flash empty
  useEffect(() => {
    images.forEach((src) => { const img = new Image(); img.src = src; });
  }, [images]);

  // Gentle parallax on the background
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const sec = sectionRef.current;
        const bg = bgRef.current;
        if (!sec || !bg) return;
        const y = Math.min(window.scrollY, sec.offsetHeight);
        bg.style.transform = `translate3d(0, ${Math.min(y * 0.25, sec.offsetHeight * 0.14)}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const scrollDown = () =>
    sectionRef.current && window.scrollTo({ top: sectionRef.current.offsetHeight, behavior: 'smooth' });

  // Staggered timing: headline words pull into focus, then everything else follows
  const words = String(hero.headline).split(' ');
  const WORD_STEP = 90;
  const afterHeadline = 350 + words.length * WORD_STEP;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-40 sm:pb-44"
    >
      <style>{`
        @keyframes hr-kb     { from { transform: scale(1.14) } to { transform: scale(1) } }
        @keyframes hr-focus  { 0% { opacity: 0; filter: blur(16px); transform: translateY(10px) scale(1.06) } 100% { opacity: 1; filter: blur(0); transform: none } }
        @keyframes hr-rise   { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }
        @keyframes hr-draw   { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes hr-fill   { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes hr-lock   { 0% { color: #fbbf24; opacity: 1; transform: scale(1.025) } 55% { transform: scale(.995) } 100% { color: rgba(255,255,255,.4); opacity: 1; transform: none } }
        @keyframes hr-scroll { 0% { transform: translateY(0); opacity: 0 } 25% { opacity: 1 } 100% { transform: translateY(22px); opacity: 0 } }
        .hr-kb     { animation: hr-kb ${SLIDE_MS + 1000}ms linear forwards }
        .hr-focus  { display: inline-block; animation: hr-focus .9s cubic-bezier(.22,1,.36,1) both }
        .hr-rise   { animation: hr-rise .8s cubic-bezier(.22,1,.36,1) both }
        .hr-draw   { transform-origin: left; animation: hr-draw 1.1s cubic-bezier(.22,1,.36,1) both }
        .hr-fill   { transform-origin: left; animation: hr-fill ${SLIDE_MS}ms linear forwards }
        .hr-lock   { animation: hr-lock .8s cubic-bezier(.22,1,.36,1) both }
        .hr-scroll { animation: hr-scroll 1.8s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) {
          .hr-kb, .hr-focus, .hr-rise, .hr-draw, .hr-fill, .hr-lock, .hr-scroll { animation: none }
          .hr-fill { transform: scaleX(1) }
        }
      `}</style>

      {/* Background slides: crossfade + slow Ken Burns zoom, with parallax wrapper */}
      <div ref={bgRef} className="absolute -top-[15%] inset-x-0 h-[130%] will-change-transform" aria-hidden="true">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === currentImg ? 'hr-kb' : ''}`}
            style={{ backgroundImage: `url(${img})`, opacity: i === currentImg ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Viewfinder corners: flash amber like an autofocus lock on every slide change */}
      <div
        key={currentImg}
        aria-hidden="true"
        className="hr-lock pointer-events-none absolute inset-4 sm:inset-8 lg:inset-10 z-[5] text-white/40"
      >
        <span className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-current" />
        <span className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-current" />
        <span className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-current" />
        <span className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-current" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span
          className="hr-rise block text-amber-400 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-5 opacity-90"
          style={{ animationDelay: '100ms' }}
        >
          ✦ Professional Photography ✦
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          {words.map((w, i) => (
            <React.Fragment key={i}>
              <span className="hr-focus" style={{ animationDelay: `${250 + i * WORD_STEP}ms` }}>{w}</span>
              {i < words.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </h1>

        <p
          className="hr-rise text-base sm:text-lg md:text-xl text-zinc-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ animationDelay: `${afterHeadline}ms` }}
        >
          {hero.subheadline}
        </p>

        <div
          className="hr-rise flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-12 sm:mb-16"
          style={{ animationDelay: `${afterHeadline + 150}ms` }}
        >
          <div className="w-full sm:w-auto [&>button]:w-full sm:[&>button]:w-auto">
            <Button size="lg" onClick={() => scrollTo('gallery')}>{hero.ctaPrimary.label} →</Button>
          </div>
          <div className="w-full sm:w-auto [&>button]:w-full sm:[&>button]:w-auto">
            <Button size="lg" variant="secondary" onClick={() => scrollTo('contact')}>{hero.ctaSecondary.label}</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative pt-8 sm:pt-10">
          <span
            aria-hidden="true"
            className="hr-draw absolute top-0 left-0 w-full h-px bg-white/20"
            style={{ animationDelay: `${afterHeadline + 250}ms` }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6">
            {hero.stats.map((stat, i) => (
              <div
                key={i}
                className="hr-rise text-center"
                style={{ animationDelay: `${afterHeadline + 350 + i * 100}ms` }}
              >
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <CountUp value={stat.value} delay={afterHeadline + 350 + i * 100} />
                </p>
                <p className="text-amber-400 text-sm font-medium tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide progress: each segment fills over the slide duration, tap to jump */}
      {images.length > 1 && (
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          <span className="text-white/60 text-xs tabular-nums w-9 text-right">
            {String(currentImg + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === currentImg}
                className="group h-8 w-9 sm:w-12 flex items-center cursor-pointer focus:outline-none"
              >
                <span className="relative block w-full h-0.5 rounded-full bg-white/30 overflow-hidden group-focus-visible:ring-2 group-focus-visible:ring-amber-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black">
                  {i === currentImg && <span key={currentImg} className="hr-fill absolute inset-0 bg-amber-500" />}
                  {i < currentImg && <span className="absolute inset-0 bg-white/70" />}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scroll cue */}
      <button
        onClick={scrollDown}
        aria-label="Scroll down"
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-pointer focus:outline-none focus-visible:text-amber-400"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <span className="relative block w-px h-8 bg-white/20 overflow-hidden">
          <span className="hr-scroll absolute top-0 left-0 w-px h-2.5 bg-amber-400" />
        </span>
      </button>
    </section>
  );
}