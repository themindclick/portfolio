import React, { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { siteConfig } from '../data/siteConfig.js';
import Button from '../components/Button.jsx';

// Install once: npm install framer-motion

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// Counts up from 0 when it scrolls into view
function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const value = useMotionValue(0);
  const spring = useSpring(value, { duration: 1800, bounce: 0 });

  useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  useEffect(
    () =>
      spring.on('change', (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      }),
    [spring, suffix]
  );

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutSection() {
  const { about } = siteConfig;
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Parallax for the photo inside its frame
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-8%', '8%']);
  const frameRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-3, 3]);

  return (
    <section id="about" ref={sectionRef} className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* IMAGE SIDE */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="relative mx-auto w-full max-w-[260px] sm:max-w-sm lg:max-w-md"
          >
            {/* Rotating outline frame */}
            <motion.div
              style={{ rotate: frameRotate }}
              className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-t-[999px] rounded-b-3xl border-2 border-amber-500/40"
            />

            {/* Arch shaped photo, height capped so it never floods a phone screen */}
            <div className="relative aspect-[4/5] max-h-[52vh] sm:max-h-none w-full overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-2xl bg-zinc-100">
              <motion.img
                src={about.image}
                alt={about.name}
                style={{ y: imgY }}
                className="absolute inset-0 h-[116%] w-full -top-[8%] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 160, damping: 14 }}
              className="absolute -bottom-5 -left-2 sm:-left-6 z-20"
            >
              <motion.div
                animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-amber-500 text-black rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="font-bold text-2xl leading-none">
                  <Counter to={8} suffix="+" />
                </p>
                <p className="text-[11px] font-medium mt-1 leading-tight">
                  Years of
                  <br />
                  Experience
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* TEXT SIDE */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center lg:text-left mt-4 lg:mt-0"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-amber-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4"
            >
              — About Me —
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-2 leading-tight"
            >
              {about.name}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-amber-600 font-medium mb-6">
              {about.title}
            </motion.p>

            <motion.p variants={fadeUp} className="text-zinc-600 leading-relaxed mb-4 text-[15px] sm:text-base">
              {about.bio}
            </motion.p>
            <motion.p variants={fadeUp} className="text-zinc-600 leading-relaxed mb-8 text-[15px] sm:text-base">
              {about.bio2}
            </motion.p>

            {/* Highlights: swipeable row on phones, grid on larger screens */}
            <motion.div
              variants={fadeUp}
              className="-mx-5 px-5 sm:mx-0 sm:px-0 mb-10 flex sm:grid sm:grid-cols-2 gap-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {about.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  whileHover={reduceMotion ? {} : { y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="snap-start shrink-0 sm:shrink basis-[62%] sm:basis-auto flex items-center gap-3 bg-zinc-50 border border-zinc-100 hover:border-amber-500/40 hover:shadow-md transition rounded-xl p-3 text-left"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-lg bg-amber-500/10 text-xl">
                    {h.icon}
                  </span>
                  <span className="text-zinc-700 text-sm font-medium">{h.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Button
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto"
              >
                Let's Work Together →
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}