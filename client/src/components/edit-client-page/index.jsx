import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
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

export default function EditClientPage({
  clientInfo,
  monthsSinceClosure,
  onSaveChanges,
}) {
  console.log("MONTHS", monthsSinceClosure);
  const navigate = useNavigate();

  EditClientPage.propTypes = {
    clientInfo: PropTypes.shape({
      firstName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      status: PropTypes.string,
      closure_date: PropTypes.string,
      time_since_closure: PropTypes.string,
      status_at_exit: PropTypes.string,
      status_at_3: PropTypes.string,
      status_at_6: PropTypes.string,
      status_at_9: PropTypes.string,
      status_at_12: PropTypes.string,
    }).isRequired,
    monthsSinceClosure: PropTypes.number.isRequired,
    onSaveChanges: PropTypes.func.isRequired,
  };

  const [editedName, setEditedName] = React.useState(clientInfo.firstName);
  const [editedEmail, seteditedEmail] = React.useState(clientInfo.email);
  const [editedPhone, setEditedPhone] = React.useState(clientInfo.phone);
  // const [editedStatus, setEditedStatus] = React.useState(clientInfo.status);
  // const [editedStatusExit, setEditedStatusExit] = React.useState(clientInfo.status_at_exit);
  // const [editedStatus3, setEditedStatus3] = React.useState(clientInfo.status_at_3);
  // const [editedStatus6, setEditedStatus6] = React.useState(clientInfo.status_at_6);
  // const [editedStatus9, setEditedStatus9] = React.useState(clientInfo.status_at_9);
  // const [editedStatus12, setEditedStatus12] = React.useState(clientInfo.status_at_12);

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEmailChange = (event) => {
    seteditedEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setEditedPhone(event.target.value);
  };

  // const handleStatusChange = (event) => {
  //   setEditedStatus(event.target.value);
  // };

  // const handleStatusExitChange = (event) => {
  //   setEditedStatusExit(event.target.value);
  // };

  // const handleStatus3Change = (event) => {
  //   setEditedStatus3(event.target.value);
  // };

  // const handleStatus6Change = (event) => {
  //   setEditedStatus6(event.target.value);
  // };

  // const handleStatus9Change = (event) => {
  //   setEditedStatus9(event.target.value);
  // };

  // const handleStatus12Change = (event) => {
  //   setEditedStatus12(event.target.value);
  // };

  // Just for now
  const handleDelete = () => {
    console.info("You clicked the edit icon.");
  };

  const options = ["Employed", "Training", "No Results"];
  const statusOptions = ["Active", "R and I", "Closed"];

  const [editedStatus, setEditedStatus] = React.useState([clientInfo.status]);
  const [inputValueStatus, setInputValueStatus] = React.useState("");

  const [editedStatusExit, setEditedStatusExit] = React.useState([
    clientInfo.status_at_exit,
  ]);
  const [inputValueExit, setInputValueExit] = React.useState("");

  const [editedStatus3, setEditedStatus3] = React.useState([
    clientInfo.status_at_3,
  ]);
  const [inputValue3, setInputValue3] = React.useState("");

  const [editedStatus6, setEditedStatus6] = React.useState([
    clientInfo.status_at_6,
  ]);
  const [inputValue6, setInputValue6] = React.useState("");

  const [editedStatus9, setEditedStatus9] = React.useState([
    clientInfo.status_at_9,
  ]);
  const [inputValue9, setInputValue9] = React.useState("");

  const [editedStatus12, setEditedStatus12] = React.useState([
    clientInfo.status_at_12,
  ]);
  const [inputValue12, setInputValue12] = React.useState("");

  const handleSave = () => {
    const updatedClientInfo = {
      ...clientInfo,
      firstName: editedName,
      email: editedEmail,
      phone: editedPhone,
      status: editedStatus,
      status_at_exit: editedStatusExit,
      status_at_3: editedStatus3,
      status_at_6: editedStatus6,
      status_at_9: editedStatus9,
      status_at_12: editedStatus12,
    };

    onSaveChanges(updatedClientInfo);
    navigate("/client-page");
  };

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px", marginTop: "40px" }}>
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
                    <Avatar style={{ background: "#E53568", color: "white" }}>
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
                    <Avatar style={{ background: "#3568E5", color: "white" }}>
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
                  value={editedStatus}
                  onChange={(event, newValue) => {
                    setEditedStatus(newValue);
                  }}
                  inputValue={inputValueStatus}
                  onInputChange={(event, newInputValue) => {
                    setInputValueStatus(newInputValue);
                  }}
                  options={statusOptions}
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
          {clientInfo.status === "Closed" ? <Divider variant="middle" /> : null}
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            {clientInfo.status === "Closed" && (
              <Grid container direction="row" alignItems="center">
                <Grid item xs={1.5}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At Exit
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Autocomplete
                    multiple
                    value={editedStatusExit}
                    onChange={(event, newValue) => {
                      setEditedStatusExit(newValue);
                    }}
                    inputValue={inputValueExit}
                    onInputChange={(event, newInputValue) => {
                      setInputValueExit(newInputValue);
                    }}
                    // onChange={handleStatusExitChange}
                    options={options}
                    // defaultValue={options.filter(option => editedStatus.includes(option))}
                    // defaultValue={[editedStatusExit]}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
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
            )}
          </Box>
          {monthsSinceClosure >= 3 && clientInfo.status === "Closed" ? (
            <Divider variant="middle" />
          ) : null}
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            {monthsSinceClosure >= 3 && clientInfo.status === "Closed" && (
              <Grid container direction="row" alignItems="center">
                <Grid item xs={1.5}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 3 Months
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Autocomplete
                    value={editedStatus3}
                    onChange={(event, newValue) => {
                      setEditedStatus3(newValue);
                    }}
                    inputValue={inputValue3}
                    onInputChange={(event, newInputValue) => {
                      setInputValue3(newInputValue);
                    }}
                    options={options}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
          {monthsSinceClosure >= 6 && clientInfo.status === "Closed" ? (
            <Divider variant="middle" />
          ) : null}
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            {monthsSinceClosure >= 6 && clientInfo.status === "Closed" && (
              <Grid container direction="row" alignItems="center">
                <Grid item xs={1.5}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 6 Months
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Autocomplete
                    value={editedStatus6}
                    onChange={(event, newValue) => {
                      setEditedStatus6(newValue);
                    }}
                    inputValue={inputValue6}
                    onInputChange={(event, newInputValue) => {
                      setInputValue6(newInputValue);
                    }}
                    options={options}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
          {monthsSinceClosure >= 9 && clientInfo.status === "Closed" ? (
            <Divider variant="middle" />
          ) : null}
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            {monthsSinceClosure >= 9 && clientInfo.status === "Closed" && (
              <Grid container direction="row" alignItems="center">
                <Grid item xs={1.5}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 9 Months
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Autocomplete
                    value={editedStatus9}
                    onChange={(event, newValue) => {
                      setEditedStatus9(newValue);
                    }}
                    inputValue={inputValue9}
                    onInputChange={(event, newInputValue) => {
                      setInputValue9(newInputValue);
                    }}
                    options={options}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
          {monthsSinceClosure >= 12 && clientInfo.status === "Closed" ? (
            <Divider variant="middle" />
          ) : null}
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            {monthsSinceClosure >= 12 && clientInfo.status === "Closed" && (
              <Grid container direction="row" alignItems="center">
                <Grid item xs={1.5}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 12 Months
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Autocomplete
                    value={editedStatus12}
                    onChange={(event, newValue) => {
                      setEditedStatus12(newValue);
                    }}
                    inputValue={inputValue12}
                    onInputChange={(event, newInputValue) => {
                      setInputValue12(newInputValue);
                    }}
                    options={options}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={11.5} align="right">
                <Button onClick={handleSave}>Save Changes</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
