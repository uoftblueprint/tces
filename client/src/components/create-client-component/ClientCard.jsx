/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import PropTypes from "prop-types";
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

function ClientCard({ setClientData, index }) {
  const [values, setValues] = React.useState({
    fullName: "",
    textmask: "",
    email: "",
  });

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
    setClientData(
      {
        fullName:
          event.target.name === "fullName"
            ? event.target.value
            : values.fullName,
        phoneNumber:
          event.target.name === "textmask"
            ? event.target.value
            : values.textmask,
        email:
          event.target.name === "email" ? event.target.value : values.email,
      },
      index,
    );
  };

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
              value={values.fullName}
              helperText="*Required"
              onChange={handleChange}
              required
              name="fullName"
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
            value={values.email}
            helperText="*Required"
            onChange={handleChange}
            required
            name="email"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

ClientCard.propTypes = {
  setClientData: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default ClientCard;
