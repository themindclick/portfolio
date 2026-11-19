import React from 'react';

export default function Button({ children, variant = 'primary', size = 'md', className = '', href, onClick, type = 'button', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer select-none';
  const sizes = { sm: 'px-5 py-2 text-sm gap-1.5', md: 'px-7 py-3 text-base gap-2', lg: 'px-9 py-4 text-lg gap-2.5' };
  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg hover:shadow-amber-500/40 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'border-2 border-white/40 text-white hover:bg-white hover:text-black backdrop-blur-sm hover:-translate-y-0.5',
    outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black hover:-translate-y-0.5',
    ghost: 'text-white hover:text-amber-400 hover:bg-white/10 rounded-lg px-4',
    dark: 'bg-zinc-900 text-white border border-zinc-700 hover:border-amber-500 hover:text-amber-400 hover:-translate-y-0.5',
  };
  const cls = `${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls} {...props}>{children}</button>;
}
