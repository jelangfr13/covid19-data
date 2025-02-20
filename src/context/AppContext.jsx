import { createContext, useState, useEffect } from "react";

// Membuat Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Ambil data notes dari localStorage saat pertama kali aplikasi dijalankan
  const [savedNotes, setSavedNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  // Simpan notes ke localStorage setiap kali savedNotes berubah
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(savedNotes));
  }, [savedNotes]);

  // Fungsi untuk menambahkan catatan baru
  const addNote = (country, note) => {
    const newNote = { id: Date.now(), country, note };
    setSavedNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Fungsi untuk mengedit catatan
  const editNote = (id, updatedNote) => {
    setSavedNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, note: updatedNote } : note))
    );
  };

  // Fungsi untuk menghapus catatan
  const deleteNote = (id) => {
    setSavedNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <AppContext.Provider value={{ savedNotes, addNote, editNote, deleteNote }}>
      {children}
    </AppContext.Provider>
  );
};
