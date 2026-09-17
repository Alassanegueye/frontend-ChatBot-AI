import React from 'react';
import { profile, socials } from '../data/portfolio';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', width: '100%' }}>
        <span className="footer__brand">{profile.name}</span>
        <nav className="footer__links">
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`mailto:${socials.email}`}>Email</a>
          {socials.gitlab && (
            <a href={socials.gitlab} target="_blank" rel="noopener noreferrer">GitLab</a>
          )}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;