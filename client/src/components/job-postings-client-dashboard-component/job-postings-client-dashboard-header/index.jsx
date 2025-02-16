import JobTypeMenu from "../../shared/job-posts-job-type-menu-component";
import SortMenu from "../../shared/job-posts-sort-menu-component"
import LocationMenu from "../../shared/job-posts-location-menu-component"


// Dummy Data
function applySort(selectedValue) {
    console.log(`Sorting by: ${selectedValue}`);
}

const locations = [
    { value: 'new-york', label: 'New York' },
    { value: 'san-francisco', label: 'San Francisco' },
    { value: 'los-angeles', label: 'Los Angeles' },
];


function JobPostingsClientDashboardHeader() {

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
