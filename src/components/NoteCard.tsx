import React from 'react';
import { Edit3, Trash2, Calendar } from 'lucide-react';
import { Note } from '../types/Note';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {note.title}
        </h3>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            title="Edit note"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            title="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
        {truncateText(note.body, 150)}
      </p>
      
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="h-3 w-3 mr-1" />
        <span>
          Updated {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  );
};