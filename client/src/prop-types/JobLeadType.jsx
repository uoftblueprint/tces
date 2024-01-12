import PropTypes from "prop-types";

const JobLeadType = PropTypes.shape({
  jobLeadID: PropTypes.number.isRequired,
  jobTitle: PropTypes.string.isRequired,
  jobDescription: PropTypes.string.isRequired,
  compensationMax: PropTypes.number.isRequired,
  compensationMin: PropTypes.number.isRequired,
  hoursPerWeek: PropTypes.number.isRequired,
  noc: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
  employmentType: PropTypes.string.isRequired,
  numOfPostions: PropTypes.number.isRequired,
  // eslint-disable-next-line
});

export default JobLeadType;
