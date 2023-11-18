import PropTypes from "prop-types";

const UserType = PropTypes.shape({
  userID: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  // eslint-disable-next-line
});

export default UserType;
