import PropTypes from "prop-types";

const EmployerType = PropTypes.shape({
  employerID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line
});

export default EmployerType;
