import React from 'react';
import { site, socialLinks } from '../data/portfolio';
import { SocialIcon } from './Icons';
import { AnimatedSection } from './AnimatedSection';
import './Hero.css';

export function Hero() {
  return (
    <AnimatedSection as="header" className="hero" id="home">
      <div className="hero__content">
        <h1 className="hero__title">
          {site.taglineLines.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </h1>
        <p className="hero__welcome">{site.welcome}</p>
        <div className="hero__socials">
          {socialLinks.map((link) => (
            <SocialIcon key={link.name} {...link} size="md" />
          ))}
        </div>
      </div>
      <div className="hero__image">
        <img src="/img/Hero-Profile2.jpg" alt="Profile" className="hero__avatar" />
      </div>
    </AnimatedSection>
  );
}
