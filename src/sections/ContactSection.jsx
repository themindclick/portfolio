import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { siteConfig } from '../data/siteConfig.js';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';

export default function ContactSection() {
  const { contact, services } = siteConfig;
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success('Message sent! We\'ll be in touch within 24 hours. 🎉');
    setForm({ name: '', email: '', phone: '', service: '', date: '', message: '' });
  };

  const inputCls = 'w-full bg-zinc-800 border border-zinc-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-500 outline-none transition-colors duration-200';

  return (
    <section id="contact" className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="Get In Touch" title="Let's Create Together" subtitle="Ready to book your session or have questions? We'd love to hear from you." light />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info side */}
          <div>
            <p className="text-zinc-400 leading-relaxed mb-8 text-lg">Every great photo starts with a conversation. Tell us about your vision and let's bring it to life together.</p>
            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0"><Mail size={18} className="text-amber-400" /></div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">Email</p>
                  <a href={`mailto:${contact.email}`} className="text-white hover:text-amber-400 transition-colors">{contact.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0"><Phone size={18} className="text-amber-400" /></div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">Phone</p>
                  <a href={`tel:${contact.phone}`} className="text-white hover:text-amber-400 transition-colors">{contact.phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0"><MapPin size={18} className="text-amber-400" /></div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">Location</p>
                  <span className="text-white">{contact.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-zinc-800 hover:bg-amber-500 text-zinc-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-200"><Instagram size={16} /></a>
              <a href="#" className="w-10 h-10 bg-zinc-800 hover:bg-amber-500 text-zinc-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-200"><Facebook size={16} /></a>
              <a href={`mailto:${contact.email}`} className="w-10 h-10 bg-zinc-800 hover:bg-amber-500 text-zinc-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-200"><Mail size={16} /></a>
            </div>
          </div>

          {/* Form side */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 text-xs uppercase tracking-wide mb-1.5 block">Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputCls} required />
              </div>
              <div>
                <label className="text-zinc-400 text-xs uppercase tracking-wide mb-1.5 block">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputCls} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 text-xs uppercase tracking-wide mb-1.5 block">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputCls} />
              </div>
              <div>
                <label className="text-zinc-400 text-xs uppercase tracking-wide mb-1.5 block">Service</label>
                <select name="service" value={form.service} onChange={handleChange} className={`${inputCls} cursor-pointer`}>
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wide mb-1.5 block">Preferred Date</label>
              <input name="date" type="date" value={form.date} onChange={handleChange} className={`${inputCls} [color-scheme:dark]`} />
            </div>
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wide mb-1.5 block">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your vision, the occasion, and anything else you'd like us to know..." rows={5} className={`${inputCls} resize-none`} required />
            </div>
            <Button type="submit" size="lg" className="w-full justify-center" disabled={submitting}>
              {submitting ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" /> Sending...</span>
              ) : (
                <span className="flex items-center gap-2"><Send size={16} /> Send Message</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
