import React, { useCallback, useEffect, useState } from 'react';
import { Ransom } from './Ransom';
import { about, skills, projects, socialLinks } from '../data/portfolio';
import { IconGitHub, IconLinkedIn, IconInstagram, IconGmail } from '../components/Icons';
import { AnimatePresence } from 'framer-motion';
import { Timeline } from './Timeline';
import { CutIn } from './CutIn';
import { sfx } from './sfx';

const ICONS = { github: IconGitHub, linkedin: IconLinkedIn, instagram: IconInstagram, gmail: IconGmail };

function Screen({ title, tone = 'black', back, children }) {
  return (
    <section className={`screen bg-${tone}`}>
      <div className="shard shard--a" />
      <div className="screen__in">
        <Ransom text={title} as="h1" />
        {children}
      </div>
      <button className="back" data-sfx="back" onClick={back}>BACK</button>
    </section>
  );
}

export function About({ back }) {
  return (
    <Screen title="ABOUT ME" tone="black" back={back}>
      <div className="about">
        <div className="frame frame--lg"><img src={about.image} alt="Arya in a university blazer" /></div>
        <div className="about__txt">
          <p className="marker">{about.greeting}</p>
          {about.paragraphs.map((p, i) => <p key={i} className={`slab slab--${i % 2 ? 'w' : 'k'}`}>{p}</p>)}
        </div>
      </div>
    </Screen>
  );
}

export function Skills({ back }) {
  return (
    <Screen title="RESUME/SKILLS" tone="red" back={back}>
      <ul className="roles">
        {['Data Engineer', 'Data Scientist', 'Fullstack Developer', 'Mobile Developer'].map((r) => <li key={r}>{r}</li>)}
      </ul>
      <Timeline />
      <h2 className="sub">Toolkit</h2>
      <ul className="grid">
        {skills.map((s, i) => (
          <li key={s.label} className="card" data-sfx style={{ '--r': `${((i * 5) % 7) - 3}deg` }}>
            <img src={s.image} alt={s.alt} /><span>{s.label}</span>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

export function Projects({ back }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const p = projects[i];
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (open) return;
    const k = (e) => {
      if (e.key === 'ArrowDown') { setI((v) => (v + 1) % projects.length); sfx.move(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { setI((v) => (v + projects.length - 1) % projects.length); sfx.move(); e.preventDefault(); }
      // A focused button already handles Enter through its own click.
      if (e.key === 'Enter' && !e.target.closest?.('button,a')) setOpen(true);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (
    <Screen title="PROJECTS" tone="red" back={back}>
      <div className="proj">
        <ul className="proj__list">
          {projects.map((x, n) => (
            <li key={x.title}>
              <button data-sfx className={`mi mi--s ${n === i ? 'is-on' : ''}`} style={{ '--n': n }}
                onPointerEnter={() => setI(n)} onFocus={() => setI(n)} onClick={() => { setI(n); setOpen(true); }}>
                <span className="mi__txt">{x.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="proj__view" key={p.title}>
          <div className="frame frame--lg frame--wipe"><img src={p.image} alt={`${p.title} screenshot`} /></div>
          <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <button className="cta" data-sfx onClick={() => setOpen(true)}>Show {p.title}</button>
        </div>
      </div>
      <AnimatePresence>{open && <CutIn key={p.title} p={p} onClose={close} />}</AnimatePresence>
    </Screen>
  );
}

export function Socials({ back }) {
  return (
    <Screen title="SOCIALS" tone="black" back={back}>
      <ul className="grid grid--s">
        {socialLinks.map((s, i) => {
          const Ic = ICONS[s.icon];
          const handle = s.href.startsWith('mailto:') ? s.href.slice(7) : s.href.split('/').filter(Boolean).pop();
          return (
            <li key={s.name} style={{ '--r': `${i % 2 ? 2 : -2}deg` }}>
              <a className="card card--s" data-sfx href={s.href} target="_blank" rel="noopener noreferrer">
                {Ic && <Ic size="lg" />}<strong>{s.name}</strong><em>{handle}</em>
              </a>
            </li>
          );
        })}
      </ul>
    </Screen>
  );
}
