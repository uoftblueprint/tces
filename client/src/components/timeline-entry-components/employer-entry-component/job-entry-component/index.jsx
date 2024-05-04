import PropTypes from "prop-types";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CardComponent from "../../card-template-component";
/* eslint-disable jsx-a11y/anchor-is-valid */

function EmployerJobComponent({ ...entry }) {
  const linkStyle = {
    textDecoration: "none",
    color: "#3568E5",
  };

  const imageUrl =
    entry.type === "job_lead_add"
      ? "/img/timelineIconStar.svg"
      : "/img/timelineIconDelete.svg";

  return (
    <CardComponent
      title={entry.title}
      dateAdded={entry.dateAdded}
      body={
        <MuiLink
          component={RouterLink}
          to={`/job-leads/${entry.jobLead?.id}`}
          style={linkStyle}
        >
          {entry.jobLead?.job_title}
        </MuiLink>
      }
      imageUrl={imageUrl}
    />
  );
}

EmployerJobComponent.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dateAdded: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["job", "contact", "placement", "note"]).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    client: PropTypes.object, // not sure how to define this
    // eslint-disable-next-line react/forbid-prop-types
    jobLead: PropTypes.object, // same as above
    // eslint-disable-next-line react/forbid-prop-types
    employerContact: PropTypes.object, // same as above
    typeJob: PropTypes.oneOf(["add", "delete"]).isRequired,
  }).isRequired,
};

export default EmployerJobComponent;
