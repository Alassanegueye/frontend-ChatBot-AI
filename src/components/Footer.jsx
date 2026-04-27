import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-name">Alassane Gueye</div>
    <div className="flinks">
      <a
        href="https://www.linkedin.com/in/alassane-gueye-216302283"
        target="_blank"
        rel="noopener noreferrer"
        className="flink"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/Alassanegueye"
        target="_blank"
        rel="noopener noreferrer"
        className="flink"
      >
        GitHub
      </a>
      <a href="mailto:alassanegpro@gmail.com" className="flink">
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
