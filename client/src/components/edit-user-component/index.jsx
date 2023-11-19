import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Stack,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import { Form, Header, Cancel } from "./index.styles";
import ConfirmDialog from "../confirm-dialog-component";

function EditComponent({ userID, onModifyUser }) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEditDialog, setConfirmEditDialog] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setConfirmEditDialog(true);
  };

  const confirmEdit = () => {
    const userData = {
      userID,
      firstName,
      lastName,
      email,
      isAdmin: false,
    };
    onModifyUser(userData);
    navigate("/admin");
    setConfirmEditDialog(false);
  };

  const cancelEdit = () => {
    setConfirmEditDialog(false);
  };

  return (
    <Form onSubmit={handleSave}>
      <Stack maxWidth="md" gap={4}>
        <Header>
          <Typography variant="h3">Edit User</Typography>
          <Typography variant="body1">
            Edit existing user information
          </Typography>
        </Header>

        <Card>
          <CardHeader title="User Information" />
          <CardContent>
            <Stack gap={1.5}>
              <TextField
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                label="First Name"
                helperText="*Required"
                required
              />
              <TextField
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                label="Last Name"
                helperText="*Required"
                required
              />
              <TextField
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                helperText="*Required"
                required
              />
              <TextField
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                helperText="*Required"
                required
              />
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row">
          <Cancel
            variant="outlined"
            size="large"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </Cancel>
          <Button type="submit" variant="contained" size="large">
            Save
          </Button>
        </Stack>
      </Stack>
      <ConfirmDialog
        open={confirmEditDialog}
        title="Confirm Edit"
        message="Are you sure you want to save these changes?"
        onConfirm={confirmEdit}
        onCancel={cancelEdit}
      />
    </Form>
  );
}

EditComponent.propTypes = {
  userID: PropTypes.number.isRequired,
  onModifyUser: PropTypes.func.isRequired,
};

export default EditComponent;
