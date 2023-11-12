import PropTypes from "prop-types";

const UserType = PropTypes.shape({
  userID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // eslint-disable-next-line
});

export default UserType;
