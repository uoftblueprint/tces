import { useState } from "react";
import {
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Header, Form, Discard, AddButton } from "./new-client.styles";
import ClientCard from "./ClientCard";

function NewClient() {
  const [clients, setClients] = useState([
    { fullName: "", phoneNumber: "", email: "" },
  ]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleAddClient = (e) => {
    e.preventDefault();
    setClients([...clients, { fullName: "", phoneNumber: "", email: "" }]);
  };

  return (
    <Form>
      <Stack gap={4}>
        <Header>
          <Typography variant="h3">Add a New Client</Typography>
          <Typography variant="body1">
            Input information about the client
          </Typography>
        </Header>
        {clients.map((client) => (
          <ClientCard key={client.id} />
        ))}
        <AddButton onClick={handleAddClient}>+ Add Another Client</AddButton>
        <Stack direction="row">
          <Discard
            variant="outlined"
            size="large"
            onClick={() => setDialogOpen(true)}
          >
            Discard
          </Discard>
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Stack>

        <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>ARE YOU SURE?</DialogTitle>
          <DialogContent>
            <Typography>
              You will lose all your progress and return to the Dashboard.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              CANCEL
            </Button>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              YES, I&rsquo;M SURE
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Form>
  );
}

export default NewClient;
