import PropTypes from "prop-types";
import ClientDashboardComponent from "../../components/client-dashboard-component";
import JobLeadType from "../../prop-types/JobLeadType";

function ClientDashboard({ managedClients, setManagedClients, getUserById }) {
  return (
    <ClientDashboardComponent
      managedClients={managedClients}
      setManagedClients={setManagedClients}
      getUserById={getUserById}
    />
  );
}

ClientDashboard.propTypes = {
  managedClients: PropTypes.arrayOf(JobLeadType).isRequired,
  setManagedClients: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default ClientDashboard;
