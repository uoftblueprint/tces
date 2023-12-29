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
import ConfirmDialog from "../shared/confirm-dialog-component";
import { modifyUser } from "../../utils/api";
import { ErrorMessage } from "../login-component/index.styles";
import UserType from "../../prop-types/UserType";

function EditComponent({ currUser }) {
  const navigate = useNavigate();
  const { userID } = currUser;

  const [firstName, setFirstName] = useState(
    currUser.firstName ? currUser.firstName : "",
  );
  const [lastName, setLastName] = useState(
    currUser.lastName ? currUser.lastName : "",
  );
  const [email, setEmail] = useState(currUser.email ? currUser.email : "");
  const [password, setPassword] = useState("");
  const [confirmEditDialog, setConfirmEditDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setConfirmEditDialog(true);
  };

  const confirmEdit = async () => {
    setConfirmEditDialog(false);
    const userData = {
      userID,
      firstName,
      lastName,
      email,
      isAdmin: false,
    };

    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await modifyUser(userData);
      if (response.ok) {
        navigate("/admin");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "User modification failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during your request.");
    } finally {
      setIsLoading(false);
    }
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
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </Stack>
        <ErrorMessage>{errorMessage}</ErrorMessage>
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
  currUser: UserType.isRequired,
};

export default EditComponent;
