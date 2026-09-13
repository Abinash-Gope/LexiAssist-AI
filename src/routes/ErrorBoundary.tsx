/**
 * Route Error Boundary Component
 * Catches unhandled exceptions and displays institutional recovery UI.
 */

import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { AlertTriangle, RotateCcw, Home, Scale } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  let errorMessage = 'An unexpected error occurred while processing this document.';
  let statusCode = 500;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-dim">
      <div className="max-w-md w-full bg-surface-light p-8 rounded-2xl border border-border-light shadow-level-2 text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-risk-high flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase font-bold text-slate-400">
            Error Code {statusCode}
          </span>
          <h1 className="text-xl font-bold font-headline text-primary">
            Workspace Exception Detected
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed font-mono bg-slate-50 p-3 rounded border border-border-light text-left overflow-x-auto">
            {errorMessage}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Reload Page</span>
          </Button>

          <Link to="/dashboard">
            <Button variant="primary" size="sm" className="text-xs">
              <Home className="w-3.5 h-3.5 mr-1" />
              <span>Back to Workspace</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
