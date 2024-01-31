import React, { useState } from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
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
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  Container,
  ButtonContainer,
  InfoContainer,
  H3,
  ButtonL,
} from "./index.styles";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(
  { onChange, name, ...other },
  ref,
) {
  return (
    <IMaskInput
      {...other} // eslint-disable-line react/jsx-props-no-spreading
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

function AddCompanyInfo({
  employerData,
  setEmployerData,
  onPageChange,
  showAddSecondaryButton,
  setShowAddSecondaryButton,
  resetInitialState,
}) {
  AddCompanyInfo.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    employerData: PropTypes.array.isRequired,
    setEmployerData: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    showAddSecondaryButton: PropTypes.bool.isRequired,
    setShowAddSecondaryButton: PropTypes.func.isRequired,
    resetInitialState: PropTypes.func.isRequired,
  };

  const [open, setOpen] = useState(false);

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

  const handleAddSecondary = () => {
    if (employerData.length <= 1) {
      const newId = employerData.length;
      setEmployerData([
        ...employerData,
        {
          id: newId,
          secondaryAddress: "",
          secondaryCity: "",
          secondaryProvince: "",
          secondaryPostalCode: "",
        },
      ]);
    }
    setShowAddSecondaryButton(false);
  };

  const handleInputChange = (input, id, field) => {
    const newEmployerData = [...employerData];
    const index = newEmployerData.findIndex((item) => item.id === id);
    if (index !== -1) {
      newEmployerData[index][field] = input;
      setEmployerData(newEmployerData);
    }
  };
  const handleResetInputs = () => {
    resetInitialState();
    setShowAddSecondaryButton(true);
  };

  return (
    <Container>
      <Stack direction="column" alignItems="center" spacing={4}>
        <Box
          sx={{
            width: "63%",
          }}
        >
          <Typography variant="h4" component="h1" textAlign="left">
            Adding a New Employer
          </Typography>
          <Typography variant="body1" textAlign="left" sx={{ mt: 2 }}>
            Input information about the employer you are adding.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "63%",
          }}
        >
          <form onSubmit={handleNextButtonClick}>
            {employerData.map((lead) => (
              <InfoContainer key={lead.id}>
                {lead.id === 0 && (
                  <>
                    <H3>Company Information</H3>
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "96%" }}
                      id={`businessName${lead.id}`}
                      value={lead.businessName}
                      onChange={(e) =>
                        handleInputChange(
                          e.target.value,
                          lead.id,
                          "businessName",
                        )
                      }
                      label="Business Name"
                      helperText="*Required"
                      required
                    />
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "96%" }}
                      id={`businessLegalName${lead.id}`}
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
                      id={`naicsCode${lead.id}`}
                      value={lead.naicsCode}
                      onChange={(e) =>
                        handleInputChange(e.target.value, lead.id, "naicsCode")
                      }
                      label="NAICS Code"
                      required
                    />
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "47%" }}
                      id={`phoneNumber${lead.id}`}
                      value={lead.phoneNumber}
                      onChange={(e) =>
                        handleInputChange(
                          e.target.value,
                          lead.id,
                          "phoneNumber",
                        )
                      }
                      label="Phone Number"
                      helperText="*Required"
                      required
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        inputProps: {
                          name: "phoneNumber",
                          onChange: (e) =>
                            handleInputChange(
                              e.target.value,
                              lead.id,
                              "phoneNumber",
                            ),
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "47%" }}
                      id={`faxNumber${lead.id}`}
                      value={lead.faxNumber}
                      onChange={(e) =>
                        handleInputChange(e.target.value, lead.id, "faxNumber")
                      }
                      label="Fax Number"
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        inputProps: {
                          name: "faxNumber",
                          onChange: (e) =>
                            handleInputChange(
                              e.target.value,
                              lead.id,
                              "faxNumber",
                            ),
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "47%" }}
                      id={`generalEmail${lead.id}`}
                      value={lead.generalEmail}
                      onChange={(e) =>
                        handleInputChange(
                          e.target.value,
                          lead.id,
                          "generalEmail",
                        )
                      }
                      label="General Email"
                      helperText="*Required"
                      required
                    />
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "47%" }}
                      id={`website${lead.id}`}
                      value={lead.website}
                      onChange={(e) =>
                        handleInputChange(e.target.value, lead.id, "website")
                      }
                      label="Website"
                    />
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "96%" }}
                      id={`employerAddress${lead.id}`}
                      value={lead.employerAddress}
                      onChange={(e) =>
                        handleInputChange(
                          e.target.value,
                          lead.id,
                          "employerAddress",
                        )
                      }
                      label="Employer Address"
                      helperText="*Required"
                      required
                    />
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "96%" }}
                      id={`city${lead.id}`}
                      value={lead.city}
                      onChange={(e) =>
                        handleInputChange(e.target.value, lead.id, "city")
                      }
                      label="City"
                      helperText="*Required"
                      required
                    />
                    <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
                      <InputLabel id="province-label">Province</InputLabel>
                      <Select
                        sx={{ textAlign: "left" }}
                        labelId="province-label"
                        id={`province${lead.id}`}
                        name="province"
                        label="Province"
                        value={lead.province}
                        onChange={(e) =>
                          handleInputChange(e.target.value, lead.id, "province")
                        }
                      >
                        <MenuItem value="alberta">Alberta</MenuItem>
                        <MenuItem value="british_columbia">
                          British Columbia
                        </MenuItem>
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
                      id={`postalCode${lead.id}`}
                      value={lead.postalCode}
                      onChange={(e) =>
                        handleInputChange(e.target.value, lead.id, "postalCode")
                      }
                      label="Postal Code"
                      helperText="*Required"
                      required
                    />
                  </>
                )}
                {lead.id > 0 && ( // Render secondary address inputs only for additional addresses
                  <>
                    <H3>Secondary Address</H3>
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "96%" }}
                      id={`secondaryAddress${lead.id}`}
                      value={lead.secondaryAddress}
                      onChange={(e) =>
                        handleInputChange(
                          e.target.value,
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
                      onChange={(e) =>
                        handleInputChange(
                          e.target.value,
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
                        label="Secondary Province"
                        id={`secondaryProvince${lead.id}`}
                        name={`secondaryProvince${lead.id}`}
                        value={lead.secondaryProvince}
                        onChange={(e) =>
                          handleInputChange(
                            e.target.value,
                            lead.id,
                            "secondaryProvince",
                          )
                        }
                      >
                        <MenuItem value="alberta">Alberta</MenuItem>
                        <MenuItem value="british_columbia">
                          British Columbia
                        </MenuItem>
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
                    </FormControl>
                    <TextField
                      fullWidth
                      sx={{ m: 1, width: "47%" }}
                      id={`secondaryPostalCode${lead.id}`}
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
              + Add Secondary Address
            </ButtonL>

            <Pagination
              count={3}
              shape="rounded"
              hidePrevButton
              hideNextButton
              onChange={(event, value) => handlePageChange(event, value)}
              page={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 2,
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#3568E5",
                  color: "white",
                },
              }}
            />
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
                      onPageChange(1);
                    }}
                    autoFocus
                  >
                    YES, I&apos;M SURE
                  </Button>
                </DialogActions>
              </Dialog>
              <Button type="submit" variant="contained">
                NEXT
              </Button>
            </ButtonContainer>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}

export default AddCompanyInfo;
