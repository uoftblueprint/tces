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
import PropTypes from "prop-types";
import { Divider } from "../index.styles";

import BoxRowComponent from "../box-row-component";
import ContactType from "../../../prop-types/ContactType";
import ConfirmDialog from "../../shared/confirm-dialog-component";
import FormSubmissionErrorDialog from "../../shared/form-submission-error-dialog";
import EmployerType from "../../../prop-types/EmployerType";
import {
  createEmployerContacts,
  modifyEmployerContactInfo,
} from "../../../utils/api";
import ErrorComponent from "../../shared/error-screen-component";

function ContactsInformationCard({ employer, contacts, setSnackBarMessage }) {
  const [contactPage, setContactPage] = useState(1);
  const [errorObj, setErrorObj] = useState(null);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState("");
  const [editable, setEditable] = useState(false);
  const [addable, setAddable] = useState(false);

  const [confirmEditDialog, setConfirmEditDialog] = useState(false);
  const [formSubmissionErrorDialog, setFormSubmissionErrorDialog] =
    useState(false);
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

  const returnToForm = () => {
    setFormSubmissionErrorDialog(false);
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

  const handleAdd = async () => {
    setIsLoading(true);
    setConfirmAddDialog(false);

    const newAddContact = {
      name,
      email,
      job_type: jobTitle,
      phone_number: phoneNumber,
      alt_phone_number: alternativePhoneNumber,
      employer: employer.id,
    };

    try {
      const response = await createEmployerContacts(newAddContact);

      const jsonBody = await response.json();

      if (!response.ok) {
        setErrorObj(response);
      } else {
        const contact = jsonBody.data.employer_contact;

        contacts.push({
          id: contact.id,
          name: contact.name,
          jobTitle: contact.job_type,
          email: contact.email,
          phoneNumber: contact.phone_number,
          alternatePhoneNumber: contact.alt_phone_number,
        });
      }
    } catch (error) {
      setErrorObj(error);
    } finally {
      setAddable(false);
      setContactPage(contacts.length);
      setIsLoading(false);
    }
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

    const contactId = contacts[contactPage - 1].id;

    const modifiedContact = {
      id: contactId,
      name,
      email,
      job_type: jobTitle,
      phone_number: phoneNumber,
      alt_phone_number: alternativePhoneNumber,
      employer: employer.id,
    };

    try {
      const response = await modifyEmployerContactInfo(modifiedContact);

      if (response.ok) {
        setSnackBarMessage("Contact updated successfully.");
        setEditable(false);
      } else {
        setFormSubmissionErrorDialog(true);
        setSnackBarMessage("Failed to update contact.");
      }
    } catch (error) {
      setErrorObj(error);
      setSnackBarMessage("An error occurred.");
    } finally {
      setIsLoading(false);
      setConfirmEditDialog(false);
    }

    setIsLoading(false);
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
        contacts[newContactPage - 1].alternatePhoneNumber,
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
        contacts[newContactPage - 1].alternatePhoneNumber,
      );
    }
  };

  useEffect(() => {
    setName(contacts[0] ? contacts[0].name : "");
    setJobTitle(contacts[0] ? contacts[0].jobTitle : "");
    setEmail(contacts[0] ? contacts[0].email : "");
    setPhoneNumber(contacts[0] ? contacts[0].phoneNumber : "");
    setAlternativePhoneNumber(
      contacts[0] ? contacts[0].alternatePhoneNumber : "",
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

  if (errorObj) return <ErrorComponent message={errorObj.message} />;

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
          Contacts
        </Typography>
        <div className="iconContainer">
          <IconButton onClick={toggleEditable}>
            <EditIcon
              sx={{
                color: editable ? "#3568E5" : "gray",
                cursor: "pointer",
                align: "center",
              }}
            />
          </IconButton>
          <IconButton onClick={toggleAddable}>
            <AddIcon
              sx={{
                color: addable ? "#3568E5" : "gray",
                cursor: "pointer",
                align: "center",
              }}
            />
          </IconButton>
        </div>
      </CardContent>
      <Divider />
      {contacts.length > 0 || addable ? (
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
              isPhoneNumber
            />
            <BoxRowComponent
              leftSide="Alternative Phone Number"
              rightSide={alternativePhoneNumber}
              rightSideWrapper={alternativePhoneNumberWrapper}
              editable={editable || addable}
              setRightSide={setAlternativePhoneNumber}
              required={false}
              isPhoneNumber
            />
            {!editable && !addable ? (
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
            ) : (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}

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
      <FormSubmissionErrorDialog
        open={formSubmissionErrorDialog}
        onBack={returnToForm}
      />
    </Card>
  );
}

ContactsInformationCard.propTypes = {
  employer: EmployerType.isRequired,
  contacts: ContactType.isRequired,
  // setContacts: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default ContactsInformationCard;
