export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteFormData {
  title: string;
  body: string;
}