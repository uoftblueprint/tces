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
import { Form, Header, Cancel } from "./index.styles";

function EditComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    // Create a JSON object with the required keys and values
    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    // Convert the JSON object to a string
    const userDataJSON = JSON.stringify(userData);

    // Replace url with target route
    fetch("http://localhost:8000/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userDataJSON,
    });
    // .then((response) => {
    //     if (response.ok) {
    //         // Handle success response (e.g., redirect or show a success message)
    //         console.log('Login successful');
    //     } else {
    //         // Handle error response (e.g., show an error message)
    //         console.error('Login failed');
    //     }
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
  };

  return (
    <Form>
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
          <Cancel variant="outlined" size="large">
            Cancel
          </Cancel>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default EditComponent;
