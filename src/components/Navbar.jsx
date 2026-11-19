import React, { useState, useEffect } from 'react';
import { Menu, X, Camera } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import Button from './Button.jsx';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'gallery', 'services', 'about', 'pricing', 'testimonials', 'faq', 'contact'];
      const reversed = [...sections].reverse();
      for (const id of reversed) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNav('#home'); }} className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Camera size={18} className="text-black" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">{siteConfig.brand.name}</span>
        </a>
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <button onClick={() => handleNav(link.href)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeSection === link.href.replace('#', '') ? 'text-amber-400 bg-amber-400/10' : 'text-zinc-300 hover:text-white hover:bg-white/10'}`}>
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => handleNav('#contact')} className="hidden sm:inline-flex">Book Now</Button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white hover:text-amber-400 transition-colors p-1" aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-zinc-950/98 backdrop-blur-md border-t border-zinc-800 px-6 py-6 flex flex-col gap-2">
          {navLinks.map(link => (
            <button key={link.href} onClick={() => handleNav(link.href)} className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer ${activeSection === link.href.replace('#', '') ? 'text-amber-400 bg-amber-400/10' : 'text-zinc-300 hover:text-white hover:bg-white/10'}`}>
              {link.label}
            </button>
          ))}
          <Button className="mt-4 w-full" onClick={() => handleNav('#contact')}>Book Now</Button>
        </div>
      </div>
    </nav>
  );
}
