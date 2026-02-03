import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { CartIcon } from './CartIcon';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">NEXUS</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-bold transition-colors ${location.pathname === '/' ? 'text-slate-950 underline underline-offset-4' : 'text-slate-950 hover:opacity-80'
                }`}
            >
              Home
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CartIcon />
          <Link to="/login">
            <Button variant="outline" size="sm" className="border-slate-950 font-semibold">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
