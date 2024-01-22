import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useState } from "react";

import { Divider } from "../index.styles";

import BoxRowComponent from "../box-row-component";
import ContactType from "../../../prop-types/ContactType";

function ContactsInformationCard({ contacts }) {
  const [contactPage, setContactPage] = useState(1);

  const leftButtonClick = () => {
    if (contactPage > 1) {
      setContactPage(contactPage - 1);
    }
  };

  const rightButtonClick = () => {
    if (contactPage < contacts.length) {
      setContactPage(contactPage + 1);
    }
  };

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
          Contacts
        </Typography>
        <div className="iconContainer">
          <IconButton>
            <EditIcon
              sx={{
                color: "gray",
                cursor: "pointer",
                align: "center",
              }}
            />
          </IconButton>
          <IconButton>
            <AddIcon
              sx={{
                color: "gray",
                cursor: "pointer",
                align: "center",
              }}
            />
          </IconButton>
        </div>
      </CardContent>
      <Divider />
      {/* we will be setting up custom pagination for this */}
      <CardContent>
        <BoxRowComponent
          leftSide="Name"
          rightSide={contacts[0] ? contacts[contactPage - 1].name : ""}
        />
        <BoxRowComponent
          leftSide="Job Title"
          rightSide={contacts[0] ? contacts[contactPage - 1].jobTitle : ""}
        />
        <BoxRowComponent
          leftSide="Email"
          rightSide={
            <a
              href={`mailto:${contacts[0] ? contacts[contactPage - 1].email : ""}`}
            >{`${contacts[0] ? contacts[contactPage - 1].email : ""}`}</a>
          }
          copyable
        />
        <BoxRowComponent
          leftSide="Phone Number"
          rightSide={
            <a
              href={`tel:${contacts[0] ? contacts[contactPage - 1].phoneNumber : ""}`}
            >
              {contacts[0] ? contacts[contactPage - 1].phoneNumber : ""}
            </a>
          }
        />
        <BoxRowComponent
          leftSide="Alternative Phone Number"
          rightSide={
            <a
              href={`tel:${contacts[0] ? contacts[contactPage - 1].alternatePhoneNumber : ""}`}
            >
              {contacts[0] ? contacts[contactPage - 1].phoneNumber : ""}
            </a>
          }
        />
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div className="contactPageNumber" style={{ padding: 8 }}>
            {contactPage} of {contacts.length}
          </div>
          <IconButton onClick={leftButtonClick}>
            <ChevronLeftIcon
              sx={{
                color: "gray",
                cursor: "pointer",
                align: "center",
              }}
            />
          </IconButton>
          <IconButton onClick={rightButtonClick}>
            <ChevronRightIcon
              sx={{
                color: "gray",
                cursor: "pointer",
                align: "center",
              }}
            />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
}

ContactsInformationCard.propTypes = {
  contacts: ContactType.isRequired,
};

export default ContactsInformationCard;
