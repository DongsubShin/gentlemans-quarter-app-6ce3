import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from './components/layout/MainLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/admin/DashboardPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="book" element={<div>Booking Page (Coming Soon)</div>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="queue" element={<div>Live Queue Management</div>} />
            <Route path="clients" element={<div>Client CRM</div>} />
            <Route path="analytics" element={<div>Analytics Dashboard</div>} />
            <Route path="loyalty" element={<div>Loyalty Program</div>} />
            <Route path="settings" element={<div>Shop Settings</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;