import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import NoteForm from "./NoteForm";

import useCovid19Countries from "../hooks/useCovid19Countries";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Stack } from "@mui/material";

const CountryDetails = () => {
  const { country } = useParams();
  const { savedNotes, editNote, deleteNote } = useContext(AppContext);

  const [editingNote, setEditingNote] = useState(null);
  const [editText, setEditText] = useState("");

  const { countryData, countryLoading, countryError } = useCovid19Countries(country);

  const isMobile = useMediaQuery("(max-width:600px)");

  if (countryLoading || !countryData) {
    return (
      <Box textAlign="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (countryError) {
    return (
      <Box textAlign="center" p={4}>
        <Typography color="error">Error loading country data.</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", bgcolor: "white", boxShadow: 3, borderRadius: 2, p: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={3}>
        <Avatar
          src={countryData.countryInfo.flag}
          alt={countryData.country}
          sx={{ width: 64, height: 40, border: "1px solid #e5e7eb", borderRadius: 2 }}
          variant="rounded"
        />
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
          {countryData.country}
        </Typography>
      </Box>

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

      <Box mt={4}>
        <NoteForm country={countryData.country} />
      </Box>

      <Box mt={4}>
        <Typography variant="h6" align="center" fontWeight="bold" mb={2}>
          Saved Notes
        </Typography>
        {savedNotes.filter((note) => note.country === countryData.country).length === 0 ? (
          <Typography align="center" color="text.secondary">
            No notes yet.
          </Typography>
        ) : (
          <List>
            {savedNotes
              .filter((note) => note.country === countryData.country)
              .map((note) => (
                <ListItem
                  key={note.id}
                  sx={{
                    color: "#374151",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: 600, // batas lebar
                    margin: "0 auto",
                    gap: 1,
                  }}
                  disablePadding
                >
                  <Box sx={{ flex: 1, maxWidth: "auto", wordBreak: "break-word" }}>
                    <ListItemText
                      primary={
                        editingNote === note.id ? (
                          <TextField
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            size="small"
                            sx={{ width: isMobile ? "auto" : 450, bgcolor: "white" }}
                          />
                        ) : (
                          note.note
                        )
                      }
                    />
                  </Box>
                  <Stack direction={isMobile ? "column" : "row"}>
                    {editingNote === note.id ? (
                      <>
                        <Button
                          color="primary"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => {
                            editNote(note.id, editText);
                            setEditingNote(null);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          color="inherit"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => setEditingNote(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          color="primary"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => {
                            setEditingNote(note.id);
                            setEditText(note.note);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => deleteNote(note.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Stack>
                </ListItem>
              ))}
          </List>
        )}
      </Box>
    </Card>
  );
};

export default CountryDetails;
