import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import JobPostingsDashboardComponent from "../../components/job-postings-dashboard-component";
import JobLeadType from "../../prop-types/JobLeadType";

function JobPostingsDashboard({
  managedJobLeads,
  setManagedJobLeads,
  getUserById,
}) {
  const [processedManagedJobLeads, setProcessedManagedJobLeads] = useState([]);

  // scroll to the top on initialization
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const processedJobLeads = managedJobLeads.map((jobLead) => ({
      ...jobLead,
      id: jobLead.jobLeadID,
    }));

    setProcessedManagedJobLeads(processedJobLeads);
  }, [managedJobLeads]);

  return (
    <JobPostingsDashboardComponent
      managedJobLeads={processedManagedJobLeads}
      setManagedJobLeads={setManagedJobLeads}
      getUserById={getUserById}
    />
  );
}

JobPostingsDashboard.propTypes = {
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  setManagedJobLeads: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default JobPostingsDashboard;
