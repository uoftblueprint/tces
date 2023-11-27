/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Card, CardHeader, CardContent, TextField, Stack } from "@mui/material";
import { IMaskInput } from "react-imask";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(
  { onChange, name, ...other },
  ref,
) {
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function ClientCard({ i, clientData, setClientData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const [fullName, setFullName] = useState("");
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
              value={clientData.fullName}
              helperText="*Required"
              onChange={(e) => handleChange(e)}
              required
            />
            <TextField
              label="Phone Number"
              value={clientData.phoneNumber}
              onChange={(e) => handleChange(e)}
              name="textmask"
              fullWidth
              InputProps={{
                inputComponent: TextMaskCustom,
              }}
              helperText="*Required"
              required
            />
          </Stack>
          <TextField
            type="email"
            label="Email"
            value={clientData.email}
            helperText="*Required"
            onChange={(e) => handleChange(e)}
            required
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ClientCard;
