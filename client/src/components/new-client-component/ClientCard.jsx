import { useState } from "react";
import { Card, CardHeader, CardContent, TextField, Stack } from "@mui/material";

function ClientCard() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Card>
      <CardHeader title="Add a New Client" />
      <CardContent>
        <Stack gap={2}>
          <Stack direction="row" gap={2}>
            <TextField
              type="text"
              label="Full Name"
              fullWidth
              value={fullName}
              helperText="*Required"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <TextField
              type="tel"
              label="Phone Number"
              fullWidth
              value={phoneNumber}
              helperText="*Required"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Stack>
          <TextField
            type="email"
            label="Email"
            value={email}
            helperText="*Required"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ClientCard;
