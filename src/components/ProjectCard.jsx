import React from 'react';
import { IconGitHub } from './Icons';
import './ProjectCard.css';

export function ProjectCard({ title, image, tags = [], github }) {
  const [tag1, tag2] = tags;
  return (
    <article className="project-card">
      <div className="project-card__img">
        <img src={image} alt={title} className="project-card__thumb" />
      </div>
      <div className="project-card__title">{title}</div>
      <div className="project-card__tags">
        {tag1 && <span className="project-card__tag project-card__tag--primary">{tag1}</span>}
        {tag2 && <span className="project-card__tag project-card__tag--secondary">{tag2}</span>}
      </div>
      <div className="project-card__links">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="social-svg" aria-label={`${title} on GitHub`}>
            <IconGitHub size="sm" />
          </a>
        )}
      </div>
    </article>
  );
}
