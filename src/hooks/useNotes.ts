import { useState, useEffect } from 'react';
import { Note, NoteFormData } from '../types/Note';
import { loadNotes, saveNotes } from '../utils/localStorage';
import { createNote, updateNote } from '../utils/noteUtils';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveNotes(notes);
    }
  }, [notes, loading]);

  const addNote = (formData: NoteFormData) => {
    const newNote = createNote(formData.title, formData.body);
    setNotes(prev => [newNote, ...prev]);
    return newNote.id;
  };

  const editNote = (id: string, formData: NoteFormData) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? updateNote(note, formData.title, formData.body) : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getNote = (id: string): Note | undefined => {
    return notes.find(note => note.id === id);
  };

  return {
    notes,
    loading,
    addNote,
    editNote,
    deleteNote,
    getNote,
  };
};