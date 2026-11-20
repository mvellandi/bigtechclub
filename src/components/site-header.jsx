import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@ui-sdk/react/dialog';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/theme-switcher';

const navigation = [
  { to: '/book', label: 'Book' },
  { to: '/members', label: 'Members' },
  { to: '/live', label: 'Live' },
  { to: '/mission', label: 'Mission' }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" to="/" aria-label="Big Tech Club home">
          <span className="brand-mark"><Compass aria-hidden="true" /></span>
          <span>Big Tech Club</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeSwitcher />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="button button-outline button-icon mobile-menu-trigger" aria-label="Open navigation">
              <Menu aria-hidden="true" />
            </DialogTrigger>
            <DialogBackdrop className="dialog-backdrop" />
            <DialogContent className="mobile-menu">
              <DialogTitle className="font-serif text-2xl">Where to next?</DialogTitle>
              <DialogClose className="button button-ghost button-icon dialog-close" aria-label="Close navigation">
                <X aria-hidden="true" />
              </DialogClose>
              <nav aria-label="Mobile navigation">
                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                {navigation.map((item) => (
                  <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>
                ))}
                <Link to="/live/apply" onClick={() => setOpen(false)}>Contribute</Link>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
