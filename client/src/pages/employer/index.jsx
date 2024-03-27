import PropTypes from "prop-types";
import UserType from "../../prop-types/UserType";
import EmployerComponent from "../../components/employer-component";
import ClientType from "../../prop-types/ClientType";
import JobLeadType from "../../prop-types/JobLeadType";
import EmployerType from "../../prop-types/EmployerType";

function EmployerPage({
  getUserById,
  managedUsers,
  setSnackBarMessage,
  managedClients,
  managedEmployers,
  managedJobLeads,
}) {
  return (
    <EmployerComponent
      getUserById={getUserById}
      managedUsers={managedUsers}
      managedJobLeads={managedJobLeads}
      managedClients={managedClients}
      managedEmployers={managedEmployers}
      setSnackBarMessage={setSnackBarMessage}
    />
  );
}

EmployerPage.propTypes = {
  getUserById: PropTypes.func.isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  managedEmployers: PropTypes.arrayOf(EmployerType).isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default EmployerPage;
