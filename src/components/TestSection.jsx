import React from 'react';

const testQuestions = [
  "Quelle est la première question que je vous ai posée dans cette session ?",
  "Combien de messages avons-nous échangé jusqu'ici ?",
  "Résume notre conversation depuis le début",
  "Explique le modèle ML le plus pertinent pour prédire des accidents de la route",
  "Comment architecturer une pipeline data robuste en production ?",
  "Identifie une faille dans la démarche technique d'Alassane",
];

const TestSection = ({ onSendMessage }) => (
  <div className="test-section">
    <h3>Interrogatoire avancé — testez le témoin</h3>
    <p className="test-desc">
      Cette interface est elle-même une démonstration technique. Chaque réponse
      reflète les compétences d'Alassane autant que vos capacités d'évaluation.
      Posez des questions qui déstabilisent.
    </p>
    <div className="test-grid">
      {testQuestions.map((q, idx) => (
        <button key={idx} className="tq" onClick={() => onSendMessage(q)}>
          {q}
        </button>
      ))}
    </div>
  </div>
);

export default TestSection;
