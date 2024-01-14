import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import JobLeadDashboardComponent from "../../components/job-lead-dashboard-component";
import JobLeadType from "../../prop-types/JobLeadType";

function JobLeadDashboard({
  managedJobLeads,
  setManagedJobLeads,
  getUserById,
}) {
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
      setManagedJobLeads={setManagedJobLeads}
      getUserById={getUserById}
    />
  );
}

JobLeadDashboard.propTypes = {
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  setManagedJobLeads: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboard;
