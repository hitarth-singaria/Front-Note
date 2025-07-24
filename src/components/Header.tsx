import React from 'react';
import { PlusCircle, Download, Moon, Sun, BookOpen } from 'lucide-react';

interface HeaderProps {
  onNewNote: () => void;
  onExport: () => void;
  noteCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNewNote,
  onExport,
  noteCount,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                My Notes
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {noteCount} {noteCount === 1 ? 'note' : 'notes'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={onExport}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
              title="Export notes"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            
            <button
              onClick={onNewNote}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Note</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};