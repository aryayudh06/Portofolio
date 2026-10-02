import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Ransom } from './Ransom';
import { sfx } from './sfx';

// All-Out-Attack style cut-in: rays burst, two bands slam across, the screenshot is thrown in
// like a character portrait, the title lands, then the details settle.
export function CutIn({ p, onClose }) {
  const rm = useReducedMotion();
  const ref = useRef(null);
  const T = (delay, extra = {}) => (rm ? { duration: 0 } : { delay, ...extra });
  const spring = { type: 'spring', stiffness: 260, damping: 20 };

  useEffect(() => {
    const prev = document.activeElement;
    sfx.slash();
    const t = setTimeout(sfx.take, 170);
    const k = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); sfx.back(); onClose(); }
      if (e.key === 'Tab') {
        const f = ref.current.querySelectorAll('a,button');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    };
    window.addEventListener('keydown', k);
    const f = setTimeout(() => ref.current?.querySelector('a')?.focus(), rm ? 0 : 700);
    return () => { clearTimeout(t); clearTimeout(f); window.removeEventListener('keydown', k); prev?.focus?.(); };
  }, [onClose, rm]);

  // Portal to <body>: inside a screen it would be trapped under that screen's stacking context.
  return createPortal(
    <motion.div ref={ref} className="cut" data-cutin role="dialog" aria-modal="true" aria-label={`${p.title} project`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: rm ? 0 : 0.14 }}>
      <motion.div className="cut__rays" initial={{ scale: 0.2, rotate: -25 }} animate={{ scale: 1.5, rotate: 0 }} transition={T(0, { duration: 0.6, ease: 'easeOut' })} />
      <motion.div className="cut__band cut__band--r" initial={{ x: '-110%' }} animate={{ x: 0 }} transition={T(0, { duration: 0.28, ease: [0.7, 0, 0.2, 1] })} />
      <motion.div className="cut__band cut__band--w" initial={{ x: '110%' }} animate={{ x: 0 }} transition={T(0.08, { duration: 0.28, ease: [0.7, 0, 0.2, 1] })} />
      <div className="cut__stage">
        <motion.div animate={rm ? {} : { x: [0, -8, 7, -4, 0], y: [0, 5, -4, 2, 0] }} transition={{ delay: 0.42, duration: 0.3 }}>
          <motion.figure className="cut__shot" initial={{ x: '-120%', rotate: -14 }} animate={{ x: 0, rotate: -3 }} transition={T(0.15, spring)}>
            <img src={p.image} alt={`${p.title} screenshot`} />
            <span className="cut__dots" aria-hidden="true" />
          </motion.figure>
        </motion.div>
        <div className="cut__info">
          <motion.div initial={{ x: '120%', skewX: -30 }} animate={{ x: 0, skewX: 0 }} transition={T(0.3, spring)}>
            <Ransom text={p.title} as="h2" size="clamp(34px,6vw,84px)" />
          </motion.div>
          <motion.div className="tags" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={T(0.55, { duration: 0.2 })}>
            {p.tags.map((t) => <span key={t}>{t}</span>)}
          </motion.div>
          <motion.div className="cut__acts" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={T(0.65, { duration: 0.2 })}>
            <a className="cta" data-sfx href={p.github} target="_blank" rel="noopener noreferrer">View source on GitHub</a>
            <button className="cta cta--ghost" data-sfx="back" onClick={onClose}>Close <small>Esc</small></button>
          </motion.div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
}
