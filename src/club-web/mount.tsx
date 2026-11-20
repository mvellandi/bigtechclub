import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import type { ComponentType } from 'react';
import '../../themes/pocket-atlas.css';
import '../../themes/components.css';
import '../../main.css';

export function mount(App: ComponentType) {
  const root = document.getElementById('root');
  if (!root) throw new Error('Missing application root');

  createRoot(root).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>
  );
}
