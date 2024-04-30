import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
import { useState } from "react";
import UserType from "../../prop-types/UserType";
import UserChipComponent from "../shared/user-chip-component";
import ChangeOwnerDialog from "../shared/change-owner-dialog";
import ErrorScreenComponent from "../shared/error-screen-component";
import { modifyClient } from "../../utils/api";
import ConfirmDialog from "../shared/confirm-dialog-component";
import FormSubmissionErrorDialog from "../shared/form-submission-error-dialog";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(
  { onChange, name, ...other },
  ref,
) {
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000x0000"
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

export default function ClientPage({
  clientInfo,
  monthsSinceClosure,
  getUserById,
  managedUsers,
  setSnackBarMessage,
}) {
  // Edit mode is initially set to true due to the structure of the inline if-else statements for rendering the form fields
  const [isEditMode, setIsEditMode] = React.useState(true);
  const [shouldSubmit, setShouldSubmit] = React.useState(false);
  const [ownerChangeDialog, setOwnerChangeDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorObj, setErrorObj] = React.useState(null);
  const [confirmEditDialog, setConfirmEditDialog] = useState(false);
  const [formSubmissionErrorDialog, setFormSubmissionErrorDialog] =
    useState(false);

  const owner = getUserById(clientInfo.owner);
  const creator = getUserById(clientInfo.creator);

  const onEditOwnerClick = () => {
    setOwnerChangeDialog(true);
  };

  const onOwnerChangeConfirm = () => {
    setOwnerChangeDialog(false);
  };

  const onChangeOwnerCancel = () => {
    setOwnerChangeDialog(false);
  };

  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  // Just for now
  const handleBackClick = () => {
    navigate("/clients");
  };

  const commitEdit = (e) => {
    e.preventDefault();
    setConfirmEditDialog(true);
  };

  const handleCopyClick = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackBarMessage("Text copied to the dashboard");
    } catch (err) {
      setSnackBarMessage("Error copying text to the clipboard:", err);
    }
  };

  const [editedName, setEditedName] = React.useState(clientInfo.firstName);
  const [editedEmail, seteditedEmail] = React.useState(clientInfo.email);
  const [editedPhone, setEditedPhone] = React.useState(clientInfo.phone);
  // If the database value is r_and_i, render it as r&i
  const [editedStatus, setEditedStatus] = React.useState(
    clientInfo.status === "R And I" ? "R&I" : clientInfo.status,
  );

  const [editedStatusExit, setEditedStatusExit] = React.useState(
    clientInfo.status_at_exit,
    clientInfo.status_at_exit,
  );
  const [editedStatus3, setEditedStatus3] = React.useState(
    clientInfo.status_at_3,
    clientInfo.status_at_3,
  );
  const [editedStatus6, setEditedStatus6] = React.useState(
    clientInfo.status_at_6,
    clientInfo.status_at_6,
  );
  const [editedStatus9, setEditedStatus9] = React.useState(
    clientInfo.status_at_9,
    clientInfo.status_at_9,
  );
  const [editedStatus12, setEditedStatus12] = React.useState(
    clientInfo.status_at_12,
    clientInfo.status_at_12,
  );

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
      case "status":
        setEditedStatus("");
        break;
      case "statusExit":
        setEditedStatusExit("");
        break;
      case "status3":
        setEditedStatus3("");
        break;
      case "status6":
        setEditedStatus6("");
        break;
      case "status9":
        setEditedStatus9("");
        break;
      case "status12":
        setEditedStatus12("");
        break;
      default:
        break;
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // rename editedStatus if it is r&i
    const sanitizedStatus = editedStatus === "r&i" ? "r_and_i" : editedStatus;

    const updatedClientInfo = {
      ...clientInfo,
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      status: sanitizedStatus,
      status_at_exit: editedStatusExit,
      status_at_3: editedStatus3,
      status_at_6: editedStatus6,
      status_at_9: editedStatus9,
      status_at_12: editedStatus12,
    };

    try {
      const response = await modifyClient(updatedClientInfo);

      if (response.ok) {
        setSnackBarMessage("Client updated successfully.");
        setIsEditMode(true);
        navigate(0);
      } else {
        setFormSubmissionErrorDialog(true);
        setSnackBarMessage("Failed to update client.");
      }
    } catch (error) {
      setErrorObj(error);
      setSnackBarMessage("An error occurred.");
    } finally {
      setIsLoading(false);
      setConfirmEditDialog(false);
    }
  };

  const cancelEdit = () => {
    setConfirmEditDialog(false);
  };

  const backToFormFromError = () => {
    setFormSubmissionErrorDialog(false);
  };

  const isStatusExitVisible = editedStatus === "Closed";

  if (errorObj) return <ErrorScreenComponent message={errorObj.message} />;

  return (
    <div
      style={{
        marginLeft: "40px",
        marginRight: "40px",
        marginTop: "40px",
        marginBottom: "40px",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <IconButton
          onClick={handleBackClick}
          sx={{ color: "gray", marginRight: 2, marginLeft: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box className="title">
          <Typography marginBottom={1} variant="h4" align="left">
            {clientInfo.firstName}
          </Typography>
          <Typography variant="subtitle2" align="left">
            Client
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            boxShadow: 2,
            p: 3,
          }}
        >
          <Box sx={{ textAlign: "center", mr: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Owner
            </Typography>
            <UserChipComponent user={owner} onClick={onEditOwnerClick} edit />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Creator
            </Typography>
            <UserChipComponent user={creator} />
          </Box>
        </Box>
        {/* !!!IMPORTANT MAKE NECESSARY CHANGES WHEN ROUTING :} !!! */}
        {managedUsers.length > 0 && (
          <ChangeOwnerDialog
            type="client"
            entity={clientInfo}
            currOwner={owner || managedUsers[0]}
            onCancel={onChangeOwnerCancel}
            onConfirm={onOwnerChangeConfirm}
            open={ownerChangeDialog}
            users={managedUsers}
            setSnackBarMessage={setSnackBarMessage}
            setError={setErrorObj}
          />
        )}
      </div>
      <form onSubmit={commitEdit}>
        <Paper>
          <Box>
            <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={10}>
                  <Typography variant="h5" align="left">
                    Personal Information
                  </Typography>
                </Grid>
                <Grid item xs={1.9} align="right">
                  <IconButton
                    type={shouldSubmit ? "submit" : "button"}
                    size="small"
                    onClick={() => {
                      if (!isEditMode) {
                        setShouldSubmit(true);
                      } else {
                        handleEditClick();
                        setShouldSubmit(false);
                      }
                    }}
                  >
                    <EditIcon
                      color={isEditMode ? "default" : "primary" }
                    />
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
                        error={!editedName}
                        required
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
                        error={!editedEmail}
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
                    <Grid item xs={7.5}>
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
                    <Grid item xs={0.5} id="info-card-icon">
                      <IconButton>
                        <ContentCopyIcon
                          onClick={() => handleCopyClick(clientInfo.phone)}
                        />
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
                        error={!editedPhone}
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
                        <Chip
                        variant="filled"
                        label={
                          clientInfo.status === "R And I"
                            ? "R&I"
                            : clientInfo.status
                        }
                      />
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
                    <Grid
                      item
                      xs={10}
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          display: "flex",
                          alignItems: "flex-start",
                        },
                      }}
                    >
                      <Select
                        fullWidth
                        value={editedStatus}
                        onChange={handleStatusChange}
                        renderValue={() =>
                          editedStatus && (
                            <Chip
                              label={editedStatus}
                              onMouseDown={(event) => {
                                event.stopPropagation();
                              }}
                            />
                          )
                        }
                        error={!editedStatus}
                        required
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
                        <Grid item xs={7.5}>
                          <Typography gutterBottom variant="body1" align="left">
                            {clientInfo.closure_date}
                          </Typography>
                        </Grid>
                        <Grid item xs={0.5} id="info-card-icon">
                          <IconButton>
                            <ContentCopyIcon
                              onClick={() =>
                                handleCopyClick(clientInfo.closure_date)
                              }
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
              </div>
            ) : null}

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
                        <Grid item xs={7.5}>
                          <Typography gutterBottom variant="body1" align="left">
                            {clientInfo.time_since_closure} Months
                          </Typography>
                        </Grid>
                        <Grid item xs={0.5} id="info-card-icon">
                          <IconButton>
                            <ContentCopyIcon
                              onClick={() =>
                                handleCopyClick(
                                  `${clientInfo.time_since_closure} Months`
                                )
                              }
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
              </div>
            ) : null}

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
                            {clientInfo.status_at_exit ? (
                              <Chip
                                variant="filled"
                                label={clientInfo.status_at_exit}
                              />
                            ) : (
                              "Unknown"
                            )}
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
                        <Grid
                          item
                          xs={10}
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              display: "flex",
                              alignItems: "flex-start",
                            },
                          }}
                        >
                          <Select
                            fullWidth
                            value={editedStatusExit}
                            onChange={handleStatusExitChange}
                            renderValue={() =>
                              editedStatusExit && (
                                <Chip
                                  label={editedStatusExit}
                                  onDelete={() =>
                                    handleChipDelete("statusExit")
                                  }
                                  onMouseDown={(event) => {
                                    event.stopPropagation();
                                  }}
                                />
                              )
                            }
                            error={!editedStatusExit}
                            required
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
                            {clientInfo.status_at_3 ? (
                              <Chip
                                variant="filled"
                                label={clientInfo.status_at_3}
                              />
                            ) : (
                              "Unknown"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
              </div>
            ) : (
              <div>
                {monthsSinceClosure >= 3 &&
                  clientInfo.status === "Closed" &&
                  isStatusExitVisible && (
                    <>
                      <Divider variant="middle" />
                      <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={1.5}>
                            <Typography
                              gutterBottom
                              variant="body1"
                              align="left"
                            >
                              Status At 3 Months
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={10}
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                display: "flex",
                                alignItems: "flex-start",
                              },
                            }}
                          >
                            <Select
                              fullWidth
                              value={editedStatus3}
                              onChange={handleStatus3Change}
                              renderValue={() =>
                                editedStatus3 && (
                                  <Chip
                                    label={editedStatus3}
                                    onDelete={() => handleChipDelete("status3")}
                                    onMouseDown={(event) => {
                                      event.stopPropagation();
                                    }}
                                  />
                                )
                              }
                              error={!editedStatus3}
                              required
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
                            {clientInfo.status_at_6 ? (
                              <Chip
                                variant="filled"
                                label={clientInfo.status_at_6}
                              />
                            ) : (
                              "Unknown"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
              </div>
            ) : (
              <div>
                {monthsSinceClosure >= 6 &&
                  clientInfo.status === "Closed" &&
                  isStatusExitVisible && (
                    <>
                      <Divider variant="middle" />
                      <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={1.5}>
                            <Typography
                              gutterBottom
                              variant="body1"
                              align="left"
                            >
                              Status At 6 Months
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={10}
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                display: "flex",
                                alignItems: "flex-start",
                              },
                            }}
                          >
                            <Select
                              fullWidth
                              value={editedStatus6}
                              onChange={handleStatus6Change}
                              renderValue={() =>
                                editedStatus6 && (
                                  <Chip
                                    label={editedStatus6}
                                    onDelete={() => handleChipDelete("status6")}
                                    onMouseDown={(event) => {
                                      event.stopPropagation();
                                    }}
                                  />
                                )
                              }
                              error={!editedStatus6}
                              required
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
                            {clientInfo.status_at_9 ? (
                              <Chip
                                variant="filled"
                                label={clientInfo.status_at_9}
                              />
                            ) : (
                              "Unknown"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
              </div>
            ) : (
              <div>
                {monthsSinceClosure >= 9 &&
                  clientInfo.status === "Closed" &&
                  isStatusExitVisible && (
                    <>
                      <Divider variant="middle" />
                      <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={1.5}>
                            <Typography
                              gutterBottom
                              variant="body1"
                              align="left"
                            >
                              Status At 9 Months
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={10}
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                display: "flex",
                                alignItems: "flex-start",
                              },
                            }}
                          >
                            <Select
                              fullWidth
                              value={editedStatus9}
                              onChange={handleStatus9Change}
                              renderValue={() =>
                                editedStatus9 && (
                                  <Chip
                                    label={editedStatus9}
                                    onDelete={() => handleChipDelete("status9")}
                                    onMouseDown={(event) => {
                                      event.stopPropagation();
                                    }}
                                  />
                                )
                              }
                              error={!editedStatus9}
                              required
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
                            {clientInfo.status_at_12 ? (
                              <Chip
                                variant="filled"
                                label={clientInfo.status_at_12}
                              />
                            ) : (
                              "Unknown"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
              </div>
            ) : (
              <div>
                {monthsSinceClosure >= 12 &&
                  clientInfo.status === "Closed" &&
                  isStatusExitVisible && (
                    <>
                      <Divider variant="middle" />
                      <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={1.5}>
                            <Typography
                              gutterBottom
                              variant="body1"
                              align="left"
                            >
                              Status At 12 Months
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={10}
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                display: "flex",
                                alignItems: "flex-start",
                              },
                            }}
                          >
                            <Select
                              fullWidth
                              value={editedStatus12}
                              onChange={handleStatus12Change}
                              renderValue={() =>
                                editedStatus12 && (
                                  <Chip
                                    label={editedStatus12}
                                    onDelete={() =>
                                      handleChipDelete("status12")
                                    }
                                    onMouseDown={(event) => {
                                      event.stopPropagation();
                                    }}
                                  />
                                )
                              }
                              error={!editedStatus12}
                              required
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

            {isEditMode ? null : (
              <div>
                <Divider variant="middle" />
                <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={11.5} align="right">
                      <Button
                        type="submit"
                        variant="text"
                        color="primary"
                        size="small"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            )}
          </Box>
        </Paper>
      </form>
      <ConfirmDialog
        open={confirmEditDialog}
        title="Confirm Edit"
        message="Are you sure you want to save these changes?"
        onConfirm={handleSave}
        onCancel={cancelEdit}
      />
      <FormSubmissionErrorDialog
        open={formSubmissionErrorDialog}
        onBack={backToFormFromError}
      />
    </div>
  );
}

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
    owner: PropTypes.number,
    creator: PropTypes.number,
  }).isRequired,
  monthsSinceClosure: PropTypes.number.isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  getUserById: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  // managedUsers: PropTypes.arrayOf(UserType).isRequired,
};
