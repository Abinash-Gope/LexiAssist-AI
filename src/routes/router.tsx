/**
 * Application Data Router Configuration
 * Strictly uses react-router-dom v6/v7 createBrowserRouter.
 * Features Protected Routes & Distinct Layouts (Public vs. Workspace App).
 */

import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, AppLayout } from '@/layouts';
import { ProtectedRoute } from './ProtectedRoute';
import { ErrorBoundary } from './ErrorBoundary';

import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ComparePage } from '@/pages/ComparePage';
import { PrepKitPage } from '@/pages/PrepKitPage';
import { ArchitecturePage } from '@/pages/ArchitecturePage';

export const router = createBrowserRouter([
  // Public Marketing & Onboarding Routes
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'architecture',
        element: <ArchitecturePage />,
      },
    ],
  },

  // Protected Workspace Application Routes
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'compare',
        element: <ComparePage />,
      },
      {
        path: 'prep-kit',
        element: <PrepKitPage />,
      },
    ],
  },
]);
