import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ApplicantInformationCard from "./applicant-information-card";
import ApplicationDetailsCard from "./application-details-card";
import { MainContainer } from "./index.styles";

function JobApplicationComponent({
    jobApplicationID,
    getApplicationById,
    setApplicationStatus,
    getJobPostById,
}) {
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [jobPost, setJobPost] = useState(null);

    useEffect(() => {
      const fetchApplication = async () => {
        const result = await getApplicationById(jobApplicationID);
        setApplication(result.data);
      };
  
      fetchApplication();
    }, [jobApplicationID, getApplicationById]);

    useEffect(() => {
      if (application) {
        const fetchJobPost = async () => {
          const result = await getJobPostById(application.job_posting_id);
          setJobPost(result.jobPost);
        };
    
        fetchJobPost();
      }
    }, [application, getJobPostById]);

    if (!application || !jobPost) {
        return <div>Loading...</div>;
    }

    const setStatus = (newStatus) => {
        setApplicationStatus(jobApplicationID, newStatus);
    };

    return (
        <MainContainer style={{ display: "flex", flexDirection: "column"}}>
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
                <Typography variant="h4" component="div" sx={{ marginLeft: "10px" }}>
                Applicant: {application.name}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "98%",
                    justifyContent: "space-between",
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