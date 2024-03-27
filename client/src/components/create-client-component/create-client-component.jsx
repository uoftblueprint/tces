import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Header, Form, Discard, AddButton } from "./create-client.styles";
import ClientCard from "./ClientCard";
import ConfirmDialog from "../shared/confirm-dialog-component";
import { createClients } from "../../utils/api";
import ErrorScreenComponent from "../shared/error-screen-component";
import UserType from "../../prop-types/UserType";

function CreateClientComponent({ currUser }) {
  const navigate = useNavigate();
  const [clients, setClients] = useState([
    { id: `client-${Date.now()}`, fullName: "", phoneNumber: "", email: "" },
  ]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmSubmitDialog, setConfirmSubmitDialog] = useState(false);
  const [errorObj, setErrorObj] = useState(false);

  const handleAddClient = () => {
    setClients((currentClients) => [
      ...currentClients,
      { id: `client-${Date.now()}`, fullName: "", phoneNumber: "", email: "" },
    ]);
  };

  const handleDeleteClient = (clientId) => {
    setClients((currentClients) =>
      currentClients.filter((client) => client.id !== clientId),
    );
  };

  const onConfirmExit = () => {
    setDialogOpen(false);
    navigate("/clients");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setConfirmSubmitDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createClients(
        clients,
        currUser.userID,
        currUser.userID,
      );

      if (response.ok) {
        navigate("/clients");
      } else {
        setErrorObj(response);
      }
    } catch (error) {
      setErrorObj(error);
    } finally {
      setIsLoading(false);
    }
  };
  const cancelSubmit = () => {
    setConfirmSubmitDialog(false);
  };

  if (errorObj) return <ErrorScreenComponent message={errorObj.message} />;
  return (
    <Form onSubmit={onSubmit}>
      <Stack gap={4}>
        <Header>
          <Typography variant="h3">Add a New Client</Typography>
          <Typography variant="body1">
            Input information about the client
          </Typography>
        </Header>
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            setClientData={(newClientData) =>
              setClients((prevClients) =>
                prevClients.map((pc) =>
                  pc.id === client.id ? { ...pc, ...newClientData } : pc,
                ),
              )
            }
            showDeleteIcon={clients.length > 1}
            onDelete={() => handleDeleteClient(client.id)}
          />
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
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
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
            <Button onClick={onConfirmExit} color="primary">
              YES, I&rsquo;M SURE
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
      <ConfirmDialog
        open={confirmSubmitDialog}
        title="Confirm Submit"
        message="Are you sure you want to submit these changes?"
        onConfirm={handleSubmit}
        onCancel={cancelSubmit}
      />
    </Form>
  );
}

CreateClientComponent.propTypes = {
  currUser: UserType.isRequired,
};

export default CreateClientComponent;
