import PropTypes from "prop-types";
import CardComponent from "../../card-template-component";

function ClientUpdateComponent({ ...entry }) {
  const textStyle = {
    color: "#3568E5",
  };

  return (
    <CardComponent
      title={entry.title}
      dateAdded={entry.dateAdded}
      body={<span style={textStyle}>{entry.body}</span>}
      imageUrl="/img/timelineIconCheck.svg"
    />
  );
}

ClientUpdateComponent.propTypes = {
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
  }).isRequired,
};

export default ClientUpdateComponent;
