import React from 'react';
import { Camera, Instagram, Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';

export default function Footer() {
  const { brand, contact } = siteConfig;
  const year = new Date().getFullYear();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-3">Ready to Create Something Beautiful?</h3>
          <p className="text-black/70 text-lg mb-7">Spots fill up fast — secure your session today.</p>
          <button onClick={() => scrollTo('contact')} className="inline-flex items-center gap-2 bg-black text-white font-semibold px-8 py-4 rounded-full hover:bg-zinc-900 transition-all hover:-translate-y-0.5 shadow-xl cursor-pointer">
            Book Your Session →
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center"><Camera size={18} className="text-black" /></div>
            <span className="text-white font-bold text-xl">{brand.name}</span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-5">{brand.tagline}</p>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="w-9 h-9 bg-zinc-800 hover:bg-amber-500 text-zinc-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-200"><Instagram size={16} /></a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 bg-zinc-800 hover:bg-amber-500 text-zinc-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-200"><Facebook size={16} /></a>
            <a href={`mailto:${contact.email}`} aria-label="Email" className="w-9 h-9 bg-zinc-800 hover:bg-amber-500 text-zinc-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-200"><Mail size={16} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Navigate</h4>
          <ul className="space-y-3">
            {['Home','Gallery','Services','About','Pricing','Contact'].map(label => (
              <li key={label}><button onClick={() => scrollTo(label.toLowerCase())} className="text-zinc-400 hover:text-amber-400 transition-colors text-sm cursor-pointer">{label}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Services</h4>
          <ul className="space-y-3">
            {siteConfig.services.map(s => (<li key={s.id}><span className="text-zinc-400 text-sm">{s.title}</span></li>))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3"><Mail size={15} className="text-amber-500 mt-0.5 shrink-0" /><a href={`mailto:${contact.email}`} className="text-zinc-400 hover:text-amber-400 text-sm transition-colors">{contact.email}</a></li>
            <li className="flex items-start gap-3"><Phone size={15} className="text-amber-500 mt-0.5 shrink-0" /><a href={`tel:${contact.phone}`} className="text-zinc-400 hover:text-amber-400 text-sm transition-colors">{contact.phone}</a></li>
            <li className="flex items-start gap-3"><MapPin size={15} className="text-amber-500 mt-0.5 shrink-0" /><span className="text-zinc-400 text-sm">{contact.location}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-sm">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">Made with <Heart size={13} className="text-amber-500 fill-amber-500" /> for photographers</p>
        </div>
      </div>
    </footer>
  );
}
