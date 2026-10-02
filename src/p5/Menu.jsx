import React, { useEffect, useState } from 'react';
import { Ransom } from './Ransom';
import { site, projects } from '../data/portfolio';
import { sfx } from './sfx';

export const ITEMS = [
  { id: 'about', label: 'ABOUT ME', note: 'Who is behind the mask: background, interests and what I am building now.' },
  { id: 'skills', label: 'RESUME/SKILLS', note: 'Roles, experience and the full toolkit.' },
  { id: 'projects', label: 'PROJECTS', note: `${projects.length} builds across AI, web, mobile and data. Pick one to see it.` },
  { id: 'socials', label: 'SOCIALS', note: 'GitHub, LinkedIn, Instagram and email. Get in touch.' },
];

export function Menu({ go }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { setI((v) => (v + 1) % ITEMS.length); sfx.move(); e.preventDefault(); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { setI((v) => (v + ITEMS.length - 1) % ITEMS.length); sfx.move(); e.preventDefault(); }
      if (e.key === 'Enter') { sfx.select(); go(ITEMS[i].id); }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [i, go]);

  return (
    <section className="menu bg-red">
      <div className="shard shard--a" /><div className="shard shard--b" />
      <header className="menu__logo">
        <Ransom text={site.name.split(' ').slice(0, 2).join(' ')} size="clamp(30px,5vw,64px)" as="h1" />
        <p className="note">{site.taglineLines.join(' ')}</p>
      </header>
      <nav className="menu__list" aria-label="Main menu">
        {ITEMS.map((it, n) => (
          <button key={it.id} data-sfx className={`mi ${n === i ? 'is-on' : ''}`} style={{ '--n': n }}
            onPointerEnter={() => setI(n)} onFocus={() => setI(n)} onClick={() => go(it.id)} aria-current={n === i}>
            <svg className="mi__star" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0l5 14 15 1-12 9 4 15-12-9-12 9 4-15L0 15l15-1z" /></svg>
            <span className="mi__txt">{it.label}</span>
          </button>
        ))}
      </nav>
      <figure className="menu__pic">
        <svg className="ring" viewBox="0 0 400 400" aria-hidden="true">
          <defs><path id="c" d="M200 200m-170 0a170 170 0 1 1 340 0a170 170 0 1 1-340 0" /></defs>
          <text><textPath href="#c">TAKE YOUR TIME • TAKE YOUR TIME • TAKE YOUR TIME • TAKE YOUR TIME •</textPath></text>
        </svg>
        <div className="frame"><img src="/img/Hero-Profile3.jpeg" alt="Portrait of Arya" /></div>
      </figure>
      <footer className="menu__bar">
        <p>{ITEMS[i].note}</p>
        <span className="keys"><b>↑↓</b> select <b>Enter</b> confirm <b>Esc</b> back</span>
      </footer>
    </section>
  );
}
