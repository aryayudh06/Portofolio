import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { animate } from 'framer-motion';
import { sfx } from './sfx';

const LAYERS = ['#000', '#e50012', '#fff', '#000'];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Four stacked slanted stripes sweep across, the screen swaps underneath, they sweep out.
export const Curtain = forwardRef(function Curtain(_, ref) {
  const els = useRef([]);
  const label = useRef(null);
  useImperativeHandle(ref, () => ({
    async play(text, mid) {
      if (reduced()) return mid();
      sfx.whoosh();
      label.current.textContent = text;
      const run = (from, to) => Promise.all(els.current.map((el, i) =>
        animate(el, { x: [from, to] }, { duration: 0.4, delay: i * 0.06, ease: [0.7, 0, 0.2, 1] }).finished));
      await run('-100%', '0%');
      mid();
      animate(label.current, { opacity: [0, 1, 1, 0], scale: [0.6, 1, 1.05, 1.4] }, { duration: 0.55 });
      await wait(320);
      sfx.slash();
      await run('0%', '100%');
    },
  }));
  return (
    <div className="curtain" aria-hidden="true">
      {LAYERS.map((c, i) => (
        <div key={i} ref={(el) => (els.current[i] = el)} className="curtain__bar" style={{ background: c, zIndex: i }} />
      ))}
      <div ref={label} className="curtain__label" />
    </div>
  );
});
