import { useEffect, useState } from "react";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="bg-white shadow-md p-4 rounded">
      {notes.length === 0 ? <p>No notes saved</p> : (
        <ul>
          {notes.map((note, index) => (
            <li key={index} className="border-b p-2 flex justify-between">
              <span>{note.country}: {note.note}</span>
              <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
