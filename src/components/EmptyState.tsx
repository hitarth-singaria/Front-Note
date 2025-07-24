import React from 'react';
import { FileText, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  onNewNote: () => void;
  isSearching: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onNewNote,
  isSearching,
}) => {
  if (isSearching) {
    return (
      <div className="text-center py-16">
        <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No notes found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search terms or create a new note.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No notes yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Get started by creating your first note. Your thoughts deserve a home.
      </p>
      <button
        onClick={onNewNote}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mx-auto"
      >
        <PlusCircle className="h-5 w-5" />
        <span>Create Your First Note</span>
      </button>
    </div>
  );
};