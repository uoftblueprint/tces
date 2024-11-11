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
  Pagination,
} from "@mui/material";
import AddJobDetails from "./job-info-form";
import AddApplicationFields from "./application-form-fields";
import { Container, ButtonContainer } from "./index.styles";
import UserType from "../../prop-types/UserType";
import { createJobLeads } from "../../utils/api";
import ErrorScreenComponent from "../shared/error-screen-component";
import ConfirmDialog from "../shared/confirm-dialog-component";

// TODO: add selection functionality for pagination

function AddJobLead({
  jobPostData,
  updateJobPostData,
  setLocalExitRoute,
  currUser,
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
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
    setPage(page - 1);
    if (false) {
      setLocalExitRoute("/job-post/add");
    }
  };

  const handleNextButtonClick = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createJobLeads(
        jobPostData,
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
            Input information about the job posting you are adding.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "63%",
          }}
        >
          {/* TODO: MOVE THIS UP INTO OWN FUNCTION INSTEAD OF CONDITIONAL LOGIC HERE */}
          <form onSubmit={page === 1 ? handleNextButtonClick : confirmSubmit}>
            {page === 1 && (
              <AddJobDetails
                jobPostData={jobPostData.jobInfo}
                setJobPostData={(data) => updateJobPostData("jobInfo", data)}
              />
            )}

            {page === 2 && (
              <AddApplicationFields
                jobPostData={jobPostData.applicationFields}
                setJobPostData={(data) =>
                  updateJobPostData("applicationFields", data)
                }
              />
            )}

            <Pagination
              count={2}
              shape="rounded"
              hidePrevButton
              hideNextButton
              page={page}
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
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                {page === 2 && (
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
                    disableElevation
                  >
                    BACK
                  </Button>
                )}

                <Button
                  sx={{ justifySelf: "flex-end" }}
                  variant="outlined"
                  onClick={handleClickOpen}
                >
                  DISCARD
                </Button>
              </Box>
              <Dialog open={open} onClose={handleClose} maxWidth="xs">
                <DialogTitle>Are you sure you want to discard?</DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{color: "black"}}>
                    You will lose all your progress and return to the dashboard
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
                {page === 1 && (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    disableElevation
                  >
                    NEXT
                  </Button>
                )}

                {page === 2 && (
                  <>
                    <Button
                      type="submit"
                      variant="outlined"
                      disabled={isLoading}
                      style={{
                        background:
                          "var(--light-primary-shades-12-p, rgba(53, 104, 229, 0.12))",
                      }}
                    >
                      SAVE AS DRAFT
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      disableElevation
                    >
                      PUBLISH
                    </Button>
                  </>
                )}
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
  jobPostData: PropTypes.array.isRequired,
  updateJobPostData: PropTypes.func.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default AddJobLead;
