import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../components/shared/error-screen-component";
import EditJobLeadComponent from "../../components/edit-job-lead-component";
import JobLeadType from "../../prop-types/JobLeadType";

function EditJobLead({ managedJobLeads, getUserById }) {
  const errorMessage = "Job lead to edit not found.";
  const { jobLeadID } = useParams();
  const parsedjobLeadID = parseInt(jobLeadID, 10);
  const jobLeadToEdit = managedJobLeads.find(
    (jobLead) => jobLead.jobLeadID === parsedjobLeadID,
  );

  if (!jobLeadToEdit) return <ErrorComponent message={errorMessage} />;
  return (
    <EditJobLeadComponent jobLead={jobLeadToEdit} getUserById={getUserById} />
  );
}

EditJobLead.propTypes = {
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  getUserById: PropTypes.func.isRequired,
};

export default EditJobLead;
