import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import SectionHeader from '../components/SectionHeader.jsx';

export default function TestimonialsSection() {
  const { testimonials } = siteConfig;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Update visible cards count based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Keep current index within bounds if screen resizes
  useEffect(() => {
    if (current > maxIndex) setCurrent(maxIndex);
  }, [itemsPerView, maxIndex, current]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-advance timer (pauses on hover/touch)
  useEffect(() => {
    if (isPaused || testimonials.length <= itemsPerView) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, testimonials.length, itemsPerView]);

  // Mobile Touch Swipe Handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header & Desktop Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div className="flex-1">
            <SectionHeader
              eyebrow="Client Love"
              title="What Our Clients Say"
              subtitle="Don't just take our word for it — hear from the people behind the photos."
            />
          </div>

          {testimonials.length > itemsPerView && (
            <div className="hidden md:flex items-center gap-2 shrink-0 pb-2">
              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="p-3 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 hover:border-amber-300 hover:text-zinc-900 hover:shadow-sm transition-all active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="p-3 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 hover:border-amber-300 hover:text-zinc-900 hover:shadow-sm transition-all active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Carousel Track */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${current * (100 / itemsPerView)}%)`,
            }}
          >
            {testimonials.map((t, i) => {
              const isActive = i >= current && i < current + itemsPerView;

              return (
                <div
                  key={i}
                  style={{ width: `${100 / itemsPerView}%` }}
                  className="shrink-0 px-2 sm:px-3"
                >
                  <div
                    className={`h-full flex flex-col justify-between bg-zinc-50 rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                      isActive
                        ? 'border-zinc-200/80 shadow-sm hover:border-amber-200 hover:shadow-md'
                        : 'border-zinc-100 opacity-60'
                    }`}
                  >
                    <div>
                      {/* Top Row: Quote Icon & Stars */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                          <Quote size={20} className="text-amber-400" />
                        </div>
                        <div className="flex items-center gap-0.5 bg-white px-2.5 py-1 rounded-full border border-zinc-100">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star
                              key={j}
                              size={12}
                              className="text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-zinc-600 leading-relaxed mb-8 text-sm sm:text-base">
                        "{t.text}"
                      </p>
                    </div>

                    {/* Client Info Footer */}
                    <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-200/60">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-zinc-900 font-semibold text-sm truncate">
                          {t.name}
                        </p>
                        <p className="text-zinc-400 text-xs truncate">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Dots & Mobile Controls */}
        {testimonials.length > itemsPerView && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="md:hidden p-2 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === idx
                      ? 'w-7 bg-amber-400'
                      : 'w-2 bg-zinc-200 hover:bg-amber-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="md:hidden p-2 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}