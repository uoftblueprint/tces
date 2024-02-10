import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import {
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
import dayjs from "dayjs";
import JobLeadContent from "../../add-job-lead-component/jobLeadCard";
import { Container, ButtonContainer, ButtonL } from "./index.styles";

function AddEmployerJobLead({
  onPageChange,
  employerData,
  setEmployerData,
  resetInitialState,
  onSubmit,
  isLoading,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleBackButtonClick = () => {
    onPageChange(2);
  };

  const handleAddJobLead = () => {
    const newId = employerData.length;
    setEmployerData([
      ...employerData,
      {
        id: newId,
        title: "",
        minCompensation: NaN,
        maxCompensation: NaN,
        hoursPerWeek: NaN,
        nationalOC: NaN,
        description: "",
        creationDate: dayjs(),
        expirationDate: dayjs().add(1, "month"),
        employmentType: NaN,
        numPositions: NaN,
      },
    ]);
  };

  const handleInputChange = (input, id, field) => {
    const updatedJobLeads = employerData.map((lead) =>
      lead.id === id ? { ...lead, [field]: input } : lead,
    );
    setEmployerData(updatedJobLeads);
  };

  const handleResetInputs = () => {
    resetInitialState();
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
          <form onSubmit={handleSubmitButtonClick}>
            <JobLeadContent
              jobLeadData={employerData}
              handleInputChange={handleInputChange}
              isAddEmployer
            />
            <ButtonL onClick={handleAddJobLead}>+ Add Another Job Lead</ButtonL>
            <Pagination
              count={3}
              shape="rounded"
              hidePrevButton
              hideNextButton
              page={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 2,
                "& .MuiPaginationItem-root": {
                  color: "#3568E5",
                  pointerEvents: "none",
                },
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
                <Button type="submit" variant="contained" disabled={isLoading}>
                  {isLoading ? "SUBMITTING..." : "SUBMIT"}
                </Button>
              </div>
            </ButtonContainer>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}

AddEmployerJobLead.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  employerData: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setEmployerData: PropTypes.func.isRequired,
  resetInitialState: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddEmployerJobLead;
