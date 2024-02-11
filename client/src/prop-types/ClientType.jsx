import PropTypes from "prop-types";

const ClientType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  ownerID: PropTypes.string.isRequired,
  creatorID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dateUpdated: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  statusAt3Months: PropTypes.string.isRequired,
  statusAt6Months: PropTypes.string.isRequired,
  statusAt9Months: PropTypes.string.isRequired,
  statusAt12Months: PropTypes.string.isRequired,
  statusAtExit: PropTypes.string.isRequired,
});

export default ClientType;
