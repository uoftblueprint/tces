import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import JobLeadDashboardComponent from "../../components/job-lead-dashboard-component";
import UserType from "../../prop-types/UserType";
import JobLeadType from "../../prop-types/JobLeadType";

function JobLeadDashboard({ managedJobLeads, managedUsers }) {
  const [processedManagedJobLeads, setProcessedManagedJobLeads] = useState([]);

  useEffect(() => {
    const processedJobLeads = managedJobLeads.map((jobLead) => ({
      ...jobLead,
      id: jobLead.jobLeadID,
    }));

    setProcessedManagedJobLeads(processedJobLeads);
  }, [managedJobLeads]);

  return (
    <JobLeadDashboardComponent
      managedJobLeads={processedManagedJobLeads}
      managedUsers={managedUsers}
    />
  );
}

JobLeadDashboard.propTypes = {
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboard;
