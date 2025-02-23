import { useState, useRef} from "react";
import { useLocation,useNavigate } from "react-router-dom";
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
import dayjs from "dayjs";
import AddJobDetails from "./jobInfoForm";
import AddApplicationFields from "../add-job-post-component/application-form-fields";
import { Container, ButtonContainer } from "./index.styles";
import { modifyJobPost } from "../../utils/job_posts_api";
import PostingResultDialog from "../add-job-post-component/posting-result-dialog";


function EditJobPost({ updateJobPostData}) {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
  const [page, setPage] = useState(1);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [resultModalValues, setResultModalValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors,] = useState({});
  const initialJobData = location.state?.jobPostData || {
    jobInfo: {
      id: 0,
      title: "",
      employer: "",
      location: "",
      rate_of_pay_min: null,
      rate_of_pay_max: null,
      rate_of_pay_frequency: "",
      hours_per_week: null,
      creation_date: dayjs(),
      close_date: dayjs().add(1, "month"),
      job_type: [],
      job_description: "",
      state: "",
    },
    applicationFields: {
      custom_questions: [],
    },
    state: "",
  };

  const [jobPostData,] = useState(initialJobData);

  console.log("log",jobPostData)

  const SUCCESS_DRAFT = {
    isSuccess: true,
    message: "Your job posting was saved",
    handleClose: () => navigate("/all-job-postings"),
    buttonMessage: "CLOSE",
  };
  const ERROR_DRAFT = {
    isSuccess: false,
    message: "There was an error saving your draft",
    handleClose: () => setResultOpen(false),
    buttonMessage: "TRY AGAIN",
  };
  const SUCCESS_PUBLISH = {
    isSuccess: true,
    message: "Your job posting was published",
    handleClose: () => navigate("/job-postings"),
    buttonMessage: "CLOSE",
  };
  const ERROR_PUBLISH = {
    isSuccess: false,
    message: "There was an error publishing your job posting",
    handleClose: () => setResultOpen(false),
    buttonMessage: "TRY AGAIN",
  };


  const handleClickOpen = () => {
    setDiscardOpen(true);
  };

  const handleClose = () => {
    setDiscardOpen(false);
  };

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };


  const handleNextButtonClick = () => {
      setPage(page + 1);
  };

  const handleSubmit = async (e, postState) => {
    const DRAFT = "Draft";
    jobPostData.jobInfo.state = postState;
    const updatedJobPost = { ...jobPostData, state: postState };

    setIsLoading(true);
    try {
      const response = await modifyJobPost(
        updatedJobPost.jobInfo
      );
      if (response.status === "success") {
        setResultModalValues(
          postState === DRAFT ? SUCCESS_DRAFT : SUCCESS_PUBLISH,
        );
      } else {
        setResultModalValues(postState === DRAFT ? ERROR_DRAFT : ERROR_PUBLISH);
      }
    } catch (error) {
      setResultModalValues(postState === DRAFT ? ERROR_DRAFT : ERROR_PUBLISH);
    } finally {
      setResultOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <Container justifyContent="center" alignItems="center">
      <Stack
        direction="column"
        alignItems="center"
        spacing={4}
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            width: "63%",
          }}
        >
          <Typography variant="h4" component="h1" textAlign="left">
          {`Edit "${jobPostData.title}"`}
          </Typography>
          {page === 1 && (
            <Typography variant="body1" textAlign="left" sx={{ mt: 2 }}>
              Input information about the job posting you are editing.
            </Typography>
          )}

          {page === 2 && (
            <Typography variant="body1" textAlign="left" sx={{ mt: 2 }}>
              Confirm and update any additional information that applicants will
              need to submit in their application.
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: "64%",
          }}
        >
          <form ref={formRef}>
            {page === 1 && (
              <AddJobDetails
                jobPostData={jobPostData}
                setJobPostData={(data) => updateJobPostData("jobInfo", data)}
                errors={errors}
              />
            )}

            {page === 2 && (
              <AddApplicationFields
                applicationData={jobPostData.applicationInfo}
                setApplicationData={(data) =>
                  updateJobPostData("applicationInfo", data)
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
                {page > 1 && (
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
              <Box style={{ display: "flex", gap: "16px" }}>
                {page === 1 && (
                  <Button
                    variant="contained"
                    disabled={isLoading}
                    disableElevation
                    onClick={handleNextButtonClick}
                  >
                    NEXT
                  </Button>
                )}

                {page === 2 && (
                  <>
                    <Button
                      variant="outlined"
                      disabled={isLoading}
                      style={{
                        background:
                          "var(--light-primary-shades-12-p, rgba(53, 104, 229, 0.12))",
                      }}
                      onClick={() => handleSubmit(null, "Draft")}
                    >
                      SAVE AS DRAFT
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      disabled={isLoading}
                      disableElevation
                      onClick={() => handleSubmit(null, "Active")}
                    >
                      PUBLISH
                    </Button>
                  </>
                )}
              </Box>
            </ButtonContainer>
          </form>
        </Box>
      </Stack>

      {/* Discard Job Post Dialog */}
      <Dialog open={discardOpen} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Are you sure you want to discard?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "black" }}>
            You will lose all your progress and return to the dashboard
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
            autoFocus
          >
            YES, I&apos;M SURE
          </Button>
        </DialogActions>
      </Dialog>

      {/* Displays success/failure of submitting the job post */}
      <PostingResultDialog
        isOpen={resultOpen}
        isSuccess={resultModalValues.isSuccess}
        handleClose={resultModalValues.handleClose}
        message={resultModalValues.message}
        subMessage={resultModalValues.subMessage}
        buttonMessage={resultModalValues.buttonMessage}
      />
    </Container>
  );
}

EditJobPost.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  updateJobPostData: PropTypes.func.isRequired,
};

export default EditJobPost;