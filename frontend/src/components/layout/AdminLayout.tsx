import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <h1 className="text-lg font-semibold text-slate-800">Admin Portal</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
              <Icon icon="lucide:bell" className="text-xl" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              AD
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};