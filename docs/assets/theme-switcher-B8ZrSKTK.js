(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`bigtechclub-theme`,t=class extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;let t=document.documentElement,n=`theme-switcher-input`;this.attachShadow({mode:`open`}).innerHTML=`
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
      <label for="${n}">
        <input id="${n}" type="checkbox" role="switch" aria-label="Dark mode">
        <span>Dark mode</span>
      </label>
    `;let r=this.shadowRoot.querySelector(`input`);try{let n=localStorage.getItem(e);(n===`light`||n===`dark`)&&(t.dataset.theme=n)}catch{}r.checked=t.dataset.theme===`dark`,r.addEventListener(`change`,()=>{let n=r.checked?`dark`:`light`;t.dataset.theme=n;try{localStorage.setItem(e,n)}catch{}})}};customElements.define(`theme-switcher`,t);