import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import JobLeadContent from "./jobLeadCard";
import { Container, ButtonContainer, H1, Body, ButtonL } from "./index.styles";

function AddJobLead({ jobLeadData, setJobLeadData, resetInitialState }) {
  AddJobLead.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    jobLeadData: PropTypes.array.isRequired,
    setJobLeadData: PropTypes.func.isRequired,
    resetInitialState: PropTypes.func.isRequired,
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackButtonClick = () => {
    // tbd
  };

  const handleAddJobLead = () => {
    const newId = jobLeadData.length;
    setJobLeadData([
      ...jobLeadData,
      {
        id: newId,
        employer: "",
        title: "",
        minCompensation: "",
        maxCompensation: "",
        hoursPerWeek: "",
        nationalOC: "",
        description: "",
        creationDate: null,
        expirationDate: null,
        employmentType: "",
        numPositions: "",
      },
    ]);
  };

  const handleInputChange = (input, id, field) => {
    const updatedJobLeads = jobLeadData.map((lead) =>
      lead.id === id ? { ...lead, [field]: input } : lead,
    );
    setJobLeadData(updatedJobLeads);
  };

  const handleResetInputs = () => {
    resetInitialState();
  };

  return (
    <Container>
      <H1>Adding a Job Lead</H1>
      <Body>Input information about the job lead.</Body>
      <JobLeadContent
        jobLeadData={jobLeadData}
        handleInputChange={handleInputChange}
      />
      <ButtonL onClick={handleAddJobLead}>+ Add Another Job Lead</ButtonL>
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
          <Button variant="contained">SUBMIT</Button>
        </div>
      </ButtonContainer>
    </Container>
  );
}

export default AddJobLead;
