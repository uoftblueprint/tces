import PropTypes from "prop-types";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CardComponent from "../../card-template-component";

/* eslint-disable jsx-a11y/anchor-is-valid */

function EmployerPlacementComponent({ ...entry }) {
  const linkStyle = {
    textDecoration: "none",
    color: "#3568E5",
  };

  return (
    <CardComponent
      title={entry.title}
      dateAdded={entry.dateAdded}
      body={
        <span>
          <MuiLink
            component={RouterLink}
            to={`/clients/${entry.client?.id}`}
            style={linkStyle}
          >
            {entry.client?.name}
          </MuiLink>
          {" was placed in "}
          <MuiLink
            component={RouterLink}
            to={`/job-leads/${entry.jobLead?.id}`}
            style={linkStyle}
          >
            {entry.jobLead?.job_title}
          </MuiLink>
        </span>
      }
      imageUrl="/img/timelineIconCheck.svg"
    />
  );
}

EmployerPlacementComponent.propTypes = {
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
  }).isRequired,
};

export default EmployerPlacementComponent;
