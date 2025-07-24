import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Note, NoteFormData } from '../types/Note';

interface NoteFormProps {
  note?: Note;
  onSave: (formData: NoteFormData) => void;
  onCancel: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  note,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<NoteFormData>({
    title: note?.title || '',
    body: note?.body || '',
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        body: note.body,
      });
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() || formData.body.trim()) {
      onSave(formData);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              onKeyDown={handleKeyDown}
              placeholder="Enter note title..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
              autoFocus
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              id="body"
              value={formData.body}
              onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
              onKeyDown={handleKeyDown}
              placeholder="Write your note here..."
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 resize-none transition-colors duration-200"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              <Save className="h-4 w-4" />
              <span>{note ? 'Update' : 'Save'} Note</span>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Press Ctrl+Enter to save, Esc to cancel
          </p>
        </form>
      </div>
    </div>
  );
};