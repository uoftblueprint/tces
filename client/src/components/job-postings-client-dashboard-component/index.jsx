import { useState } from "react";
import JobPostingsClientDashboardTableComponent from "./job-postings-client-dashboard-table";
import JobPostingsClientDashboardHeader from "./job-postings-client-dashboard-header";

function JobPostingsClientDashboardComponent() {
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Function to update sorting state
  const handleSortChange = (sortConfig) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig?.key === sortConfig.key) {
        return {
          key: sortConfig.key,
          direction: prevSortConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: sortConfig.key, direction: sortConfig.direction };
    });
  };

  return (
    <div style={{ padding: "90px", paddingBottom: "72px", paddingTop: "24px" }}>
      <JobPostingsClientDashboardHeader
        onSortChange={handleSortChange}
        sortConfig={sortConfig}
        setSelectedJobType={setSelectedJobType}
        setSelectedLocation={setSelectedLocation}
      />

      <JobPostingsClientDashboardTableComponent
        sortConfig={sortConfig}
        selectedJobType={selectedJobType}
        selectedLocation={selectedLocation}
      />
    </div>
  );
}

export default JobPostingsClientDashboardComponent;
