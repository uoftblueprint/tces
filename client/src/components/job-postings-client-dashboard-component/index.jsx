import { useEffect } from "react";
import JobPostingsClientDashboardTableComponent from "./job-postings-client-dashboard-table";
import JobPostingsClientDashboardHeader from "./job-postings-client-dashboard-header";

function JobPostingsClientDashboardComponent() {
  // Scroll to the top on initialization
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: "90px", paddingBottom: "72px", paddingTop: "24px" }}>
      <JobPostingsClientDashboardHeader />

      <JobPostingsClientDashboardTableComponent />
    </div>
  );
}

export default JobPostingsClientDashboardComponent;
