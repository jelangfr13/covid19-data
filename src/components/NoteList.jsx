import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Divider from '@mui/material/Divider';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const handleDialogOpen = (index) => {
    setDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDeleteIndex(null);
  };

  const handleDeleteConfirm = () => {
    const updatedNotes = notes.filter((_, i) => i !== deleteIndex);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    handleDialogClose();
  };

  return (
    <Paper sx={{ bgcolor: "white", boxShadow: 3, p: 3, borderRadius: 2 }}>
      {notes.length === 0 ? (
        <Typography color="text.secondary" align="center">No notes saved</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Saved Notes</Typography>

          <Divider sx={{ width: "100%", my: 3 }} />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map((note, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ width: "25%", minWidth: "200px" }}>{note.country}</TableCell>
                    <TableCell sx={{ width: "100%", minWidth: "400px" }}>{note.note}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 1,
                          bgcolor: "#ef4444",
                          color: "#fff",
                          "&:hover": { bgcolor: "#dc2626" },
                          minWidth: "64px"
                        }}
                        onClick={() => handleDialogOpen(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this note?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NoteList;
