import { useState } from 'react';
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Divider } from "../index.styles";
import BoxRowComponent from "../box-row-component";
import { formatDateStr } from "../../../utils/date";
import ApplicationStatusChipComponent from "../../shared/application-status-chips";

function ApplicationDetailsCard({ application, jobPost, setApplicationStatus }) {

  const jobTitle = useState(jobPost.title);
  const employerName = useState(jobPost.employer);
  const [dateApplied] = useState(formatDateStr(application.createdAt));
  const filename = useState(application.resume);
  const status = useState(application.application_status[0]);

  const statusOptions = [
    { value: "Contacted", color: "#00C0FF" },
    { value: "Rejected", color: "#FF0000" },
    { value: "R and I", color: "#808080" },
    { value: "Approved", color: "#02B500" },
    { value: "In Progress", color: "#FFC400" },
    { value: "New", color: "#800080" },
  ];

  return (
    <Card
      style={{
        width: "50%",
        borderRadius: 8,
        boxShadow: 3,
        border: "1px solid #e0e0e0",
      }}
      sx={{
        mr: 2,
        ml: 9,
      }}
    >
      <CardContent
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: 0,
          }}
        >
          Application details
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <BoxRowComponent
          leftSide="Title"
          rightSide={jobTitle}
          isFirst
        />
        <BoxRowComponent
          leftSide="Employer"
          rightSide={employerName}
        />
        <BoxRowComponent
          leftSide="Date applied"
          rightSide={dateApplied}
        />
        <BoxRowComponent
          leftSide="Resume"
          rightSide={filename}
          downloadable
        />
        <BoxRowComponent
          leftSide="Application status"
          setRightSide={setApplicationStatus}
          rightSide={<ApplicationStatusChipComponent status={status} />}
          editable
          options={statusOptions}
          isLast
        />
      </CardContent>
    </Card>
  );
}

ApplicationDetailsCard.propTypes = {
  application: PropTypes.shape({
    job_posting_id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired,
    application_status: PropTypes.string.isRequired,
  }).isRequired,
  jobPost: PropTypes.shape({
    title: PropTypes.string.isRequired,
    employer: PropTypes.string.isRequired,
  }).isRequired,
  setApplicationStatus: PropTypes.func.isRequired,
};

export default ApplicationDetailsCard;