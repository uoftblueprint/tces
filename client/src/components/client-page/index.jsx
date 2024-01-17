import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import * as React from "react";
import TextField from "@mui/material/TextField";
/* eslint-disable react/jsx-props-no-spreading */
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";


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

export default function ClientPage({ clientInfo, monthsSinceClosure, onSaveChanges }) {
  ClientPage.propTypes = {
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

  const [isEditMode, setIsEditMode] = React.useState(true);

  // Just for now
  const handleClick = () => {
    console.info("You clicked the me.");
  };

  const navigate = useNavigate();

  const handleEditClick = () => {
    // navigate("/edit-client-page")
    setIsEditMode(!isEditMode);
  };

  // Just for now
  const handleBackClick = () => {
    navigate("/");
  };

  const handleCopyClick = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to the dashboard');
    } catch (error) {
      console.error('Error copying text to the clipboard:', error);
    }
  };



  const [editedName, setEditedName] = React.useState(clientInfo.firstName);
  const [editedEmail, seteditedEmail] = React.useState(clientInfo.email);
  const [editedPhone, setEditedPhone] = React.useState(clientInfo.phone);
  const [editedStatus, setEditedStatus] = React.useState(clientInfo.status);
  const [editedStatusExit, setEditedStatusExit] = React.useState(clientInfo.status_at_exit);
  const [editedStatus3, setEditedStatus3] = React.useState(clientInfo.status_at_3);
  const [editedStatus6, setEditedStatus6] = React.useState(clientInfo.status_at_6);
  const [editedStatus9, setEditedStatus9] = React.useState(clientInfo.status_at_9);
  const [editedStatus12, setEditedStatus12] = React.useState(clientInfo.status_at_12);

  // const [isStatusClosed, setIsStatusClosed] = React.useState(false);

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
    const selectedStatus = event.target.value;
    setEditedStatus(selectedStatus);
    // setIsStatusClosed(selectedStatus === 'Closed');
    // setEditedStatusExit('');
  };

  const handleStatusExitChange = (event) => {
    setEditedStatusExit(event.target.value);
  };

  const handleStatus3Change = (event) => {
    setEditedStatus3(event.target.value);
  };

  const handleStatus6Change = (event) => {
    setEditedStatus6(event.target.value);
  };

  const handleStatus9Change = (event) => {
    setEditedStatus9(event.target.value);
  };

  const handleStatus12Change = (event) => {
    setEditedStatus12(event.target.value);
  };


  const handleChipDelete = (chipType) => {
    switch (chipType) {
      case 'status':
        setEditedStatus('');
        // setEditedStatusExit('');
        break;
      case 'statusExit':
        setEditedStatusExit('');
        break;
      case 'status3':
        setEditedStatus3('');
        break;
      case 'status6':
        setEditedStatus6('');
        break;
      case 'status9':
        setEditedStatus9('');
        break;
      case 'status12':
        setEditedStatus12('');
        break;
      default:
        break;
    }
  };

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
    setIsEditMode(!isEditMode);
  };

  const isStatusExitVisible = editedStatus === 'Closed';

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px", marginTop: "40px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <IconButton onClick={handleBackClick} 
        sx={{ color: "gray", marginRight: 2, marginLeft: 2 }}>
        <ArrowBackIcon/>
        </IconButton>
        <Box className="title">
          <Typography marginBottom={1} variant="h4" align="left">
            {clientInfo.firstName}
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
                  onDelete={handleClick}
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
              <Grid item xs={1.6} align="right">
                <IconButton>
                  <EditIcon color="default" onClick={handleEditClick} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Divider />

          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
            {isEditMode ? (
                <>
                <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
             
                <Typography
                gutterBottom
                variant="body1"
                align="left"
                color={clientInfo.firstName ? "black" : "#A9A9A9"}
              >
                {clientInfo.firstName
                  ? clientInfo.firstName
                  : "Enter Name..."}
              </Typography>
              </Grid>
                </>
              ) : (
                <>
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
                </>
              )}
            </Grid>
          </Box>

          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
            {isEditMode ? (
                <>
                <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8}>
             
              <Typography
                    gutterBottom
                    variant="body1"
                    align="left"
                    color={clientInfo.email ? "black" : "#A9A9A9"}
                  >
                    {clientInfo.email ? clientInfo.email : "Enter Email..."}
                  </Typography>
              </Grid>
                </>
              ) : (
                <>
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
                </>
              )}
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
            {isEditMode ? (
                <>
                <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Phone Number
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography
                  gutterBottom
                  variant="body1"
                  align="left"
                  color={clientInfo.phone ? "black" : "#A9A9A9"}
                >
                  {clientInfo.phone
                    ? clientInfo.phone
                    : "Enter Phone Number..."}
                </Typography>
              </Grid>
              <Grid item xs={1} id="info-card-icon">
                <IconButton>
                <ContentCopyIcon onClick={() => handleCopyClick(clientInfo.phone)} />
                </IconButton>
              </Grid>
                </>
              ) : (
                <>
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
                </>
              )}
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
            {isEditMode ? (
                <>
                 <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Status
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" align="left">
                {clientInfo.status
                    ? <Chip variant="filled" label={clientInfo.status} />
                    : "Unknown"}
                </Typography>
              </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={1.5}>
                <Typography gutterBottom variant="body1" align="left">
                  Status
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{
        '& .MuiOutlinedInput-input': { display: 'flex', alignItems: 'flex-start' }
      }}>
                <Select 
                fullWidth 
                value={editedStatus} 
                onChange={handleStatusChange}
                renderValue={() =>
                  editedStatus && (
                    <Chip
                      label={editedStatus}
                      onDelete={() => handleChipDelete('status')}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                    />
                  )}
                >
              
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="R&I">R&I</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
              </Grid>
                </>
              )}
            </Grid>
          </Box>
          {isEditMode ? (
                <div>
              {clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Closure Date
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography gutterBottom variant="body1" align="left">
                    {clientInfo.closure_date}
                  </Typography>
                </Grid>
                <Grid item xs={1} id="info-card-icon">
                <IconButton>
                <ContentCopyIcon onClick={() => handleCopyClick(clientInfo.closure_date)} />
                </IconButton>
              </Grid>
              </Grid>
              </Box>
              </>
            )}
                </div>
              ) : null }
            
            {isEditMode ? (
                <div>
              {clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Time Since Closure
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography gutterBottom variant="body1" align="left">
                    {clientInfo.time_since_closure}
                  </Typography>
                </Grid>
                <Grid item xs={1} id="info-card-icon">
                <IconButton>
                <ContentCopyIcon onClick={() => handleCopyClick(clientInfo.time_since_closure)} />
                </IconButton>
              </Grid>
              </Grid>
              </Box>
              </>
            )}
                </div>
              ) : null }

{isEditMode ? (
                <div>
              {clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At Exit
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="left">
                  {clientInfo.status_at_exit
                    ? <Chip variant="filled" label={clientInfo.status_at_exit} />
                    : "Unknown"}
                  </Typography>
                </Grid>
              </Grid>
              </Box>
              </>
            )}
                </div>
              ) : (
                <div>
                {isStatusExitVisible && (
                <>
                <Divider variant="middle" />
                <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={1.5}>
                    <Typography gutterBottom variant="body1" align="left">
                      Status At Exit
                    </Typography>
                  </Grid>
                  <Grid item xs={10} sx={{ '& .MuiOutlinedInput-input': { display: 'flex', alignItems: 'flex-start' }}}>
                  <Select 
                    fullWidth 
                    value={editedStatusExit} 
                    onChange={handleStatusExitChange}
                    renderValue={() =>
                      editedStatusExit && (
                        <Chip
                          label={editedStatusExit}
                          onDelete={() => handleChipDelete('statusExit')}
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                        />
                      )}
                    >
                  
                    <MenuItem value="Employed">Employed</MenuItem>
                    <MenuItem value="Training">Training</MenuItem>
                    <MenuItem value="No Results">No Results</MenuItem>
                  </Select>
                  </Grid>
                </Grid>
                </Box>
                </>
                )} 
                </div>
                )}

{isEditMode ? (
                <div>
              {monthsSinceClosure >= 3 && clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 3 Months
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                <Typography variant="body1" align="left">
                {clientInfo.status_at_3
                    ? <Chip variant="filled" label={clientInfo.status_at_3} />
                    : "Unknown"}
                </Typography>
                </Grid>
              </Grid>
            </Box>
            </>
            )}
                </div>
              ) : (
                <div>
                {monthsSinceClosure >= 3 && clientInfo.status === 'Closed' && isStatusExitVisible && (
            <>
            <Divider variant="middle" />
            <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1.5}>
                <Typography gutterBottom variant="body1" align="left">
                  Status At 3 Months
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{ '& .MuiOutlinedInput-input': { display: 'flex', alignItems: 'flex-start' }}}>
              <Select 
              fullWidth 
              value={editedStatus3} 
              onChange={handleStatus3Change}
              renderValue={() =>
                editedStatus3 && (
                  <Chip
                    label={editedStatus3}
                    onDelete={() => handleChipDelete('status3')}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                )}
                >
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Training">Training</MenuItem>
                <MenuItem value="No Results">No Results</MenuItem>
              </Select>
              </Grid>
            </Grid>
            </Box>
            </>
            )} 
            </div>
            )}

{isEditMode ? (
                <div>
              {monthsSinceClosure >= 6 && clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 6 Months
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="left">
                  {clientInfo.status_at_6
                    ? <Chip variant="filled" label={clientInfo.status_at_6} />
                    : "Unknown"}
                  </Typography>
                </Grid>
              </Grid>
              </Box>
              </>
            )}
                </div>
              ) : (
                <div>
                {monthsSinceClosure >= 6 && clientInfo.status === 'Closed' && isStatusExitVisible && (
            <>
            <Divider variant="middle" /> 
            <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1.5}>
                <Typography gutterBottom variant="body1" align="left">
                  Status At 6 Months
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{ '& .MuiOutlinedInput-input': { display: 'flex', alignItems: 'flex-start' }}}>
              <Select 
              fullWidth 
              value={editedStatus6} 
              onChange={handleStatus6Change}
              renderValue={() =>
                editedStatus6 && (
                  <Chip
                    label={editedStatus6}
                    onDelete={() => handleChipDelete('status6')}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                )}
                >
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Training">Training</MenuItem>
                <MenuItem value="No Results">No Results</MenuItem>
              </Select>
              </Grid>
            </Grid>
            </Box>
            </>
            )}
            </div>
            )}

{isEditMode ? (
                <div>
              {monthsSinceClosure >= 9 && clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 9 Months
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="left">
                  {clientInfo.status_at_9
                    ? <Chip variant="filled" label={clientInfo.status_at_9} />
                    : "Unknown"}
                  </Typography>
                </Grid>
              </Grid>
              </Box>
              </>
            )}
                </div>
              ) : (
                <div>
                {monthsSinceClosure >= 9 && clientInfo.status === 'Closed' && isStatusExitVisible && (
            <>
            <Divider variant="middle" />
            <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1.5}>
                <Typography gutterBottom variant="body1" align="left">
                  Status At 9 Months
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{ '& .MuiOutlinedInput-input': { display: 'flex', alignItems: 'flex-start' }}}>
              <Select 
              fullWidth 
              value={editedStatus9} 
              onChange={handleStatus9Change}
              renderValue={() =>
                editedStatus9 && (
                  <Chip
                    label={editedStatus9}
                    onDelete={() => handleChipDelete('status9')}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                )}
                >
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Training">Training</MenuItem>
                <MenuItem value="No Results">No Results</MenuItem>
              </Select>
              </Grid>
            </Grid>
            </Box>
            </>
            )}
            </div>
            )}

{isEditMode ? (
                <div>
              {monthsSinceClosure >= 12 && clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 12 Months
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="left">
                  {clientInfo.status_at_12
                    ? <Chip variant="filled" label={clientInfo.status_at_12} />
                    : "Unknown"}
                  </Typography>
                </Grid>
              </Grid>
              </Box>
              </>
            )}
                </div>
              ) : (
                <div>
                {monthsSinceClosure >= 12 && clientInfo.status === 'Closed' && isStatusExitVisible && (
            <>
            <Divider variant="middle" />
            <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1.5}>
                <Typography gutterBottom variant="body1" align="left">
                  Status At 12 Months
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{ '& .MuiOutlinedInput-input': { display: 'flex', alignItems: 'flex-start' }}}>
              <Select 
              fullWidth 
              value={editedStatus12} 
              onChange={handleStatus12Change}
              renderValue={() =>
                editedStatus12 && (
                  <Chip
                    label={editedStatus12}
                    onDelete={() => handleChipDelete('status12')}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                )}
              >
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Training">Training</MenuItem>
                <MenuItem value="No Results">No Results</MenuItem>
              </Select>
              </Grid>
            </Grid>
            </Box>
            </>
            )}
            </div>
            )}

{isEditMode ? (
                   null
                ) : (
                  <div>
                  <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={11.5} align="right">
                <Button onClick={handleSave}>Save Changes</Button>
              </Grid>
            </Grid>
          </Box>
          </div>
                )}


            
            
          
        </Box>
      </Paper>
    </div>
  );
}
