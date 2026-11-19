import React from 'react';

export default function SectionHeader({ eyebrow, title, subtitle, light = false, center = true }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="inline-block text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
          — {eyebrow} —
        </span>
      )}
      <h2 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${light ? 'text-white' : 'text-zinc-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
