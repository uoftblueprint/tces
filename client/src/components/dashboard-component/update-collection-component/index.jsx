import PropTypes from "prop-types";
import { Box } from "@mui/material";
import JobUpdateType from "../../../prop-types/JobUpdateType";
import { JobUpdatesContainer, UpdateDivider } from "./index.styles";
import JobUpdateCardComponent from "../update-card-component";

function UpdatesCollection({ jobUpdates }) {
  return (
    <JobUpdatesContainer>
      {jobUpdates.length > 0 ? (
        jobUpdates.map((update) => (
          <>
            <JobUpdateCardComponent
              action={update.action}
              adminName={update.adminName}
              userName={update.userName}
              companyName={update.companyName}
              date={update.date}
            />
            <UpdateDivider />
          </>
        ))
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
};

export default UpdatesCollection;
