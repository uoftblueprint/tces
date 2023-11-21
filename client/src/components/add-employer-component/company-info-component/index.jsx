import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

function AddCompanyInfo({ onPageChange }) {
  AddCompanyInfo.propTypes = {
    onPageChange: PropTypes.func.isRequired,
  };
  const [open, setOpen] = React.useState(false);
  const [showAddSecondaryButton, setShowAddSecondaryButton] = useState(() => {
    const sessionStorageValue = sessionStorage.getItem(
      "showAddSecondaryButton",
    );
    return sessionStorageValue === null || sessionStorageValue === undefined
      ? true
      : sessionStorageValue === "true";
  });

  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextButtonClick = () => {
    onPageChange(2);
  };

  // Initialize state from local storage or use default if not present
  const initialContactInfo = () =>
    JSON.parse(sessionStorage.getItem("contactInfo")) || [
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
    ];

  const [contactInfo, setContactInfo] = useState(initialContactInfo);

  useEffect(() => {
    // Save state to session storage whenever it changes
    sessionStorage.setItem("contactInfo", JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    // Save state to session storage whenever it changes
    sessionStorage.setItem(
      "showAddSecondaryButton",
      showAddSecondaryButton.toString(),
    );
  }, [showAddSecondaryButton]);

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
    }
    // Hide the "Add Secondary Address" button after adding one secondary address
    setShowAddSecondaryButton(false);
  };

  const handleInputChange = (input, id, field) => {
    const newContactInfo = [...contactInfo];
    const index = newContactInfo.findIndex((lead) => lead.id === id);
    if (index !== -1) {
      newContactInfo[index][field] = input;
      setContactInfo(newContactInfo);
    }
  };

  const handleResetInputs = () => {
    // Clear session storage
    sessionStorage.removeItem("contactInfo");
    sessionStorage.removeItem("showAddSecondaryButton");

    // Reset the inputs to initial values
    setContactInfo(initialContactInfo());
    setShowAddSecondaryButton(true);
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
                id="businessName"
                value={lead.businessName}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "businessName")
                }
                label="Business Name"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="businessLegalName"
                label="Business Legal Name"
                value={lead.businessLegalName}
                onChange={(input) =>
                  handleInputChange(
                    input.target.value,
                    lead.id,
                    "businessLegalName",
                  )
                }
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="naicsCode"
                value={lead.naicsCode}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "naicsCode")
                }
                label="NAICS Code"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="phoneNumber"
                value={lead.phoneNumber}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "phoneNumber")
                }
                label="Phone Number"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="faxNumber"
                value={lead.faxNumber}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "faxNumber")
                }
                label="Fax Number"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="outlined-helperText"
                value={lead.generalEmail}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "generalEmail")
                }
                label="General Email"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="website"
                value={lead.website}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "website")
                }
                label="Website"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="employerAddress"
                value={lead.employerAddress}
                onChange={(input) =>
                  handleInputChange(
                    input.target.value,
                    lead.id,
                    "employerAddress",
                  )
                }
                label="Employer Address"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="city"
                value={lead.city}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "city")
                }
                label="City"
                helperText="*Required"
              />
              <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
                <InputLabel id="demo-simple-select-label">Province</InputLabel>
                <Select
                  sx={{ textAlign: "left" }}
                  labelId="demo-simple-select-helper-label"
                  id="province"
                  value={lead.province}
                  label="Province"
                  onChange={(input) =>
                    handleInputChange(input.target.value, lead.id, "province")
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
                id="postalCode"
                value={lead.postalCode}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "postalCode")
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
                value={lead.secondaryAddress}
                onChange={(input) =>
                  handleInputChange(
                    input.target.value,
                    lead.id,
                    "secondaryAddress",
                  )
                }
                label="Secondary Address"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id={`secondaryCity${lead.id}`}
                value={lead.secondaryCity}
                onChange={(input) =>
                  handleInputChange(
                    input.target.value,
                    lead.id,
                    "secondaryCity",
                  )
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
                  label="Province"
                  onChange={(input) =>
                    handleInputChange(
                      input.target.value,
                      lead.id,
                      "secondaryProvince",
                    )
                  }
                />
              </FormControl>
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id={`secondaryPostalCode${lead.id}`}
                value={lead.secondaryPostalCode}
                onChange={(input) =>
                  handleInputChange(
                    input.target.value,
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
        <Pagination
          count={3}
          shape="rounded"
          hidePrevButton
          hideNextButton
          onChange={(event, value) => handlePageChange(event, value)}
          page={1}
          sx={{
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#3568E5",
              color: "white",
            },
          }}
        />
      </Stack>
      <ButtonContainer>
        <Button
          sx={{ justifySelf: "flex-end" }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          DISCARD
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ARE YOU SURE?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You will lose all your progress and return to the Dashboard.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button
              onClick={() => {
                handleClose();
                handleResetInputs();
              }}
              autoFocus
            >
              YES, I&apos;M SURE
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained" onClick={handleNextButtonClick}>
          NEXT
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default AddCompanyInfo;
