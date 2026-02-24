import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { CartIcon } from './CartIcon';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User, Package } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

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
            {user && (
              <Link
                to="/orders"
                className={`text-sm font-bold transition-colors ${location.pathname === '/orders' ? 'text-slate-950 underline underline-offset-4' : 'text-slate-950 hover:opacity-80'
                  }`}
              >
                Orders
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CartIcon />
          {user ? (
            <div className="flex items-center gap-3 ml-2 pl-3 border-l border-slate-200">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-slate-700">
                <User className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-xs font-medium max-w-[100px] truncate">{user.email}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-slate-950 font-semibold">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
