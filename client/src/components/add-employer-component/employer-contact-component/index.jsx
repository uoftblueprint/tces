import React, { useState, useEffect } from "react";
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
import AddCompanyInfo from "../company-info-component";
import AddEmployerJobLead from "../job-lead-component";

function AddEmployerInfo() {
  const [open, setOpen] = React.useState(false);
  const [showAddCompanyInfo, setShowAddCompanyInfo] = useState(false);
  const [showAddEmployerJobLead, setShowAddEmployerJobLead] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackButtonClick = () => {
    setShowAddCompanyInfo(true);
  };

  const handleNextButtonClick = () => {
    setShowAddEmployerJobLead(true);
  };

  // Initialize state from local storage or use default if not present
  const initialContacts = () =>
    JSON.parse(localStorage.getItem("contacts")) || [
      {
        id: 0,
        name: "",
        jobTitle: "",
        phoneNumber: "",
        email: "",
        alternatePhoneNumber: "",
      },
    ];

  const [contacts, setContacts] = useState(initialContacts);

  useEffect(() => {
    // Save state to local storage whenever it changes
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = () => {
    const newId = contacts.length + 1;
    setContacts((prevContacts) => [
      ...prevContacts,
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
    // Clear local storage
    localStorage.removeItem("contacts");

    // Reset the inputs to initial values
    setContacts(initialContacts());
  };

  const handleInputChange = (e, id, field) => {
    const newContacts = [...contacts];
    const index = newContacts.findIndex((lead) => lead.id === id);
    if (index !== -1) {
      newContacts[index][field] = e;
      setContacts(newContacts);
    } else {
      console.error(`Invalid id: ${id}`);
    }
  };

  return (
    <>
      {showAddCompanyInfo && <AddCompanyInfo />}
      {showAddEmployerJobLead && <AddEmployerJobLead />}
      {!showAddCompanyInfo && !showAddEmployerJobLead && (
        <Container>
          <H1>Adding a New Employer</H1>
          <Body>
            Input information about the Employer/HR Contact(s) of the employer.
          </Body>
          {contacts.map((lead) => (
            <EmployerContactContainer key={lead.id}>
              <H3>Employer Contact</H3>
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="name"
                value={lead.name}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "name")
                }
                label="Name"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="jobTitle"
                value={lead.jobTitle}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "jobTitle")
                }
                label="Job Title/Designation"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="phoneMNumber"
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
                id="email"
                value={lead.email}
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "email")
                }
                label="Email"
                helperText="*Required"
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="alternatePhoneNumber"
                value={lead.alternatePhoneNumber}
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
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
              <Button variant="contained" onClick={handleNextButtonClick}>
                NEXT
              </Button>
            </div>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
}

export default AddEmployerInfo;
