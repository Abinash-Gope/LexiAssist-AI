import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GenAiArchitectureModal } from '@/components/features/architecture/GenAiArchitectureModal';
import { Button } from '@/components/ui/Button';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard">
          <Button size="sm" variant="outline" className="text-xs">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Workspace</span>
          </Button>
        </Link>
      </div>

      <GenAiArchitectureModal />
    </div>
  );
};
