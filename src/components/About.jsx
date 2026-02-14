import React from 'react';
import { about } from '../data/portfolio';
import './About.css';

export function About() {
  return (
    <section className="about" id="about">
      <div className="about__img">
        <img src={about.image} alt="Profile" className="about__photo" />
      </div>
      <div className="about__text">
        <h2>{about.title}</h2>
        <strong>{about.greeting}</strong>
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
