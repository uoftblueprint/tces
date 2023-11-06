import { useState } from "react";

import {
  TextField,
  Stack,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Form,
  Header,
  Cancel,
} from "./index.styles";

function CreateComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = () => {
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
    fetch("http://localhost:8000/create", {
      method: "POST", // Not sure which method
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
          <Typography variant="h3">Create New User</Typography>
          <Typography variant="body1">Manually create a new user</Typography>
        </Header>

        <Card>
          <CardHeader title="User Information" />
          <CardContent>
            <Stack gap={1.5}>
              <TextField
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                label="First Name"
                helperText="*Required"
              />
              <TextField
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                label="Last Name"
                helperText="*Required"
              />
              <TextField
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                helperText="*Required"
              />
              <TextField
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                helperText="*Required"
              />
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row">
          <Cancel variant="outlined" size="large">
            Cancel
          </Cancel>
          <Button variant="contained" size="large" onClick={handleCreate}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default CreateComponent;
