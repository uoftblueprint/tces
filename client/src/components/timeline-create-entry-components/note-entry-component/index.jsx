import { useState } from "react";
import {
  Box,
  Avatar,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import PropTypes from "prop-types";

function NoteEntryComponent({ object, onAddEntry, setComponentType }) {
  const [notes, setNotes] = useState("");

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notes.trim()) {
      const newNoteEntryObject = {
        type: "note",
        body: notes,
        object: object.id,
      };
      onAddEntry(newNoteEntryObject);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent sx={{ pl: 3, pt: 0 }}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Avatar
              sx={{
                bgcolor: "rgba(255, 180, 0, 1)",
                width: "30px",
                height: "30px",
              }}
            >
              <CreateIcon sx={{ width: "18px", height: "18px" }} />
            </Avatar>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "16px",
            }}
          >
            <Typography>Write a Note</Typography>
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        <TextField
          fullWidth
          fullHeight
          label="Write your note"
          margin="normal"
          multiline
          variant="outlined"
          value={notes}
          onChange={handleNoteChange}
          required
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setComponentType("default")}
          >
            DISCARD
          </Button>
          <Button variant="contained" type="submit">
            POST
          </Button>
        </Box>
      </CardContent>
    </form>
  );
}

NoteEntryComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  object: PropTypes.any.isRequired,
  setComponentType: PropTypes.func.isRequired,
  onAddEntry: PropTypes.func.isRequired,
};

export default NoteEntryComponent;
