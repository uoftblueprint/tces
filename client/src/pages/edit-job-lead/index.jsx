import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../components/shared/error-screen-component";
import EditJobLeadComponent from "../../components/edit-job-lead-component";
import JobLeadType from "../../prop-types/JobLeadType";

function EditJobLead({
  managedJobLeads,
  getUserById,
  getEmployerById,
  setLocalExitRoute,
  setSnackBarMessage,
}) {
  const errorMessage = "Job lead to edit not found.";
  const { jobLeadID } = useParams();
  const parsedjobLeadID = parseInt(jobLeadID, 10);
  const jobLeadToEdit = managedJobLeads.find(
    (jobLead) => jobLead.jobLeadID === parsedjobLeadID,
  );

  if (!jobLeadToEdit) return <ErrorComponent message={errorMessage} />;
  return (
    <EditJobLeadComponent
      jobLead={jobLeadToEdit}
      getUserById={getUserById}
      getEmployerById={getEmployerById}
      setLocalExitRoute={setLocalExitRoute}
      setSnackBarMessage={setSnackBarMessage}
    />
  );
}

EditJobLead.propTypes = {
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  getUserById: PropTypes.func.isRequired,
  getEmployerById: PropTypes.func.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default EditJobLead;
