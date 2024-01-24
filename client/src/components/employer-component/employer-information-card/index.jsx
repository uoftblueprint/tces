import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Divider } from "../index.styles";

import BoxRowComponent from "../box-row-component";

import EmployerType from "../../../prop-types/EmployerType";

function EmployerInformationCard({ employer }) {
  const [editable, setEditable] = useState(false);

  const [employerName, setEmployerName] = useState(employer.name);
  const [employerPhoneNumber, setEmployerPhoneNumber] = useState(
    employer.phone_number
  );
  const [employerFax, setEmployerFax] = useState(employer.fax);
  const [employerEmail, setEmployerEmail] = useState(employer.email);
  const [employerWebsite, setEmployerWebsite] = useState(employer.website);
  const [employerNAICSCode, setEmployerNAICSCode] = useState(
    employer.naics_code
  );
  const [employerAddress, setEmployerAddress] = useState(employer.address);

  // on initial startup, since useState() does not work on passed in props
  useEffect(() => {
    setEmployerName(employer.name);
    setEmployerPhoneNumber(employer.phone_number);
    setEmployerFax(employer.fax);
    setEmployerEmail(employer.email);
    setEmployerWebsite(employer.website);
    setEmployerNAICSCode(employer.naics_code);
    setEmployerAddress(employer.address);
  }, [employer]);

  useEffect(() => {
    setEditable(false);

    if (editable) {
      setEmployerName("bro");
      setEmployerPhoneNumber("test");
    }
  }, []);

  if (editable) {
    return "Hello World";
  }

  return (
    <Card
      style={{
        width: "33%",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" align="left" gutterBottom>
          Information
        </Typography>
        <IconButton>
          <EditIcon
            sx={{
              color: "gray",
              cursor: "pointer",
              align: "center",
            }}
          />
        </IconButton>
      </CardContent>
      <Divider />
      <CardContent>
        {console.warn(employer.name)}
        <BoxRowComponent leftSide="Name" rightSide={employerName} />
        <BoxRowComponent
          leftSide="Phone Number"
          rightSide={
            employerPhoneNumber ? (
              <a href={`tel:${employerPhoneNumber}`}>{employerPhoneNumber}</a>
            ) : (
              ""
            )
          }
        />
        <BoxRowComponent
          leftSide="Fax"
          rightSide={
            employer.fax ? <a href={`tel:${employerFax}`}>{employerFax}</a> : ""
          }
        />
        <BoxRowComponent
          leftSide="Email"
          rightSide={
            employer.email ? (
              <a href={`mailto:${employerEmail}`}>{employerEmail}</a>
            ) : (
              ""
            )
          }
          copyable
        />
        <BoxRowComponent
          leftSide="Website"
          rightSide={
            employer.website ? (
              <a href={employerWebsite}>{employerWebsite}</a>
            ) : (
              ""
            )
          }
        />
        <BoxRowComponent leftSide="NAICS Code" rightSide={employerNAICSCode} />
        <BoxRowComponent leftSide="Address" rightSide={employerAddress} />
      </CardContent>
    </Card>
  );
}

EmployerInformationCard.propTypes = {
  employer: EmployerType.isRequired,
};

export default EmployerInformationCard;
