import PropTypes from "prop-types";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink from react-router-dom
import CardComponent from "../../card-template-component";

function JobLeadPlacementComponent({ ...entry }) {
  const linkStyle = {
    textDecoration: "none",
    color: "#3568E5",
    margin: 0,
    padding: 0,
    minWidth: 0,
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

JobLeadPlacementComponent.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dateAdded: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["placement", "note"]).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    client: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    jobLead: PropTypes.shape({
      id: PropTypes.number,
      job_title: PropTypes.string,
    }),
  }).isRequired,
};

export default JobLeadPlacementComponent;
