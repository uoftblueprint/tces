import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Divider } from "../index.styles";

import BoxRowComponent from "../box-row-component";

function ApplicantInformationCard({ application }) {

  const [applicationName] = useState(application.name);
  const [applicationEmail] = useState(application.email);
  const [applicationPhoneNumber] = useState(application.phone);
  const [applicationPostalCode] = useState(application.postal_code);
  const [applicationStatus] = useState(application.status_in_canada);

  const emailWrapper = (email) => {
    return <a href={`mailto:${email}`}>{email}</a>;
  };

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
          Applicant Information
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <BoxRowComponent
            leftSide="Name"
            rightSide={applicationName}
          />
          <BoxRowComponent
            leftSide="Email"
            rightSideWrapper={emailWrapper}
            rightSide={applicationEmail}
          />
          <BoxRowComponent
            leftSide="Phone Number"
            rightSide={applicationPhoneNumber}
            isPhoneNumber
          />
          <BoxRowComponent
            leftSide="Postal Code"
            rightSide={applicationPostalCode}
          />
          <BoxRowComponent
            leftSide="Status"
            rightSide={applicationStatus}
          />
      </CardContent>
    </Card>
  );
}

ApplicantInformationCard.propTypes = {
  application: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    postal_code: PropTypes.string.isRequired,
    status_in_canada: PropTypes.string.isRequired,
  }).isRequired,
};

export default ApplicantInformationCard;
