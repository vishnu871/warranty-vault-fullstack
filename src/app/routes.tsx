import { createBrowserRouter } from 'react-router';
import { RootLayout } from './RootLayout';
import { Dashboard } from './pages/Dashboard';
import { Vault } from './pages/Vault';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { Auth } from './pages/Auth';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/auth',
    Component: Auth,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: 'vault', Component: Vault },
      { path: 'analytics', Component: Analytics },
      { path: 'settings', Component: Settings },
      { path: '*', Component: NotFound },
    ],
  },
]);