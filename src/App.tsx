import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { NoteCard } from './components/NoteCard';
import { NoteForm } from './components/NoteForm';
import { EmptyState } from './components/EmptyState';
import { ConfirmDialog } from './components/ConfirmDialog';
import { useNotes } from './hooks/useNotes';
import { useDarkMode } from './hooks/useDarkMode';
import { Note, NoteFormData } from './types/Note';
import { searchNotes, sortNotesByDate } from './utils/noteUtils';
import { exportNotes } from './utils/localStorage';

function App() {
  const { notes, loading, addNote, editNote, deleteNote } = useNotes();
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    noteId: string;
    noteTitle: string;
  }>({
    isOpen: false,
    noteId: '',
    noteTitle: '',
  });

  const filteredNotes = useMemo(() => {
    const searched = searchNotes(notes, searchTerm);
    return sortNotesByDate(searched);
  }, [notes, searchTerm]);

  const handleNewNote = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleSaveNote = (formData: NoteFormData) => {
    if (editingNote) {
      editNote(editingNote.id, formData);
    } else {
      addNote(formData);
    }
    setShowForm(false);
    setEditingNote(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setDeleteConfirm({
        isOpen: true,
        noteId: id,
        noteTitle: note.title,
      });
    }
  };

  const confirmDelete = () => {
    deleteNote(deleteConfirm.noteId);
    setDeleteConfirm({ isOpen: false, noteId: '', noteTitle: '' });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, noteId: '', noteTitle: '' });
  };

  const handleExport = () => {
    exportNotes(notes);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        onNewNote={handleNewNote}
        onExport={handleExport}
        noteCount={notes.length}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        {filteredNotes.length === 0 ? (
          <EmptyState
            onNewNote={handleNewNote}
            isSearching={searchTerm.length > 0}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </main>
      
      {showForm && (
        <NoteForm
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={handleCancelForm}
        />
      )}
      
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Note"
        message={`Are you sure you want to delete "${deleteConfirm.noteTitle}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

export default App;