import { Note } from '../types/Note';

const NOTES_KEY = 'notes-app-data';

export const loadNotes = (): Note[] => {
  try {
    const saved = localStorage.getItem(NOTES_KEY);
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    return parsed.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    }));
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
};

export const saveNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

export const exportNotes = (notes: Note[]): void => {
  try {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `notes-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting notes:', error);
  }
};