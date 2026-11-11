import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import markup from './page.html?raw';
import './home-v3.css';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const script = document.createElement('script');
    script.src = '/home-v3.js';
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}

createRoot(document.getElementById('root')).render(<App />);
