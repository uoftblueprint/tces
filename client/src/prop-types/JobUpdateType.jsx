import PropTypes from "prop-types";

const JobUpdateType = PropTypes.shape({
  action: PropTypes.string.isRequired,
  adminName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  // eslint-disable-next-line
});

export default JobUpdateType;
