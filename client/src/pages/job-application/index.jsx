import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import JobApplicationComponent from "../../components/job-application-component";
import { getOneJobPost } from "../../utils/job_posts_api";

function JobApplicationPage({ getApplicationById, setApplicationStatus }) {
  const { jobApplicationID } = useParams();
  return (
    <JobApplicationComponent
      jobApplicationID={jobApplicationID}
      getApplicationById={getApplicationById}
      setApplicationStatus={setApplicationStatus}
      getJobPostById={getOneJobPost}
    />
  );
}

JobApplicationPage.propTypes = {
  getApplicationById: PropTypes.func.isRequired,
  setApplicationStatus: PropTypes.func.isRequired,
};

export default JobApplicationPage;
