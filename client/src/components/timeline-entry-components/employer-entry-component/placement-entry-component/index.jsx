import PropTypes from "prop-types";
import CardComponent from "../../card-template-component";

function EmployerPlacementComponent({ ...props }) {
  return (
    <CardComponent
      title={props.title}
      dateAdded={props.dateAdded}
      body={props.body}
      imageUrl="/img/timelineIconCheck.svg"
    />
  );
}

EmployerPlacementComponent.propTypes = {
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

export default EmployerPlacementComponent;
