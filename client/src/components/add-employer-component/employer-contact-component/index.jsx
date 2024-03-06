import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import {
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Pagination,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  ButtonContainer,
  EmployerContactContainer,
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

function AddEmployerInfo({
  employerData,
  setEmployerData,
  onPageChange,
  resetInitialState,
}) {
  AddEmployerInfo.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    employerData: PropTypes.array.isRequired,
    setEmployerData: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    resetInitialState: PropTypes.func.isRequired,
  };

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackButtonClick = () => {
    onPageChange(1);
  };

  const handleNextButtonClick = () => {
    onPageChange(3);
  };

  const handleAddContact = () => {
    const newId = employerData.length;
    setEmployerData([
      ...employerData,
      {
        id: newId,
        name: "",
        jobTitle: "",
        phoneNumber: "",
        email: "",
        alternatePhoneNumber: "",
      },
    ]);
  };

  const handleDeleteContact = (id) => {
    const filteredData = employerData.filter((lead) => lead.id !== id);
    const updatedData = filteredData.map((lead, index) => ({
      ...lead,
      id: index,
    }));
    setEmployerData(updatedData);
  };

  const handleResetInputs = () => {
    resetInitialState();
  };

  const handleInputChange = (input, id, field) => {
    const newContacts = employerData.map((contact) =>
      contact.id === id ? { ...contact, [field]: input } : contact,
    );
    setEmployerData(newContacts);
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
            Input information about the Employer/HR Contact(s) of the employer.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "63%",
          }}
        >
          <form onSubmit={handleNextButtonClick}>
            {employerData.map((lead, index, array) => (
              <EmployerContactContainer key={lead.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <H3>Employer Contact</H3>
                  {array.length > 1 && (
                    <IconButton
                      onClick={() => handleDeleteContact(lead.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
                <TextField
                  fullWidth
                  sx={{ m: 1, width: "96%" }}
                  id={`name${lead.id}`}
                  value={lead.name}
                  onChange={(e) =>
                    handleInputChange(e.target.value, lead.id, "name")
                  }
                  label="Name"
                  helperText="*Required"
                  required
                />
                <TextField
                  fullWidth
                  sx={{ m: 1, width: "96%" }}
                  id={`jobTitle${lead.id}`}
                  value={lead.jobTitle}
                  onChange={(e) =>
                    handleInputChange(e.target.value, lead.id, "jobTitle")
                  }
                  label="Job Title/Designation"
                />
                <TextField
                  fullWidth
                  sx={{ m: 1, width: "47%" }}
                  id={`phoneNumber${lead.id}`}
                  value={lead.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(e.target.value, lead.id, "phoneNumber")
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
                  id={`email${lead.id}`}
                  value={lead.email}
                  onChange={(e) =>
                    handleInputChange(e.target.value, lead.id, "email")
                  }
                  label="Email"
                  helperText="*Required"
                  required
                />
                <TextField
                  fullWidth
                  sx={{ m: 1, width: "96%" }}
                  id={`alternatePhoneNumber${lead.id}`}
                  value={lead.alternatePhoneNumber}
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      lead.id,
                      "alternatePhoneNumber",
                    )
                  }
                  label="Alternate Phone Number"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                    inputProps: {
                      name: "alternatePhoneNumber",
                      onChange: (e) =>
                        handleInputChange(
                          e.target.value,
                          lead.id,
                          "alternatePhoneNumber",
                        ),
                    },
                  }}
                />
              </EmployerContactContainer>
            ))}
            <ButtonL onClick={handleAddContact}>+ Add Another Contact</ButtonL>
            <Pagination
              count={3}
              shape="rounded"
              hidePrevButton
              hideNextButton
              page={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 2,
                "& .MuiPaginationItem-root": {
                  color: "#3568E5",
                  pointerEvents: "none",
                },
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#3568e5",
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
                    You will lose all your progress and return to the employers
                    table.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>CANCEL</Button>
                  <Button
                    onClick={() => {
                      handleClose();
                      handleResetInputs();
                      navigate("/employers");
                    }}
                    autoFocus
                  >
                    YES, I&apos;M SURE
                  </Button>
                </DialogActions>
              </Dialog>
              <div style={{ display: "flex", gap: "16px" }}>
                <Button
                  sx={{
                    background:
                      "var(--light-action-focus-12-p, rgba(0, 0, 0, 0.12))",
                    color: "black",
                    ":hover": {
                      background:
                        "var(--light-action-focus-12-p, rgba(0, 0, 0, 0.379))",
                    },
                  }}
                  variant="contained"
                  onClick={handleBackButtonClick}
                >
                  BACK
                </Button>
                <Button type="submit" variant="contained">
                  NEXT
                </Button>
              </div>
            </ButtonContainer>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}

export default AddEmployerInfo;
