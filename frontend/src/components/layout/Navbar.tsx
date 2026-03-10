import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-white border-b border-slate-100 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-primary font-bold text-xl tracking-tight">
            The Gentleman's Quarter
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-slate-600 hover:text-primary font-medium transition-colors">Services</a>
          <a href="#queue" className="text-slate-600 hover:text-primary font-medium transition-colors">Live Queue</a>
          <Link to="/book" className="bg-primary text-white px-6 py-2.5 rounded-md font-semibold hover:bg-primary/90 transition-all">
            Book Now
          </Link>
        </div>

        <div className="md:hidden">
          <Icon icon="lucide:menu" className="text-2xl text-primary" />
        </div>
      </nav>
    </header>
  );
};