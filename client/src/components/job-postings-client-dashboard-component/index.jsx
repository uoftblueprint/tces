import { useEffect, useState } from "react";
import JobPostingsClientDashboardTableComponent from "./job-postings-client-dashboard-table";
import JobPostingsClientDashboardHeader from "./job-postings-client-dashboard-header";

function JobPostingsClientDashboardComponent() {
  // Scroll to the top on initialization
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sorting state: key = column name, direction = "asc" or "desc"
  const [sortConfig, setSortConfig] = useState(null);

    // Function to update sorting state
  const handleSortChange = (sortConfig) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig?.key === sortConfig.key) {
        return { key: sortConfig.key, direction: prevSortConfig.direction === "asc" ? "desc" : "asc" };
      }
      return { key: sortConfig.key, direction: sortConfig.direction };
    });
  };


  return (
    <div style={{ padding: "90px", paddingBottom: "72px", paddingTop: "24px" }}>
      <JobPostingsClientDashboardHeader onSortChange={handleSortChange} sortConfig={sortConfig} />
      <JobPostingsClientDashboardTableComponent sortConfig={sortConfig} />
    </div>
  );
}

export default JobPostingsClientDashboardComponent;
