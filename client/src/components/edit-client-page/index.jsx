import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TableFooter from "@mui/material/TableFooter";
import Grid from "@mui/material/Grid";
import { IMaskInput } from "react-imask";
// import { useRef } from 'react';
import PropTypes from "prop-types";
/* eslint-disable react/jsx-props-no-spreading */

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

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

export default function ClientPage() {
  const userInfo = {
    firstName: "First Last",
    email: "email@email.com",
    phone: "+1 111 111 1111",
    status: "Active",
  };

  const [editedName, setEditedName] = React.useState(userInfo.firstName);
  const [editedEmail, seteditedEmail] = React.useState(userInfo.email);
  const [editedPhone, setEditedPhone] = React.useState(userInfo.phone);
  const [editedStatus, setEditedStatus] = React.useState(userInfo.status);

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEmailChange = (event) => {
    seteditedEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setEditedPhone(event.target.value);
  };

  const handleStatusChange = (event) => {
    setEditedStatus(event.target.value);
  };

  // Just for now
  const handleDelete = () => {
    console.info("You clicked the edit icon.");
  };

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <ArrowBackIcon sx={{ color: "gray", marginRight: 2, marginLeft: 2 }} />
        <Box className="title">
          <Typography marginBottom={1} variant="h4" align="left">
            John Smith
          </Typography>
          <Typography variant="subtitle2" align="left">
            Client
          </Typography>
        </Box>
        <Card id="people-card" sx={{ marginLeft: "auto" }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid
                item
                xs={6}
                sx={{ textAlign: "center", fontFamily: "Arial" }}
              >
                Owner
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ textAlign: "center", fontFamily: "Arial" }}
              >
                Creator
              </Grid>

              <Grid item xs={6}>
                <Chip
                  variant="outlined"
                  avatar={
                    <Avatar
                      sx={{
                        background: "#E53568",
                        color: "#FFFFFF",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      OP
                    </Avatar>
                  }
                  label="Owen Perth"
                  onDelete={handleDelete}
                  deleteIcon={<EditIcon />}
                />
              </Grid>
              <Grid item xs={6}>
                <Chip
                  variant="outlined"
                  avatar={
                    <Avatar sx={{ background: "blue", color: "white" }}>
                      EG
                    </Avatar>
                  }
                  label="Emily Gale"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">Personal Information</Typography>
                </TableCell>
                <TableCell align="right">
                  <EditIcon color="primary" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editedName}
                    onChange={handleNameChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Email
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editedEmail}
                    onChange={handleEmailChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Phone Number
                </TableCell>
                <TableCell>
                  <TextField
                    label="Phone Number"
                    value={editedPhone}
                    onChange={handlePhoneChange}
                    name="textmask"
                    fullWidth
                    InputProps={{
                      inputComponent: TextMaskCustom,
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <ContentCopyIcon />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Status
                </TableCell>
                <TableCell colSpan={2}>
                  <Select value={editedStatus} onChange={handleStatusChange}>
                    <MenuItem value="Active">
                      {" "}
                      <Chip label="Active" />
                    </MenuItem>
                    <MenuItem value="Not Active">
                      <Chip label="Not Active" />
                    </MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableCell colSpan={3} align="right">
                <Button>Save Changes</Button>
              </TableCell>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
