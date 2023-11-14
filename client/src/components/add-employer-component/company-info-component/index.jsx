import React, { useState } from "react";
import {
  TextField,
  FormHelperText,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Stack,
} from "@mui/material";
import {
  Container,
  ButtonContainer,
  InfoContainer,
  H3,
  H1,
  Body,
  ButtonL,
} from "./index.styles";

function AddCompanyInfo() {
  const [open, setOpen] = React.useState(false);
  const [showAddSecondaryButton, setShowAddSecondaryButton] =
    React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [contactInfo, setContactInfo] = useState([
    {
      id: 0,
      businessName: "",
      businessLegalName: "",
      naicsCode: "",
      phoneNumber: "",
      faxNumber: "",
      generalEmail: "",
      website: "",
      employerAddress: null,
      city: null,
      province: "",
      postalCode: "",
    },
  ]);

  const handleAddSecondary = () => {
    // Check if the limit for additional secondary addresses is reached
    if (contactInfo.length <= 1) {
      const newId = contactInfo.length + 1;
      setContactInfo((prevContactInfo) => [
        ...prevContactInfo,
        {
          id: newId,
          secondaryAddress: "",
          secondaryCity: "",
          secondaryProvince: "",
          secondaryPostalCode: "",
        },
      ]);
      // Hide the "Add Secondary Address" button after adding one secondary address
      setShowAddSecondaryButton(false);
    }
  };

  const handleInputChange = (e, id, field) => {
    const newContactInfo = [...contactInfo];
    const index = newContactInfo.findIndex((lead) => lead.id === id);
    if (index !== -1) {
      newContactInfo[index][field] = e;
      setContactInfo(newContactInfo);
    } else {
      console.error(`Invalid id: ${id}`);
    }
  };

  return (
    <Container>
      <H1>Adding a New Employer</H1>
      <Body>Input information about the employer you are adding.</Body>
      {contactInfo.map((lead) => (
        <InfoContainer key={lead.id}>
          {lead.id <= 1 && (
            <>
              <H3>Company Information</H3>
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="outlined-helperText"
                value={lead.businessName}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "businessName")
                }
                label="Business Name"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="outlined-multiline-static"
                label="Business Legal Name"
                value={lead.businessLegalName}
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
                    lead.id,
                    "businessLegalName",
                  )
                }
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="outlined-helperText"
                value={lead.naicsCode}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "naicsCode")
                }
                label="NAICS Code"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="outlined-helperText"
                value={lead.phoneNumber}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "phoneNumber")
                }
                label="Phone Number"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="outlined-helperText"
                value={lead.faxNumber}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "faxNumber")
                }
                label="Fax Number"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="outlined-helperText"
                value={lead.generalEmail}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "generalEmail")
                }
                label="General Email"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="outlined-helperText"
                value={lead.website}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "website")
                }
                label="Website"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="outlined-helperText"
                value={lead.employerAddress}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "employerAddress")
                }
                label="Employer Address"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="outlined-helperText"
                value={lead.city}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "city")
                }
                label="City"
                helperText="*Required"
              />
              <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
                <InputLabel id="demo-simple-select-label">Province</InputLabel>
                <Select
                  sx={{ textAlign: "left" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={lead.province}
                  label="Province"
                  onChange={(e) =>
                    handleInputChange(e.target.value, lead.id, "province")
                  }
                >
                  <MenuItem value="alberta">Alberta</MenuItem>
                  <MenuItem value="british_columbia">British Columbia</MenuItem>
                  <MenuItem value="manitoba">Manitoba</MenuItem>
                  <MenuItem value="new_brunswick">New Brunswick</MenuItem>
                  <MenuItem value="newfoundland_and_labrador">
                    Newfoundland and Labrador
                  </MenuItem>
                  <MenuItem value="nova_scotia">Nova Scotia</MenuItem>
                  <MenuItem value="ontario">Ontario</MenuItem>
                  <MenuItem value="prince_edward_island">
                    Prince Edward Island
                  </MenuItem>
                  <MenuItem value="quebec">Quebec</MenuItem>
                  <MenuItem value="saskatchewan">Saskatchewan</MenuItem>
                </Select>
                <FormHelperText>*Required</FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="outlined-helperText"
                value={lead.postalCode}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "postalCode")
                }
                label="Postal Code"
                helperText="*Required"
              />
            </>
          )}
          {lead.id > 1 && ( // Render secondary address inputs only for additional addresses
            <>
              <H3>Secondary Address</H3>
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id={`secondaryAddress${lead.id}`}
                helperText="*Required"
                value={lead.secondaryAddress}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "secondaryAddress")
                }
                label="Secondary Address"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id={`secondaryCity${lead.id}`}
                value={lead.secondaryCity}
                helperText="*Required"
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "secondaryCity")
                }
                label="City"
              />
              <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
                <InputLabel id={`secondaryProvinceLabel${lead.id}`}>
                  Secondary Province
                </InputLabel>
                <Select
                  sx={{ textAlign: "left" }}
                  labelId={`secondaryProvinceLabel${lead.id}`}
                  id={`secondaryProvince${lead.id}`}
                  value={lead.secondaryProvince}
                  helperText="*Required"
                  label="Province"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      lead.id,
                      "secondaryProvince",
                    )
                  }
                />
                <FormHelperText>*Required</FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id={`secondaryPostalCode${lead.id}`}
                helperText="*Required"
                value={lead.secondaryPostalCode}
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
                    lead.id,
                    "secondaryPostalCode",
                  )
                }
                label="Postal Code"
              />
            </>
          )}
        </InfoContainer>
      ))}
      <ButtonL
        onClick={handleAddSecondary}
        style={{ display: showAddSecondaryButton ? "block" : "none" }}
      >
        {showAddSecondaryButton
          ? "+ Add Secondary Address"
          : "Secondary Address Added"}
      </ButtonL>
      <Stack spacing={2}>
        <Pagination count={3} shape="rounded" />
      </Stack>
      <ButtonContainer>
        <Button
          sx={{ justifySelf: "flex-end" }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          DISCARD
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">ARE YOU SURE?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will lose all your progress and return to the Dashboard.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button onClick={handleClose} autoFocus>
              YES, I&apos;M SURE
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained">NEXT</Button>
      </ButtonContainer>
    </Container>
  );
}

export default AddCompanyInfo;
