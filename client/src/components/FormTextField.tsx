import { TextField, TextFieldProps } from "@mui/material";

function FormTextField({
  text,
  margin,
  fullWidth,
}: {
  text: string;
  margin?: "none" | "dense" | "normal";
  fullWidth?: boolean;
}) {
  return (
    <TextField
      required
      autoFocus
      fullWidth={fullWidth}
      id={text}
      label={text}
      name={text}
      autoComplete={text}
      margin={margin}
    />
  );
}

export default FormTextField;
