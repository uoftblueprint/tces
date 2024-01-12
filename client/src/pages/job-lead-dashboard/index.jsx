import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import JobLeadDashboardComponent from "../../components/job-lead-dashboard-component";
import UserType from "../../prop-types/UserType";

function JobLeadDashboard({ managedJobLeads }) {
  const [processedManagedJobLeads, setProcessedManagedJobLeads] = useState([]);

  useEffect(() => {
    const processedJobLeads = managedJobLeads.map((jobLead) => ({
      ...jobLead,
      id: jobLead.jobLeadID,
    }));

    setProcessedManagedJobLeads(processedJobLeads);
  }, [managedJobLeads]);

  return (
    <JobLeadDashboardComponent managedJobLeads={processedManagedJobLeads} />
  );
}

JobLeadDashboard.propTypes = {
  managedJobLeads: PropTypes.arrayOf(UserType).isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboard;
