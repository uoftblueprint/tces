import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Grid,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useEffect, useState } from "react";

// import PropTypes from "prop-types";
import { Divider } from "../index.styles";

import BoxRowComponent from "../box-row-component";
import ContactType from "../../../prop-types/ContactType";
import ConfirmDialog from "../../shared/confirm-dialog-component";

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
  const [editable, setEditable] = useState(false);
  const [addable, setAddable] = useState(false);

  const [confirmEditDialog, setConfirmEditDialog] = useState(false);
  const [confirmAddDialog, setConfirmAddDialog] = useState(false);
  const [confirmCancelEditDialog, setConfirmCancelEditDialog] = useState(false);
  const [confirmCancelAddDialog, setConfirmCancelAddDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // const [errorObj, setErrorObj] = useState(null);

  const toggleEditable = () => {
    if (editable) {
      setConfirmCancelEditDialog(true);
      return;
    }

    setAddable(false);
    setEditable(!editable);
  };

  const toggleAddable = () => {
    if (addable) {
      setConfirmCancelAddDialog(true);
      return;
    }

    setName("");
    setJobTitle("");
    setEmail("");
    setPhoneNumber("");
    setAlternativePhoneNumber("");

    setEditable(false);
    setAddable(!addable);
  };

  const commitEdit = (e) => {
    e.preventDefault();
    if (editable) {
      setConfirmEditDialog(true);
    }
    if (addable) {
      setConfirmAddDialog(true);
    }
  };

  const cancelEdit = () => {
    setConfirmEditDialog(false);
  };

  const cancelEditUnsaved = () => {
    setConfirmCancelEditDialog(false);
  };

  const handleConfirmCancel = () => {
    setConfirmCancelEditDialog(false);
    setEditable(false);
    const newContactPage = contactPage - 1;
    setName(contacts[newContactPage].name);
    setJobTitle(contacts[newContactPage].jobTitle);
    setEmail(contacts[newContactPage].email);
    setPhoneNumber(contacts[newContactPage].phoneNumber);
    setAlternativePhoneNumber(contacts[newContactPage].alternatePhoneNumber);
  };

  const handleAdd = () => {
    setConfirmAddDialog(false);
    // push a new contact locally
    contacts.push({
      name,
      jobTitle,
      email,
      phoneNumber,
      alternativePhoneNumber,
    });

    // here, we would call the API to also save the contact on db

    setAddable(false);
    setContactPage(contacts.length);
    setIsLoading(false);
  };

  const cancelAdd = () => {
    setConfirmCancelAddDialog(false);
    setAddable(false);
    const newContactPage = contactPage - 1;
    setName(contacts[newContactPage].name);
    setJobTitle(contacts[newContactPage].jobTitle);
    setEmail(contacts[newContactPage].email);
    setPhoneNumber(contacts[newContactPage].phoneNumber);
    setAlternativePhoneNumber(contacts[newContactPage].alternatePhoneNumber);
  };

  const closeAdd = () => {
    setConfirmCancelAddDialog(false);
  };

  const cancelAddClose = () => {
    setConfirmCancelAddDialog(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    // const modifiedEmployerInfo = {
    //   id: employer.id,
    //   name: employerName,
    //   phone_number: employerPhoneNumber,
    //   fax: employerFax,
    //   email: employerEmail,
    //   website: employerWebsite,
    //   naics_code: employerNAICSCode,
    //   address: employerAddress,
    // };

    // try {
    //   const response = await modifyEmployerInfo(modifiedEmployerInfo);
    //   console.warn(employer);
    //   console.warn(response);
    //   if (response.ok) {
    //     setSnackBarMessage("Job lead updated successfully.");
    //     setEditable(false);
    //   } else {
    //     setSnackBarMessage("Failed to update job lead.");
    //   }
    // } catch (error) {
    //   setErrorObj(error);
    //   setSnackBarMessage("An error occurred.");
    // } finally {
    //   setIsLoading(false);
    //   setConfirmEditDialog(false);
    // }
  };

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
          <IconButton onClick={toggleEditable}>
            <EditIcon
              sx={{
                color: "gray",
                cursor: "pointer",
                align: "center",
              }}
            />
          </IconButton>
          <IconButton onClick={toggleAddable}>
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
          <form onSubmit={commitEdit}>
            <BoxRowComponent
              leftSide="Name"
              rightSide={name}
              editable={editable || addable}
              setRightSide={setName}
            />
            <BoxRowComponent
              leftSide="Job Title"
              rightSide={jobTitle}
              editable={editable || addable}
              setRightSide={setJobTitle}
            />
            <BoxRowComponent
              leftSide="Email"
              rightSide={email}
              rightSideWrapper={emailWrapper}
              editable={editable || addable}
              setRightSide={setEmail}
              copyable
            />
            <BoxRowComponent
              leftSide="Phone Number"
              rightSide={phoneNumber}
              rightSideWrapper={phoneNumberWrapper}
              setRightSide={setPhoneNumber}
              editable={editable || addable}
            />
            <BoxRowComponent
              leftSide="Alternative Phone Number"
              rightSide={alternativePhoneNumber}
              rightSideWrapper={alternativePhoneNumberWrapper}
              editable={editable || addable}
              setRightSide={setAlternativePhoneNumber}
              required={false}
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

            {(editable || addable) && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  {(editable || addable) && (
                    <Button
                      type="submit"
                      variant="text"
                      color="primary"
                      size="small"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  )}
                </Grid>
              </Grid>
            )}

            {editable || addable ? (
              <>
                <ConfirmDialog
                  open={confirmCancelAddDialog}
                  title="Confirm Cancel Add"
                  message="Are you sure you want to stop adding a new contact? Unsaved changes will be lost."
                  onConfirm={cancelAdd}
                  onCancel={cancelAddClose}
                />

                <ConfirmDialog
                  open={confirmAddDialog}
                  title="Confirm Add"
                  message="Are you sure you want to save these changes?"
                  onConfirm={handleAdd}
                  onCancel={closeAdd}
                />

                <ConfirmDialog
                  open={confirmCancelEditDialog}
                  title="Confirm Cancel Edit"
                  message="Are you sure you want to stop editing? Unsaved changes will be lost."
                  onConfirm={handleConfirmCancel}
                  onCancel={cancelEditUnsaved}
                />

                <ConfirmDialog
                  open={confirmEditDialog}
                  title="Confirm Edit"
                  message="Are you sure you want to save these changes?"
                  onConfirm={handleSubmit}
                  onCancel={cancelEdit}
                />
              </>
            ) : (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
          </form>
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
