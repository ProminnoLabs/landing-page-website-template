import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import rawMarkup from './page.html?raw';
import './home-v3.css';

const BASE = import.meta.env.BASE_URL; // '/landing-page-website-template/'

// Prefix absolute paths in the raw HTML (src="/..." and href="/...") with the base
const markup = rawMarkup.replace(/(src|href|poster)="\/(?!\/)/g, `$1="${BASE}`);

function App() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const script = document.createElement('script');
    script.src = `${BASE}home-v3.js`;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}

createRoot(document.getElementById('root')).render(<App />);
