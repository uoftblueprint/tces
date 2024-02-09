import PropTypes from "prop-types";

const EmployerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  owner: PropTypes.number.isRequired,
  creator: PropTypes.number.isRequired,
  date_added: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  legal_name: PropTypes.string,
  phone_number: PropTypes.string,
  fax: PropTypes.string,
  website: PropTypes.string,
  naics_code: PropTypes.number,
  address: PropTypes.string,
  city: PropTypes.string,
  province: PropTypes.string,
  postal_code: PropTypes.string,
  secondary_address: PropTypes.string,
  secondary_city: PropTypes.string,
  secondary_province: PropTypes.string,
  secondary_postal_code: PropTypes.string,
  // eslint-disable-next-line
});

export default EmployerType;
