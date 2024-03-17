import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Avatar,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ClientType from "../../../prop-types/ClientType";

function ContactedEntryComponent({
  contactType,
  client,
  setComponentType,
  managedClients,
  onAddEntry,
}) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [notes, setNotes] = useState("");

  const handleValueChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notes.trim()) {
      const newContactEntryObject = {
        type: "contact",
        body: notes,
        object: selectedValue.id,
      };
      onAddEntry(newContactEntryObject);
    }
  };

  useEffect(() => {
    if (client) {

      const matchingClient = managedClients.find(c => c.id === client.id);
      if (matchingClient) {
        setSelectedValue(matchingClient);
      }
    }
  }, [client]);

  return (
    <form onSubmit={handleSubmit}>
      <CardContent sx={{ pl: 3, pt: 0 }}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Avatar
              sx={{
                bgcolor: "rgba(229, 53, 104, 1)",
                width: "30px",
                height: "30px",
              }}
            >
              <PhoneIphoneIcon sx={{ width: "18px", height: "18px" }} />
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
            <Typography>Contacted {contactType}</Typography>
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography sx={{ color: "rgba(117, 117, 117, 1)" }}>
          Select the {contactType} Contact
        </Typography>
        <Select
          fullWidth
          value={selectedValue}
          onChange={handleValueChange}
          sx={{ borderRadius: "10px" }}
          required
        >
          <MenuItem value={null} disabled>
            Select a Client
          </MenuItem>
          {managedClients.map((clientOb) => (
            <MenuItem key={clientOb.id} value={clientOb}>
              {clientOb.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          label="Add additional notes"
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

ContactedEntryComponent.propTypes = {
  client: ClientType.isRequired,
  contactType: PropTypes.string.isRequired,
  setComponentType: PropTypes.func.isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  onAddEntry: PropTypes.func.isRequired,
};

export default ContactedEntryComponent;
