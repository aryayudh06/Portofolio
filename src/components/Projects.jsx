import React from 'react';
import { projects, socialLinks } from '../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { IconGitHub, IconLinkedIn } from './Icons';
import './Projects.css';

export function Projects() {
  return (
    <section className="projects" id="portfolio">
      <h2>Projects</h2>
      <div className="projects__grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
      <div className="projects__more">
        <span>more projects?</span>
        <span className="projects__visit">visit my</span>
        <span className="projects__github">
          <a href={socialLinks[0].href} target="_blank" rel="noopener noreferrer" className="projects__link social-svg">Github <IconGitHub size="sm" /></a>
          {' '}&{' '}
          <a href={socialLinks[1].href} target="_blank" rel="noopener noreferrer" className="projects__link social-svg">LinkedIn <IconLinkedIn size="sm" /></a>
        </span>
      </div>
    </section>
  );
}
