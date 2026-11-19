import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';

const PAGE_SIZE = 8; // photos revealed per "Show more" tap

export default function GallerySection() {
  const { gallery } = siteConfig;
  const [activeCategory, setActiveCategory] = useState('All');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState(null); // index into `filtered`

  const filtered = useMemo(
    () => (activeCategory === 'All' ? gallery.items : gallery.items.filter((i) => i.category === activeCategory)),
    [activeCategory, gallery.items]
  );
  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const counts = useMemo(() => {
    const map = { All: gallery.items.length };
    gallery.items.forEach((i) => { map[i.category] = (map[i.category] || 0) + 1; });
    return map;
  }, [gallery.items]);

  const changeCategory = (cat) => {
    setActiveCategory(cat);
    setVisible(PAGE_SIZE);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-zinc-50">
      <style>{`
        @keyframes gl-in-right { from { opacity: 0; transform: translateX(48px) } to { opacity: 1; transform: none } }
        @keyframes gl-in-left  { from { opacity: 0; transform: translateX(-48px) } to { opacity: 1; transform: none } }
        @keyframes gl-fade     { from { opacity: 0 } to { opacity: 1 } }
        @keyframes gl-rise     { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        .gl-in-right { animation: gl-in-right .28s cubic-bezier(.22,1,.36,1) both }
        .gl-in-left  { animation: gl-in-left .28s cubic-bezier(.22,1,.36,1) both }
        .gl-fade     { animation: gl-fade .2s ease-out both }
        .gl-rise     { animation: gl-rise .4s cubic-bezier(.22,1,.36,1) both }
        .gl-hide-scroll { scrollbar-width: none; -ms-overflow-style: none }
        .gl-hide-scroll::-webkit-scrollbar { display: none }
        @media (prefers-reduced-motion: reduce) {
          .gl-in-right, .gl-in-left, .gl-fade, .gl-rise { animation: none }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our Work"
          title="A Glimpse Into Our World"
          subtitle="Every frame tells a story. Browse through our portfolio of carefully crafted moments."
        />

        {/* Filters: swipeable row on mobile, centered on desktop */}
        <div className="-mx-4 sm:mx-0 mb-8 sm:mb-12">
          <div
            role="tablist"
            aria-label="Gallery categories"
            className="gl-hide-scroll flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto sm:overflow-visible px-4 sm:px-0 snap-x"
          >
            {gallery.categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={(e) => {
                    changeCategory(cat);
                    e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
                  }}
                  className={`snap-center shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 h-11 sm:h-10 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 ${
                    active
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                      : 'bg-white text-zinc-600 border border-zinc-200 hover:border-amber-400 hover:text-amber-600'
                  }`}
                >
                  {cat}
                  <span className={`text-xs tabular-nums ${active ? 'text-black/60' : 'text-zinc-400'}`}>{counts[cat] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid: 2 columns on phones with tight gutters so photos never fill the screen */}
        <div key={activeCategory} className="columns-2 lg:columns-3 gap-2 sm:gap-4">
          {shown.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightbox(idx)}
              aria-label={`Open ${item.title}`}
              className="gl-rise group relative block w-full mb-2 sm:mb-4 break-inside-avoid overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-200 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-[0.98] transition-transform"
              style={{ animationDelay: `${Math.min(idx % PAGE_SIZE, 7) * 40}ms` }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-500 sm:group-hover:scale-105"
              />
              {/* Mobile: always-visible caption. Desktop: reveal on hover. */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pt-10 pb-2.5 px-3 sm:p-4 sm:pt-16 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 transition-opacity duration-300">
                <span className="block text-[10px] sm:text-xs text-amber-400 font-semibold tracking-wide uppercase sm:mb-1">{item.category}</span>
                <p className="hidden sm:block text-white font-semibold text-sm">{item.title}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Progress + actions */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-4">
          {filtered.length > PAGE_SIZE && (
            <p className="text-xs text-zinc-500 tabular-nums">
              Showing {shown.length} of {filtered.length}
            </p>
          )}
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 w-full sm:w-auto rounded-full bg-amber-500 text-black font-semibold text-sm shadow-md shadow-amber-500/30 hover:bg-amber-400 active:scale-[0.98] transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
            >
              Show {Math.min(remaining, PAGE_SIZE)} more <ArrowDown size={16} />
            </button>
          )}
          <Button variant="outline" size="lg" className="w-full sm:w-auto">View Full Portfolio</Button>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          items={filtered}
          index={lightbox}
          setIndex={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox: swipe left/right to navigate, swipe down to close         */
/* ------------------------------------------------------------------ */
function Lightbox({ items, index, setIndex, onClose }) {
  const total = items.length;
  const item = items[index];
  const dirRef = useRef('right');
  const startRef = useRef(null);
  const thumbRefs = useRef([]);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });

  const go = useCallback(
    (delta) => {
      dirRef.current = delta > 0 ? 'right' : 'left';
      setIndex((i) => (i + delta + total) % total);
    },
    [setIndex, total]
  );

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go, onClose]);

  // Lock page scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Preload neighbours so swiping feels instant
  useEffect(() => {
    [index - 1, index + 1].forEach((n) => {
      const nb = items[(n + total) % total];
      if (nb) { const img = new Image(); img.src = nb.image; }
    });
  }, [index, items, total]);

  // Keep the active thumbnail centred
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [index]);

  const onPointerDown = (e) => {
    if (e.target.closest('button')) return;
    startRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDrag({ x: 0, y: 0, active: true });
  };
  const onPointerMove = (e) => {
    if (!startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    // lock to a single axis so diagonal swipes feel intentional
    if (Math.abs(dy) > Math.abs(dx)) setDrag({ x: 0, y: Math.max(dy, 0), active: true });
    else setDrag({ x: dx, y: 0, active: true });
  };
  const onPointerUp = () => {
    if (!startRef.current) return;
    const { x, y } = drag;
    startRef.current = null;
    setDrag({ x: 0, y: 0, active: false });
    if (y > 110) onClose();
    else if (x < -60) go(1);
    else if (x > 60) go(-1);
  };

  const fade = Math.max(1 - drag.y / 450, 0.3);
  const scale = 1 - Math.min(drag.y / 1200, 0.12);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="gl-fade fixed inset-0 z-[100] flex flex-col select-none"
      style={{ backgroundColor: `rgba(0,0,0,${0.96 * fade})`, touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-2" style={{ opacity: fade }}>
        <span className="text-white/70 text-sm tabular-nums">
          {index + 1} <span className="text-white/30">/</span> {total}
        </span>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          autoFocus
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-amber-500 hover:text-black transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <X size={22} />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16" onClick={onClose}>
        <button
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          aria-label="Previous photo"
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-amber-500 hover:text-black transition-colors cursor-pointer z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ChevronLeft size={26} />
        </button>

        <img
          key={item.id}
          src={item.image}
          alt={item.title}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          className={`${dirRef.current === 'right' ? 'gl-in-right' : 'gl-in-left'} max-w-full max-h-full object-contain rounded-lg sm:rounded-xl`}
          style={{
            transform: `translate(${drag.x}px, ${drag.y}px) scale(${scale})`,
            transition: drag.active ? 'none' : 'transform .25s cubic-bezier(.22,1,.36,1)',
          }}
        />

        <button
          onClick={(e) => { e.stopPropagation(); go(1); }}
          aria-label="Next photo"
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-amber-500 hover:text-black transition-colors cursor-pointer z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Caption + thumbnails */}
      <div className="pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3" style={{ opacity: fade }}>
        <p className="text-center text-white text-sm font-medium px-4 truncate">{item.title}</p>
        <p className="text-center text-amber-400 text-xs font-semibold uppercase tracking-wide mt-0.5 mb-3">{item.category}</p>

        <div className="gl-hide-scroll flex gap-2 overflow-x-auto px-4 sm:justify-center" onPointerDown={(e) => e.stopPropagation()}>
          {items.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => { dirRef.current = i > index ? 'right' : 'left'; setIndex(i); }}
              aria-label={`Go to ${t.title}`}
              aria-current={i === index}
              className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                i === index ? 'ring-2 ring-amber-500 opacity-100' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <img src={t.image} alt="" loading="lazy" draggable={false} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}