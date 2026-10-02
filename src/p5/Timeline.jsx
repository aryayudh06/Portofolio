import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { resume } from '../data/portfolio';

// Each card animates between a collapsed sliver and its own slanted shape (so the P5 edge survives).
const SHAPE = 'polygon(0 0,100% 3%,98% 100%,1% 97%)';
const hidden = (right) => (right ? 'polygon(100% 0,100% 3%,100% 100%,100% 97%)' : 'polygon(0 0,0 3%,0 100%,0 97%)');

// Zig-zag route: a spine, a star node per stage, cards that slash in from their own side.
// The <li> is what scroll-triggers; a clipped-to-nothing element would never count as visible.
export function Timeline() {
  const rm = useReducedMotion();
  return (
    <ol className="tl" aria-label="Resume timeline">
      {resume.map((r, i) => {
        const right = i % 2 === 1;
        const card = {
          hidden: { clipPath: hidden(right), x: right ? 60 : -60 },
          show: { clipPath: SHAPE, x: 0, transition: { duration: 0.38, ease: [0.7, 0, 0.2, 1] } },
        };
        const node = {
          hidden: { scale: 0, rotate: -90 },
          show: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 420, damping: 16 } },
        };
        return (
          <motion.li key={r.title} className={`tl__item ${right ? 'tl__item--r' : ''}`}
            initial={rm ? 'show' : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <motion.span className="tl__node" aria-hidden="true" variants={node}>
              <svg viewBox="0 0 40 40"><path d="M20 0l5 14 15 1-12 9 4 15-12-9-12 9 4-15L0 15l15-1z" /></svg>
            </motion.span>
            <motion.article className={`tl__card tl__card--${r.kind.toLowerCase()}`} variants={card}>
              <div className="tl__head">
                <span className="tl__kind">{r.kind}</span>
                {r.period && <span className="tl__when">{r.period}</span>}
              </div>
              <h3>{r.title}</h3>
              {r.org && <p className="tl__org">{r.org}</p>}
              <ul>{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </motion.article>
          </motion.li>
        );
      })}
    </ol>
  );
}
