import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import NoteForm from "./NoteForm";

const CountryDetails = () => {
  const { country } = useParams();
  const [countryData, setCountryData] = useState(null);
  const { savedNotes, editNote, deleteNote } = useContext(AppContext);
  const [editingNote, setEditingNote] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
        if (!response.ok) throw new Error("Failed to fetch country data");
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountryData();
  }, [country]);

  if (!countryData) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <img src={countryData.countryInfo.flag} alt={countryData.country} className="w-16 h-10 border rounded" />
        <h2 className="text-2xl font-bold">{countryData.country}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded text-center">
          <p className="text-lg font-semibold">Total Cases</p>
          <p className="text-xl font-bold">{countryData.cases.toLocaleString()}</p>
        </div>
        <div className="bg-red-100 p-4 rounded text-center">
          <p className="text-lg font-semibold">Deaths</p>
          <p className="text-xl font-bold">{countryData.deaths.toLocaleString()}</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-lg font-semibold">Recovered</p>
          <p className="text-xl font-bold">{countryData.recovered.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center">
          <p className="text-lg font-semibold">Active Cases</p>
          <p className="text-xl font-bold">{countryData.active.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6">
        <NoteForm country={countryData.country} />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Saved Notes</h3>
        {savedNotes.filter((note) => note.country === countryData.country).length === 0 ? (
          <p className="text-gray-500">No notes yet.</p>
        ) : (
          <ul className="list-disc pl-4">
            {savedNotes
              .filter((note) => note.country === countryData.country)
              .map((note) => (
                <li key={note.id} className="text-gray-700 flex justify-between items-center">
                  {editingNote === note.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-[500px] border p-1 rounded"
                    />
                  ) : (
                    <span>{note.note}</span>
                  )}
                  <div>
                    {editingNote === note.id ? (
                      <button
                        className="text-blue-500 ml-2"
                        onClick={() => {
                          editNote(note.id, editText);
                          setEditingNote(null);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="text-blue-500 ml-2"
                        onClick={() => {
                          setEditingNote(note.id);
                          setEditText(note.note);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
