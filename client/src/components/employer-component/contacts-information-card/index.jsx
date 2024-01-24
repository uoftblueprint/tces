import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useEffect, useState } from "react";

// import PropTypes from "prop-types";
import { Divider } from "../index.styles";

import BoxRowComponent from "../box-row-component";
import ContactType from "../../../prop-types/ContactType";

function ContactsInformationCard({
  contacts,
  // setSnackBarMessage
}) {
  const [contactPage, setContactPage] = useState(1);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState("");

  const leftButtonClick = () => {
    if (contactPage > 1) {
      const newContactPage = contactPage - 1;
      setContactPage(newContactPage);
      setName(contacts[newContactPage - 1].name);
      setJobTitle(contacts[newContactPage - 1].jobTitle);
      setEmail(contacts[newContactPage - 1].email);
      setPhoneNumber(contacts[newContactPage - 1].phoneNumber);
      setAlternativePhoneNumber(
        contacts[newContactPage - 1].alternatePhoneNumber
      );
    }
  };

  const rightButtonClick = () => {
    if (contactPage < contacts.length) {
      const newContactPage = contactPage + 1;
      setContactPage(newContactPage);
      setName(contacts[newContactPage - 1].name);
      setJobTitle(contacts[newContactPage - 1].jobTitle);
      setEmail(contacts[newContactPage - 1].email);
      setPhoneNumber(contacts[newContactPage - 1].phoneNumber);
      setAlternativePhoneNumber(
        contacts[newContactPage - 1].alternatePhoneNumber
      );
    }
  };

  // const [confirmEditDialog, setConfirmEditDialog] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorObj, setErrorObj] = useState(null);

  useEffect(() => {
    setName(contacts[0] ? contacts[0].name : "");
    setJobTitle(contacts[0] ? contacts[0].jobTitle : "");
    setEmail(contacts[0] ? contacts[0].email : "");
    setPhoneNumber(contacts[0] ? contacts[0].phoneNumber : "");
    setAlternativePhoneNumber(
      contacts[0] ? contacts[0].alternatePhoneNumber : ""
    );
  }, [contacts]);

  const emailWrapper = (contactEmail) => {
    return <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;
  };

  const phoneNumberWrapper = (contactPhone) => {
    return <a href={`tel:${contactPhone}`}>{contactPhone}</a>;
  };
  const alternativePhoneNumberWrapper = (contactAltPhone) => {
    return <a href={`tel:${contactAltPhone}`}>{contactAltPhone}</a>;
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
      {contacts.length > 0 ? (
        <CardContent>
          <BoxRowComponent leftSide="Name" rightSide={name} />
          <BoxRowComponent leftSide="Job Title" rightSide={jobTitle} />
          <BoxRowComponent
            leftSide="Email"
            rightSide={email}
            rightSideWrapper={emailWrapper}
            copyable
          />
          <BoxRowComponent
            leftSide="Phone Number"
            rightSide={phoneNumber}
            rightSideWrapper={phoneNumberWrapper}
          />
          <BoxRowComponent
            leftSide="Alternative Phone Number"
            rightSide={alternativePhoneNumber}
            rightSideWrapper={alternativePhoneNumberWrapper}
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
      ) : (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <img
            src="/noEmployerContacts.svg"
            alt="No Employer Contacts"
            style={{ width: "400px", marginTop: "20px" }}
          />
        </Box>
      )}
    </Card>
  );
}

ContactsInformationCard.propTypes = {
  contacts: ContactType.isRequired,
  // setSnackBarMessage: PropTypes.func.isRequired,
};

export default ContactsInformationCard;
