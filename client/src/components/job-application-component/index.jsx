import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ApplicantInformationCard from "./applicant-information-card";
import ApplicationDetailsCard from "./application-details-card";
import { MainContainer } from "./index.styles";
import ErrorScreenComponent from "../shared/error-screen-component";

function JobApplicationComponent({
  jobApplicationID,
  getApplicationById,
  setApplicationStatus,
  getJobPostById,
}) {
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [jobPost, setJobPost] = useState(null);
  const [errorOb, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const result = await getApplicationById(jobApplicationID);
        if (result.ok) {
          const { data } = await result.json();
          setApplication(data);
        } else {
          setError(result.text());
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchApplication();
  }, [jobApplicationID, getApplicationById]);

  useEffect(() => {
    // TODO: See if we can improve error handling here
    if (application) {
      const fetchJobPost = async () => {
        try {
          const result = await getJobPostById(application.job_posting_id);
          if (result.ok) {
            const data = await result.json();
            setJobPost(data.jobPost);
          }
        } catch (error) {
          setError(error);
        }
      };

      fetchJobPost();
    }
  }, [application, getJobPostById]);

  if (errorOb) return <ErrorScreenComponent />;

  if (!application || !jobPost) {
    return <div>Loading...</div>;
  }

  const setStatus = (newStatus) => {
    setApplicationStatus(jobApplicationID, newStatus);
  };

  return (
    <MainContainer style={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <IconButton onClick={() => navigate("/job-applications")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="div"
          sx={{ marginLeft: "10px", fontWeight: "bold" }}
        >
          Applicant: {application.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "98%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ApplicantInformationCard application={application} />
        <ApplicationDetailsCard
          application={application}
          jobPost={jobPost}
          setApplicationStatus={setStatus}
        />
      </Box>
    </MainContainer>
  );
}

JobApplicationComponent.propTypes = {
  jobApplicationID: PropTypes.string.isRequired,
  getApplicationById: PropTypes.func.isRequired,
  setApplicationStatus: PropTypes.func.isRequired,
  getJobPostById: PropTypes.func.isRequired,
};

export default JobApplicationComponent;
