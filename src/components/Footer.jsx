import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-name">Alassane Gueye</div>
    <div className="flinks">
      <a
        href="https://linkedin.com/in/alassane-gueye"
        target="_blank"
        rel="noopener noreferrer"
        className="flink"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/alassane-gueye"
        target="_blank"
        rel="noopener noreferrer"
        className="flink"
      >
        GitHub
      </a>
      <a href="mailto:alassane.gueye@email.com" className="flink">
        Contact
      </a>
    </div>
    <p className="ftag">
      Vous pouvez interroger son IA — ou{' '}
      <span>directement le mettre à l'épreuve</span>.
    </p>
  </footer>
);

export default Footer;
