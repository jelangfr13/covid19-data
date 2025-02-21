import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // mengambil data notes dari localStorage saat pertama kali aplikasi dijalankan
  const [savedNotes, setSavedNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  // menyimpan notes ke localStorage setiap kali savedNotes berubah
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(savedNotes));
  }, [savedNotes]);

  // menambahkan notes baru
  const addNote = (country, note) => {
    const newNote = { id: Date.now(), country, note };
    setSavedNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // mengedit notes
  const editNote = (id, updatedNote) => {
    setSavedNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, note: updatedNote } : note))
    );
  };

  // menghapus notes
  const deleteNote = (id) => {
    setSavedNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <AppContext.Provider value={{ savedNotes, addNote, editNote, deleteNote }}>
      {children}
    </AppContext.Provider>
  );
};
