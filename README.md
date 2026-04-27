# Frontend — Portfolio Alassane Gueye

## Installation

```bash
cd frontend
npm install
```

## Lancement

```bash
npm run dev
```

Le frontend tourne sur http://localhost:5173

> Le backend doit tourner sur http://127.0.0.1:8000

## Build production

```bash
npm run build
```

## Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── hooks/
    │   └── useChat.js        ← gestion état + appels backend
    └── components/
        ├── Hero.jsx          ← section hero + typewriter
        ├── ChatSection.jsx   ← interface chat
        ├── MessageList.jsx   ← rendu des messages
        ├── Suggestions.jsx   ← boutons suggestions recruteur
        ├── TestSection.jsx   ← questions avancées
        └── Footer.jsx
```
