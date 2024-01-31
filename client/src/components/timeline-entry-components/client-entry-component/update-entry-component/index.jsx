import PropTypes from "prop-types";
import CardComponent from "../../card-template-component";

function ClientUpdateComponent({ ...entry }) {
  // const getUpdatedField = () => {
  //   switch (entry.updatedField) {
  //     case 'name':
  //       return entry.client.name;
  //     case 'email':
  //       return entry.client.email;
  //     case 'phone_number':
  //       return entry.client.phone_number;
  //     case 'status':
  //       // not sure what the statuses map to
  //   }
  // };

  const linkStyle = {
    textDecoration: 'none',
    color: '#3568E5'
  };

  return (
    <CardComponent
      title={entry.title}
      dateAdded={entry.dateAdded}
      body={<a href="#" style={linkStyle}>{getUpdatedField()}</a>}
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
    updatedField: PropTypes.string.isRequired,
  }).isRequired,
};

export default ClientUpdateComponent;
