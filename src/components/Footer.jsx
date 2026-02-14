import React from 'react';
import { site, socialLinks } from '../data/portfolio';
import { SocialIcon } from './Icons';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <span>2025 {site.name}. Personal Portfolio. All rights reserved</span>
        <span className="footer__icons">
          {socialLinks.map((link) => (
            <SocialIcon key={link.name} {...link} size="sm" />
          ))}
        </span>
      </div>
    </footer>
  );
}
