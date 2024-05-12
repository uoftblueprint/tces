import { useState } from "react";
import {
  TextField,
  Stack,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form, Header, Cancel } from "./index.styles";
import { createUser } from "../../utils/api";
import { ErrorMessage } from "../login-component/index.styles";

function CreateComponent() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await createUser(firstName, lastName, email, password);
      if (response.ok) {
        navigate("/admin");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "User creation failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleCreate}>
      <Stack maxWidth="md" gap={4}>
        <Header>
          <Typography variant="h3">Create New User</Typography>
          <Typography variant="body1">Manually create a new user</Typography>
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
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Stack>
    </Form>
  );
}
export default CreateComponent;
