import React from 'react';
import { skills } from '../data/portfolio';
import './Skills.css';

export function Skills() {
  return (
    <section className="skills">
      <h2>Skills</h2>
      <div className="skills__grid">
        {skills.map((skill) => (
          <div key={skill.alt + skill.label} className="skill-card">
            <img src={skill.image} alt={skill.alt} className="skill-card__icon" />
            <span>{skill.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
