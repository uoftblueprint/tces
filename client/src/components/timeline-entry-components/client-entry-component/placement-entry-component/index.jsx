import PropTypes from "prop-types";
import CardComponent from "../../card-template-component";

function ClientPlacementComponent({ ...entry }) {
  const linkStyle = {
    textDecoration: 'none',
    color: '#3568E5'
  };
  
  return (
    <CardComponent
      title={entry.title}
      dateAdded={entry.dateAdded}
      body={
        <span>
          <a href="#" style={linkStyle} onClick={(e) => e.preventDefault()}>{entry.client.name}</a>
          {' was placed in '}
          <a href="#" style={linkStyle} onClick={(e) => e.preventDefault()}>{entry.jobLead.name}</a>
        </span>
      }
      imageUrl="/img/timelineIconCheck.svg"
    />
  );
}

ClientPlacementComponent.propTypes = {
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

export default ClientPlacementComponent;
