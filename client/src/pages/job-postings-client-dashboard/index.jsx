import { useEffect } from "react";
import JobPostingsClientDashboardComponent from "../../components/job-postings-client-dashboard-component";

function JobPostingsClientDashboard() {
  // Scroll to the top on initialization
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <JobPostingsClientDashboardComponent />;
}

export default JobPostingsClientDashboard;
