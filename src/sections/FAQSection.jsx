import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import SectionHeader from '../components/SectionHeader.jsx';

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-amber-400 shadow-sm shadow-amber-500/10' : 'border-zinc-200 hover:border-zinc-300'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-zinc-50 transition-colors cursor-pointer"
      >
        <span className="text-zinc-800 font-semibold text-sm md:text-base">{q}</span>
        <ChevronDown size={18} className={`text-amber-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-64' : 'max-h-0'}`}>
        <p className="px-6 pb-5 text-zinc-500 text-sm leading-relaxed border-t border-zinc-100 pt-4">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-zinc-50">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before your session. Can't find your answer? Just reach out!"
        />
        <div className="space-y-3">
          {siteConfig.faq.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
