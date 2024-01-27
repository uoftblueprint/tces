import PropTypes from "prop-types";
import ClientUpdateComponent from "./update-entry-component";
import ClientContactComponent from "./contact-entry-component";
import ClientPlacementComponent from "./placement-entry-component";
import ClientNoteComponent from "./note-entry-component";

function ClientEntryComponent({ entry }) {
  const { type, ...otherProps } = entry;

  const renderComponent = () => {
    switch (entry.type) {
      case "update":
        return <ClientUpdateComponent {...otherProps} />;
      case "contact":
        return <ClientContactComponent {...otherProps} />;
      case "placement":
        return <ClientPlacementComponent {...otherProps} />;
      case "note":
        return <ClientNoteComponent {...otherProps} />;
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

ClientEntryComponent.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dateAdded: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["update", "contact", "placement", "note"])
      .isRequired,
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

export default ClientEntryComponent;
