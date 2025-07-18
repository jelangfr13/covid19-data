import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [savedNotes, setSavedNotes] = useState([]);

  // Fetch notes dari Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      const notesCol = collection(db, "notes");
      const notesSnapshot = await getDocs(notesCol);
      const notesList = notesSnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setSavedNotes(notesList);
    };
    fetchNotes();
  }, []);

  // Add note
  const addNote = async (country, note) => {
    const docRef = await addDoc(collection(db, "notes"), { country, note });
    setSavedNotes((prev) => [...prev, { id: docRef.id, country, note }]);
  };

  // Edit note
  const editNote = async (id, newNote) => {
    await updateDoc(doc(db, "notes", id), { note: newNote });
    setSavedNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, note: newNote } : n))
    );
  };

  // Delete note
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    setSavedNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        savedNotes,
        addNote,
        editNote,
        deleteNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
