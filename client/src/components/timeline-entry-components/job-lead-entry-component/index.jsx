import PropTypes from "prop-types";
import JobLeadPlacementComponent from "./placement-entry-component";
import JobLeadNoteComponent from "./note-entry-component";

/* eslint-disable react/jsx-props-no-spreading */
function JobLeadEntryComponent({ entry }) {
  const { type, ...otherProps } = entry;

  const renderComponent = () => {
    switch (entry.type) {
      case "placement":
        return <JobLeadPlacementComponent {...otherProps} />;
      case "note":
        return <JobLeadNoteComponent {...otherProps} />;
      default:
        return <div>Unknown Entry Type</div>;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
      }}
    >
      {renderComponent()}
    </div>
  );
}

JobLeadEntryComponent.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dateAdded: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["placement", "note"]).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    client: PropTypes.object, // not sure how to define this
    // eslint-disable-next-line react/forbid-prop-types
    jobLead: PropTypes.object, // same as above
  }).isRequired,
};

export default JobLeadEntryComponent;
