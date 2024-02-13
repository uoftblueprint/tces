import PropTypes from "prop-types";

const EmployerType = PropTypes.shape({
  employerID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  creatorID: PropTypes.number.isRequired,
  ownerID: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  secondaryAddress: PropTypes.string.isRequired,
  secondaryCity: PropTypes.string.isRequired,
  secondaryPostalCode: PropTypes.string.isRequired,
  secondaryProvince: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fax: PropTypes.string.isRequired,
  legalName: PropTypes.string.isRequired,
  naicsCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,

  // eslint-disable-next-line
});

export default EmployerType;
