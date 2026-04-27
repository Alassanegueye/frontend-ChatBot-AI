import React from 'react';

const suggestions = [
  "Quelles sont réellement ses compétences techniques ?",
  "Parle-moi de ses projets en détail",
  "Pourquoi devrais-je le recruter plutôt qu'un autre ?",
  "Quels types de problèmes peut-il résoudre concrètement ?",
  "Est-il vraiment compétent ou juste bien présenté ?",
  "Explique-moi son projet phare comme si j'étais un décideur métier",
  "Quelles sont ses vraies faiblesses ?",
  "Quel est son parcours académique ?",
];

const Suggestions = ({ onSendMessage }) => (
  <>
    <hr className="sep" />
    <p className="section-label">Questions pour le recruteur</p>
    <div className="sugg-grid">
      {suggestions.map((s, idx) => (
        <button key={idx} className="sq" onClick={() => onSendMessage(s)}>
          {s}
        </button>
      ))}
    </div>
  </>
);

export default Suggestions;
