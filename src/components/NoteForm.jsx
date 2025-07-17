import { useState, useContext } from "react";

import { AppContext } from "../context/AppContext";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const NoteForm = ({ country }) => {
  const { addNote } = useContext(AppContext);
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    addNote(country, note);
    setNote("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <TextField
        multiline
        rows={3}
        placeholder="Add a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          px: 2,
          bgcolor: "#3b82f6",
          color: "#fff",
          borderRadius: 1,
          "&:hover": {
            bgcolor: "#2563eb",
          },
        }}
      >
        Save Note
      </Button>
    </Box>
  );
};

export default NoteForm;
