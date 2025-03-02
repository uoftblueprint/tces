import { useEffect, useState } from "react";
import JobTypeMenu from "../../shared/job-posts-job-type-menu-component";
import SortMenu from "../../shared/job-posts-sort-menu-component";
import LocationMenu from "../../shared/job-posts-location-menu-component";
import { getAllActiveJobPosts } from "../../../utils/job_posts_api";

function applySort(selectedValue) {
  console.log(`Sorting by: ${selectedValue}`);
}

const getAllUniqueLocations = async (queryParams = "") => {
  try {
    const response = await getAllActiveJobPosts(queryParams);

    if (!response.ok) {
      throw new Error("Failed to fetch job postings");
    }

    const jobPosts = await response.json();

    console.log(jobPosts);

    // Extract unique locations
    const uniqueLocations = [
      ...new Set(jobPosts.publicJobPosts.data.map((job) => job.location)),
    ];

    // Format locations for dropdown
    return uniqueLocations.map((location) => ({
      value: location.toLowerCase().replace(/\s+/g, "-"),
      label: location,
    }));
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

function JobPostingsClientDashboardHeader() {
  const [locations, setLocations] = useState([]);

  // const handleLocationSelect = (location) => {
  //     setSelectedLocation(location);
  //     refetchLocations(location);
  // };

  useEffect(() => {
    const fetchLocations = async () => {
      const uniqueLocations = await getAllUniqueLocations();
      setLocations(uniqueLocations);
    };

    fetchLocations();
  }, []);

  return (
    <>
      <h1 style={{ fontSize: "48px", fontWeight: "600", marginBottom: "48px" }}>
        Current Open Positions
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ marginRight: "auto" }}>
          <SortMenu applySort={applySort} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <JobTypeMenu />
          <LocationMenu locations={locations} />
        </div>
      </div>
    </>
  );
}

export default JobPostingsClientDashboardHeader;
