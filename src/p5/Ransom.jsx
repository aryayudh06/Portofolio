import React from 'react';
const S = [['#fff','#000','Anton'],['#000','#fff','Archivo Black'],['#e50012','#fff','Rubik Mono One'],['#fff','#e50012','Bowlby One SC'],['#19e3ff','#000','Anton']];

// Ransom-note headline: every letter is its own clipped paper scrap.
export function Ransom({ text, size = 'clamp(34px,7vw,84px)', as: T = 'h2' }) {
  let n = 0;
  return (
    <T className="rn" style={{ '--s': size }} aria-label={text}>
      {text.split(' ').map((w, wi) => (
        <span className="rn-w" aria-hidden="true" key={wi}>
          {[...w].map((c, i) => {
            const k = n++;
            const [bg, fg, ff] = S[(k * 7 + 3) % S.length];
            return (
              <span key={i} style={{ background: bg, color: fg, fontFamily: `'${ff}',sans-serif`,
                transform: `rotate(${((k * 37) % 9) - 4}deg) translateY(${((k * 13) % 7) - 3}px)` }}>{c}</span>
            );
          })}
        </span>
      ))}
    </T>
  );
}
