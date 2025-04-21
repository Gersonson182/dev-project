import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/queryClient';
import { ToastProvider } from './components/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
    </ToastProvider>
  </React.StrictMode>
);

