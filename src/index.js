import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// === DARK MODE AUTOMÁTICO SEGÚN EL SISTEMA ===
const root = document.documentElement;
const mq = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(e) {
  if (e.matches) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

// Tema inicial
applyTheme(mq);

// Escuchar cambios en todos los navegadores
if (mq.addEventListener) {
  mq.addEventListener("change", applyTheme);
} else if (mq.addListener) {
  mq.addListener(applyTheme);
}
// ==============================================

const rootDOM = ReactDOM.createRoot(document.getElementById('root'));
rootDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
