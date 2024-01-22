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
            employer.fax ? (
              <a href={`tel:${employer.fax}`}>{employer.fax}</a>
            ) : (
              ""
            )
          }
        />
        <BoxRowComponent
          leftSide="Email"
          rightSide={
            employer.email ? (
              <a href={`mailto:${employer.email}`}>{employer.email}</a>
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
              <a href={employer.website}>{employer.website}</a>
            ) : (
              ""
            )
          }
        />
        <BoxRowComponent
          leftSide="NAICS Code"
          rightSide={employer.naics_code ? employer.naics_code : ""}
        />
        <BoxRowComponent
          leftSide="Address"
          rightSide={employer.address ? employer.address : ""}
        />
      </CardContent>
    </Card>
  );
}

EmployerInformationCard.propTypes = {
  employer: EmployerType.isRequired,
};

export default EmployerInformationCard;
