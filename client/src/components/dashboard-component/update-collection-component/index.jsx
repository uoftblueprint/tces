import PropTypes from "prop-types";
import { JobUpdatesContainer, UpdateDivider } from "./index.styles";
import JobUpdateCardComponent from "../update-card-component";

function UpdatesCollection({ jobUpdates }) {
  return (
    <JobUpdatesContainer>
      {jobUpdates.map((update) => (
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
      ))}
    </JobUpdatesContainer>
  );
}

UpdatesCollection.propTypes = {
  jobUpdates: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string.isRequired,
      adminName: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      // eslint-disable-next-line
    })
  ).isRequired,
};

export default UpdatesCollection;
