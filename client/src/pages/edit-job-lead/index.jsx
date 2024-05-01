import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../components/shared/error-screen-component";
import EditJobLeadComponent from "../../components/edit-job-lead-component";
import JobLeadType from "../../prop-types/JobLeadType";
import UserType from "../../prop-types/UserType";
import ClientType from "../../prop-types/ClientType";

function EditJobLead({
  managedJobLeads,
  managedUsers,
  managedClients,
  getUserById,
  getEmployerById,
  setLocalExitRoute,
  setSnackBarMessage,
  setManagedClients,
  setManagedJobLeads,
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
      managedUsers={managedUsers}
      managedClients={managedClients}
      managedJobLeads={managedJobLeads}
      jobLead={jobLeadToEdit}
      getUserById={getUserById}
      getEmployerById={getEmployerById}
      setLocalExitRoute={setLocalExitRoute}
      setSnackBarMessage={setSnackBarMessage}
      setManagedJobLeads={setManagedJobLeads}
      setManagedClients={setManagedClients}
    />
  );
}

EditJobLead.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  getUserById: PropTypes.func.isRequired,
  getEmployerById: PropTypes.func.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  setManagedClients: PropTypes.func.isRequired,
  setManagedJobLeads: PropTypes.func.isRequired,
};

export default EditJobLead;
