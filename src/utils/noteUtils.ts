import { Note } from '../types/Note';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createNote = (title: string, body: string): Note => {
  const now = new Date();
  return {
    id: generateId(),
    title: title.trim() || 'Untitled Note',
    body: body.trim(),
    createdAt: now,
    updatedAt: now,
  };
};

export const updateNote = (note: Note, title: string, body: string): Note => {
  return {
    ...note,
    title: title.trim() || 'Untitled Note',
    body: body.trim(),
    updatedAt: new Date(),
  };
};

export const searchNotes = (notes: Note[], searchTerm: string): Note[] => {
  if (!searchTerm.trim()) return notes;
  
  const term = searchTerm.toLowerCase();
  return notes.filter(note => 
    note.title.toLowerCase().includes(term) || 
    note.body.toLowerCase().includes(term)
  );
};

export const sortNotesByDate = (notes: Note[]): Note[] => {
  return [...notes].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
};