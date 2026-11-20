import { useRef, useState } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';
import { defaultVariant } from './default';
import { variants } from './variants.dev';
import { directoryScenarioName } from './directory-previews';
import './switcher.dev.css';

type RouteMap = Readonly<Record<string, string>>;

function pageAt(routes: RouteMap, pathname: string) {
  const patterns = Object.entries(routes).map(([id, path]) => ({ id, path }));
  return matchRoutes(patterns, pathname)?.[0]?.route.id;
}

function variantUrl(id: string, home: boolean) {
  const url = new URL(window.location.href);
  if (id === defaultVariant.id) url.searchParams.delete('variant');
  else url.searchParams.set('variant', id);
  if (home) url.hash = '/';
  return url.href;
}

export function VariantSwitcher({ active }: { active: (typeof variants)[number] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { pathname, search } = useLocation();
  const [copyStatus, setCopyStatus] = useState('');
  const page = pageAt(active.routes, pathname);

  const scenario = page === 'members' ? directoryScenarioName(search) : undefined;

  async function copyPreview() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('Preview URL copied.');
    } catch {
      setCopyStatus('Copy the preview URL from the address bar.');
    }
  }

  return (
    <aside className="dev-switcher" aria-label="Development tools">
      <button type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>Variants</button>
      <dialog ref={dialog} onClose={() => setCopyStatus('')} aria-labelledby="dev-variant-title">
        <header>
          <h2 id="dev-variant-title">Club Web variants</h2>
          <form method="dialog"><button type="submit">Close</button></form>
        </header>
        <p>Viewing {active.name} · <code>{pathname}</code>{scenario && <> · {scenario}</>}</p>
        <button type="button" onClick={copyPreview}>Copy preview URL</button>
        <p role="status">{copyStatus}</p>
        <a href="../">Back to workspace</a>
        {variants.filter(variant => variant.id !== active.id).map(variant => {
          const samePage = page !== undefined && pageAt(variant.routes, pathname) === page;
          return (
            <section key={variant.id}>
              <h3>{variant.name}</h3>
              {!samePage && <p>This page is unavailable in {variant.name}.</p>}
              {samePage && pathname !== '/' && <a href={variantUrl(variant.id, false)}>Open this page in {variant.name}</a>}
              <a href={variantUrl(variant.id, true)}>Open {variant.name} home</a>
            </section>
          );
        })}
      </dialog>
    </aside>
  );
}
