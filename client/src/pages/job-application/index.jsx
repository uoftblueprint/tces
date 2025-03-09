import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import JobApplicationComponent from "../../components/job-application-component";

function JobApplicationPage({
  getApplicationById,
  setApplicationStatus,
  getJobPostById,
}) {
    const { jobApplicationID } = useParams();
  return (
    <JobApplicationComponent
      jobApplicationID={jobApplicationID}
      getApplicationById={getApplicationById}
      setApplicationStatus={setApplicationStatus}
      getJobPostById={getJobPostById} />
  );
}

JobApplicationPage.propTypes = {
  getApplicationById: PropTypes.func.isRequired,
  setApplicationStatus: PropTypes.func.isRequired,
  getJobPostById: PropTypes.func.isRequired,
};

export default JobApplicationPage;