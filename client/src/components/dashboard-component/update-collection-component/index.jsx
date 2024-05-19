import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import JobUpdateType from "../../../prop-types/JobUpdateType";
import { JobUpdatesContainer } from "./index.styles";
import EmployerEntryComponent from "../../timeline-entry-components/employer-entry-component";

function UpdatesCollection({
  jobUpdates,
  totalEntriesCount,
  loadMoreEntries,
  loading,
}) {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "65vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <JobUpdatesContainer>
      {jobUpdates.length > 0 ? (
        <>
          {jobUpdates.map((entry) => (
            <EmployerEntryComponent entry={entry} />
          ))}
          {totalEntriesCount > jobUpdates.length && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}
            >
              <Button
                onClick={loadMoreEntries}
                variant="contained"
                color="primary"
              >
                Load More
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <img
            src="/noJobleadUpdates.svg"
            alt="No Job Lead Updates"
            style={{ width: "400px", marginTop: "20px" }}
          />
        </Box>
      )}
    </JobUpdatesContainer>
  );
}

UpdatesCollection.propTypes = {
  jobUpdates: PropTypes.arrayOf(JobUpdateType).isRequired,
  totalEntriesCount: PropTypes.number.isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UpdatesCollection;
