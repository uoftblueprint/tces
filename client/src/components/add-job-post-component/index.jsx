import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import JobLeadContent from "./jobLeadCard";
import { Container, ButtonContainer, ButtonL } from "./index.styles";
import UserType from "../../prop-types/UserType";
import { createJobLeads } from "../../utils/api";
import ErrorScreenComponent from "../shared/error-screen-component";
import ConfirmDialog from "../shared/confirm-dialog-component";

function AddJobLead({
  jobLeadData,
  setJobLeadData,
  setLocalExitRoute,
  currUser,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorObj, setErrorObj] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackButtonClick = () => {
    setLocalExitRoute("/job-leads/");
  };

  const handleAddJobLead = () => {
    const newId = jobLeadData.length;
    setJobLeadData([
      ...jobLeadData,
      {
        id: newId,
        employer: NaN,
        title: "",
        minCompensation: null,
        maxCompensation: null,
        hoursPerWeek: null,
        nationalOC: NaN,
        description: "",
        creationDate: dayjs(),
        expirationDate: dayjs().add(1, "month"),
        employmentType: NaN,
        numPositions: null,
      },
    ]);
  };

  const handleDeleteJobLead = (id) => {
    const filteredData = jobLeadData.filter((lead) => lead.id !== id);
    const updatedData = filteredData.map((lead, index) => ({
      ...lead,
      id: index,
    }));
    setJobLeadData(updatedData);
  };

  const handleInputChange = (input, id, field) => {
    const updatedJobLeads = jobLeadData.map((lead) =>
      lead.id === id ? { ...lead, [field]: input } : lead,
    );
    setJobLeadData(updatedJobLeads);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createJobLeads(
        jobLeadData,
        currUser.userID,
        currUser.userID,
      );

      if (response.ok) {
        navigate(-1);
      } else {
        setErrorObj(response);
      }
    } catch (error) {
      setErrorObj(error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSubmit = (e) => {
    e.preventDefault();
    setConfirmDialog(true);
  };

  const cancelSubmit = () => {
    setConfirmDialog(false);
  };

  if (errorObj) return <ErrorScreenComponent message={errorObj.message} />;

  return (
    <Container>
      <Stack direction="column" alignItems="center" spacing={4}>
        <Box
          sx={{
            width: "63%",
          }}
        >
          <Typography variant="h4" component="h1" textAlign="left">
            Adding a New Job Posting
          </Typography>
          <Typography variant="body1" textAlign="left" sx={{ mt: 2 }}>
            Input information about the job lead.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "63%",
          }}
        >
          <form onSubmit={confirmSubmit}>
            <JobLeadContent
              jobLeadData={jobLeadData}
              handleInputChange={handleInputChange}
              handleDeleteJobLead={handleDeleteJobLead}
            />

            <ButtonL
              onClick={(e) => {
                e.preventDefault();
                handleAddJobLead();
              }}
            >
              + Add Another Job Lead
            </ButtonL>
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
                    You will lose all your progress and return to the and return
                    to the job leads page.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>CANCEL</Button>
                  <Button
                    onClick={() => {
                      navigate(-1);
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
                <Button type="submit" variant="contained" disabled={isLoading}>
                  {isLoading ? "SUBMITTING..." : "SUBMIT"}
                </Button>
              </div>
            </ButtonContainer>
          </form>
        </Box>
      </Stack>
      <ConfirmDialog
        open={confirmDialog}
        title="Confirm Submit"
        message="Are you sure you want to submit these changes?"
        onConfirm={handleSubmit}
        onCancel={cancelSubmit}
      />
    </Container>
  );
}

AddJobLead.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobLeadData: PropTypes.array.isRequired,
  setJobLeadData: PropTypes.func.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default AddJobLead;
