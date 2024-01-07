import PropTypes from "prop-types";
import JobLeadDashboardComponent from "../../components/job-lead-dashboard-component";
import UserType from "../../prop-types/UserType";

function JobLeadDashboard({ managedJobLeads, setManagedJobLeads }) {
  return (
    <JobLeadDashboardComponent
      managedJobLeads={managedJobLeads}
      setManagedJobLeads={setManagedJobLeads}
    />
  );
}

JobLeadDashboard.propTypes = {
  managedJobLeads: PropTypes.arrayOf(UserType).isRequired,
  setManagedJobLeads: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboard;
