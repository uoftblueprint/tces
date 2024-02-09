import PropTypes from "prop-types";

const ContactType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.string,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  alternatePhoneNumber: PropTypes.string,
  // eslint-disable-next-line
});

export default ContactType;
