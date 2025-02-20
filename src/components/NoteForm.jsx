import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const NoteForm = ({ country }) => {
  const { addNote } = useContext(AppContext);
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return; // Hindari input kosong
    addNote(country, note);
    setNote(""); // Reset input setelah ditambahkan
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full border p-2 rounded resize-none"
        rows="3"
        placeholder="Add a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Note
      </button>
    </form>
  );
};

export default NoteForm;
