import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import JobTypeMenu from "../../shared/job-posts-job-type-menu-component";
import SortMenu from "../../shared/job-posts-sort-menu-component";
import LocationMenu from "../../shared/job-posts-location-menu-component";
import { getAllLocations } from "../../../utils/job_posts_api";

function JobPostingsClientDashboardHeader({
  onSortChange,
  sortConfig,
  setSelectedJobType,
  setSelectedLocation,
}) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getAllLocations();
      const uniqueLocations = await response.json();
      setLocations(uniqueLocations.data);
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
          {/* SortMenu now updates sorting state in the parent */}
          <SortMenu applySort={onSortChange} currentSort={sortConfig} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Pass filtering handlers to JobTypeMenu & LocationMenu */}
          <JobTypeMenu onSelectJobType={setSelectedJobType} />
          <LocationMenu
            locations={locations}
            onSelectLocation={setSelectedLocation}
          />
        </div>
      </div>
    </>
  );
}

JobPostingsClientDashboardHeader.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["asc", "desc"]).isRequired,
  }).isRequired,
  setSelectedJobType: PropTypes.func.isRequired,
  setSelectedLocation: PropTypes.func.isRequired,
};

export default JobPostingsClientDashboardHeader;
