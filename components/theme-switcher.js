const themeStorageKey = 'bigtechclub-theme';

class ThemeSwitcher extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;

    const root = document.documentElement;
    const inputId = 'theme-switcher-input';
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host { display: inline-flex; }
        label {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          min-height: 2rem;
          color: var(--text-muted);
          font: .82rem/1.4 system-ui, sans-serif;
          cursor: pointer;
        }
        input {
          appearance: none;
          display: grid;
          align-items: center;
          width: 2rem;
          height: 1.125rem;
          margin: 0;
          padding: 0 .15rem;
          border: 1px solid var(--field-border);
          border-radius: 1rem;
          background: var(--surface);
          cursor: pointer;
        }
        input::before {
          content: "";
          width: .65rem;
          aspect-ratio: 1;
          border-radius: 50%;
          background: var(--text-muted);
        }
        input:checked {
          justify-items: end;
          background: var(--accent);
          border-color: var(--accent);
        }
        input:checked::before { background: var(--accent-text); }
        input:focus-visible { outline: 2px solid var(--highlight); outline-offset: 3px; }
      </style>
      <label for="${inputId}">
        <input id="${inputId}" type="checkbox" role="switch" aria-label="Dark mode">
        <span>Dark mode</span>
      </label>
    `;

    const toggle = this.shadowRoot.querySelector('input');
    try {
      const savedTheme = localStorage.getItem(themeStorageKey);
      if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
    } catch {
      // The switch still changes the current page when storage is unavailable.
    }

    toggle.checked = root.dataset.theme === 'dark';
    toggle.addEventListener('change', () => {
      const theme = toggle.checked ? 'dark' : 'light';
      root.dataset.theme = theme;
      try {
        localStorage.setItem(themeStorageKey, theme);
      } catch {
        // Keep the selected theme for the current page.
      }
    });
  }
}

customElements.define('theme-switcher', ThemeSwitcher);
