import { useState, useEffect } from "react";
import JobPostingsClientDashboardTableComponent from "./job-postings-client-dashboard-table";
import JobPostingsClientDashboardHeader from "./job-postings-client-dashboard-header";

function JobPostingsClientDashboardComponent() {
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1); // Stores total number of pages

  // Function to update sorting state
  const handleSortChange = (newSortConfig) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig?.key === newSortConfig.key) {
        return {
          key: newSortConfig.key,
          direction: prevSortConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: newSortConfig.key, direction: newSortConfig.direction };
    });
  };

  // Function to reset sort, job type and location filters
  const handleReset = () => {
    setSortConfig(null);
    setSelectedJobType(null);
    setSelectedLocation(null);
  };

  // Pass this flag for reset button in job postings header component
  const canReset =
    (!sortConfig || sortConfig?.direction === "desc") &&
    !selectedJobType &&
    !selectedLocation;

  // Fetch job postings whenever filters or sorting change
  useEffect(() => {
    const fetchActiveJobPostings = async () => {
      try {
        const params = new URLSearchParams();

        // Apply sorting
        if (sortConfig?.key === "close_date") {
          params.append(
            "order",
            sortConfig.direction === "asc" ? "ascending" : "descending",
          );
        }

        // Apply filters
        if (selectedLocation) {
          params.append("location", selectedLocation);
        }
        if (selectedJobType) {
          params.append("job_type", selectedJobType);
        }

        // Apply pagination
        params.append("page", currentPage);
        params.append("pageSize", rowsPerPage);

        const response = await fetch(
          `${
            process.env.REACT_APP_API_BASE_URL
          }/job_postings/active?${params.toString()}`,
        );

        const activeJobPostings = await response.json();

        if (activeJobPostings.status === "success") {
          setJobPostings(activeJobPostings.publicJobPosts.data);
          setTotalPages(activeJobPostings.publicJobPosts.totalPages); // Update total pages
        } else {
          // eslint-disable-next-line
          console.error(
            "Failed to fetch job postings:",
            activeJobPostings.message,
          );
        }
      } catch (error) {
        // eslint-disable-next-line
        console.error("Error fetching active job postings:", error);
      }
    };

    fetchActiveJobPostings();
  }, [sortConfig, selectedJobType, selectedLocation, currentPage, rowsPerPage]);

  return (
    <div style={{ padding: "90px", paddingBottom: "72px", paddingTop: "24px" }}>
      <JobPostingsClientDashboardHeader
        onSortChange={handleSortChange}
        sortConfig={sortConfig}
        setSelectedJobType={setSelectedJobType}
        setSelectedLocation={setSelectedLocation}
        handleReset={handleReset}
        canReset={canReset}
      />

      <JobPostingsClientDashboardTableComponent
        sortConfig={sortConfig}
        selectedJobType={selectedJobType}
        selectedLocation={selectedLocation}
        jobPostings={jobPostings}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default JobPostingsClientDashboardComponent;
