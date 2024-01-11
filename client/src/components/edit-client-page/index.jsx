import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
/* eslint-disable react/jsx-props-no-spreading */

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

export default function EditClientPage() {
  const clientInfo = {
    firstName: "First Last",
    email: "email@email.com",
    phone: "+1 111 111 1111",
    status: "Active",
  };

  const [editedName, setEditedName] = React.useState(clientInfo.firstName);
  const [editedEmail, seteditedEmail] = React.useState(clientInfo.email);
  const [editedPhone, setEditedPhone] = React.useState(clientInfo.phone);
  const [editedStatus, setEditedStatus] = React.useState(clientInfo.status);

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
    <div style={{ marginLeft: "40px", marginRight: "40px", marginTop: "40px"  }}>
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
                  variant="filled"
                  avatar={
                    <Avatar style={{ background: '#E53568', color: 'white' }}>
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
                  variant="filled"
                  avatar={
                    <Avatar style={{ background: '#3568E5', color: 'white' }}>EG</Avatar>
                  }
                  label="Emily Gale"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>

      <Paper>
      <Box>
      <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={10}>
                <Typography variant="h5" align="left">
                  Personal Information
                </Typography>
              </Grid>
              <Grid item xs={1.8} align="right">
                <EditIcon color="primary" />
              </Grid>
            </Grid>
          </Box>
          <Divider />

          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1.5}>
                <Typography gutterBottom variant="body1" align="left">
                  Name
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editedName}
                  fullWidth
                  onChange={handleNameChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />

          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1.5}>
                <Typography gutterBottom variant="body1" align="left">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editedEmail}
                  fullWidth
                  onChange={handleEmailChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={1.5}>
              <Typography gutterBottom variant="body1" align="left">
              Phone Number
              </Typography>
            </Grid>
            <Grid item xs={10}>
            <TextField
              value={editedPhone}
              onChange={handlePhoneChange}
              fullWidth
              id="phone"
              name="phone"
              InputProps={{
                inputComponent: TextMaskCustom,
              }}
            />
            </Grid>
          </Grid>
        </Box>
          {/* <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1.5}>
                <Typography gutterBottom variant="body1" align="left">
                  Status
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Select fullWidth value={editedStatus} onChange={handleStatusChange}>
                  <MenuItem value="Active">
                    {" "}
                    <Chip label="Active" />
                  </MenuItem>
                  <MenuItem value="Not Active">
                    <Chip label="Not Active" />
                  </MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box> */}
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1.5}>
                <Typography gutterBottom variant="body1" align="left">
                  Status
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Autocomplete
                  multiple
                  onChange={handleStatusChange}
                  options={['Active', 'R and I', 'Closed']}
                  defaultValue={[editedStatus]}
                  // onChange={(event, newValue) => handleStatusChange(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={11.5} align="right">
                <Button>Save Changes</Button>
              </Grid>
            </Grid>
          </Box>
          </Box>
      </Paper>
    </div>
  );
}
