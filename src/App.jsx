import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Curtain } from './p5/Curtain';
import { Menu, ITEMS } from './p5/Menu';
import { About, Skills, Projects, Socials } from './p5/Screens';
import { Ransom } from './p5/Ransom';
import { site } from './data/portfolio';
import { sfx } from './p5/sfx';

const VIEWS = { about: About, skills: Skills, projects: Projects, socials: Socials };

export default function App() {
  const [screen, setScreen] = useState('boot');
  const [muted, setMuted] = useState(false);
  const curtain = useRef(null);
  const busy = useRef(false);

  const go = useCallback(async (to) => {
    if (busy.current) return;
    busy.current = true;
    const label = to === 'menu' ? 'MENU' : (ITEMS.find((i) => i.id === to)?.label ?? 'START');
    await curtain.current.play(label, () => { setScreen(to); window.scrollTo(0, 0); });
    busy.current = false;
  }, []);

  // Global key handling + hover/click SFX via data-sfx.
  useEffect(() => {
    const key = (e) => {
      sfx.unlock();
      if (document.querySelector('[data-cutin]')) return;
      if (screen === 'boot') { sfx.boot(); go('menu'); }
      else if (screen !== 'menu' && (e.key === 'Escape' || e.key === 'Backspace')) { sfx.back(); go('menu'); }
    };
    let last = null;
    const over = (e) => { const el = e.target.closest?.('[data-sfx]'); if (el && el !== last) sfx.hover(); last = el || null; };
    const click = (e) => { const el = e.target.closest?.('[data-sfx]'); if (el) (el.dataset.sfx === 'back' ? sfx.back : sfx.select)(); };
    window.addEventListener('keydown', key);
    document.addEventListener('pointerover', over);
    document.addEventListener('click', click);
    return () => { window.removeEventListener('keydown', key); document.removeEventListener('pointerover', over); document.removeEventListener('click', click); };
  }, [screen, go]);

  useEffect(() => sfx.subscribe(setMuted), []);
  const View = VIEWS[screen];

  return (
    <>
      {screen === 'boot' && (
        <section className="boot bg-black" onClick={() => { sfx.unlock(); sfx.boot(); go('menu'); }}>
          <div className="slash" />
          <div className="card-call">
            <Ransom text="WELCOME TO MY PAGE" as="h1" size="clamp(30px,6vw,72px)" />
            <p className="marker">{site.taglineLines.join(' ')}</p>
          </div>
          <p className="press">PRESS ANY KEY OR CLICK</p>
        </section>
      )}
      {screen === 'menu' && <Menu go={go} />}
      {View && <View back={() => go('menu')} />}
      <button className="mute" data-sfx onClick={(e) => { e.stopPropagation(); sfx.setMuted(!muted); }} aria-pressed={muted}>
        {muted ? 'SOUND OFF' : 'SOUND ON'}
      </button>
      <Curtain ref={curtain} />
    </>
  );
}
