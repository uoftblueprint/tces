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

function ClientCard() {
  const [values, setValues] = React.useState({
    textmask: "",
    numberformat: "1320",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
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
              value={fullName}
              helperText="*Required"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <TextField
              label="Phone Number"
              value={values.textmask}
              onChange={handleChange}
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
