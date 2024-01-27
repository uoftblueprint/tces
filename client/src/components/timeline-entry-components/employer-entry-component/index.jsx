import PropTypes from "prop-types";
import EmployerJobComponent from "./job-entry-component";
import EmployerContactComponent from "./contact-entry-component";
import EmployerPlacementComponent from "./placement-entry-component";
import EmployerNoteComponent from "./note-entry-component";

/* eslint-disable react/jsx-props-no-spreading */
function EmployerEntryComponent({ entry }) {
  const { type, ...otherProps } = entry;

  const renderComponent = () => {
    switch (entry.type) {
      case "job":
        return <EmployerJobComponent {...otherProps} />;
      case "contact":
        return <EmployerContactComponent {...otherProps} />;
      case "placement":
        return <EmployerPlacementComponent {...otherProps} />;
      case "note":
        return <EmployerNoteComponent {...otherProps} />;
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
        height: "100vh",
      }}
    >
      {renderComponent()}
    </div>
  );
}

EmployerEntryComponent.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dateAdded: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["job", "contact", "placement", "note"]).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    client: PropTypes.object, // not sure how to define this
    // eslint-disable-next-line react/forbid-prop-types
    jobLead: PropTypes.object, // same as above
    // eslint-disable-next-line react/forbid-prop-types
    employerContact: PropTypes.object, // same as above
  }).isRequired,
};

export default EmployerEntryComponent;
