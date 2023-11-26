import { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Pagination,
} from "@mui/material";
import {
  Container,
  ButtonContainer,
  EmployerContactContainer,
  H3,
  H1,
  Body,
  ButtonL,
} from "./index.styles";

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
      <H1>Adding a New Employer</H1>
      <Body>
        Input information about the Employer/HR Contact(s) of the employer.
      </Body>
      {employerData.map((lead) => (
        <EmployerContactContainer key={lead.id}>
          <H3>Employer Contact</H3>
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id="name"
            value={lead.name}
            onChange={(input) =>
              handleInputChange(input.target.value, lead.id, "name")
            }
            label="Name"
            helperText="*Required"
          />
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id="jobTitle"
            value={lead.jobTitle}
            onChange={(input) =>
              handleInputChange(input.target.value, lead.id, "jobTitle")
            }
            label="Job Title/Designation"
          />
          <TextField
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id="phoneMNumber"
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
            id="email"
            value={lead.email}
            onChange={(input) =>
              handleInputChange(input.target.value, lead.id, "email")
            }
            label="Email"
            helperText="*Required"
          />
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id="alternatePhoneNumber"
            value={lead.alternatePhoneNumber}
            onChange={(input) =>
              handleInputChange(
                input.target.value,
                lead.id,
                "alternatePhoneNumber",
              )
            }
            label="Alternate Phone Number"
          />
        </EmployerContactContainer>
      ))}
      <ButtonL onClick={handleAddContact}>+ Add Another Contact</ButtonL>
      <Stack spacing={2}>
        <Pagination
          count={3}
          shape="rounded"
          hidePrevButton
          hideNextButton
          onChange={(event, value) => handlePageChange(event, value)}
          page={2}
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
        <div style={{ display: "flex", gap: "16px" }}>
          <Button
            sx={{
              background: "var(--light-action-focus-12-p, rgba(0, 0, 0, 0.12))",
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
          <Button variant="contained" onClick={handleNextButtonClick}>
            NEXT
          </Button>
        </div>
      </ButtonContainer>
    </Container>
  );
}

export default AddEmployerInfo;
