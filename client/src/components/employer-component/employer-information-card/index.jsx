import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { Divider } from "../index.styles";

import BoxRowComponent from "../box-row-component";

import EmployerType from "../../../prop-types/EmployerType";
import ConfirmDialog from "../../shared/confirm-dialog-component";
import { modifyEmployerInfo } from "../../../utils/api";
import ErrorScreenComponent from "../../shared/error-screen-component";

function EmployerInformationCard({ employer, setSnackBarMessage }) {
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

  const [confirmEditDialog, setConfirmEditDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorObj, setErrorObj] = useState(null);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const phoneNumberWrapper = (phoneNumber) => {
    return <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>;
  };

  const faxWrapper = (fax) => {
    return <a href={`tel:${fax}`}>{fax}</a>;
  };

  const emailWrapper = (email) => {
    return <a href={`mailto:${email}`}>{email}</a>;
  };

  const websiteWrapper = (website) => {
    return <a href={website}>{website}</a>;
  };

  const commitEdit = (e) => {
    e.preventDefault();
    setConfirmEditDialog(true);
  };

  const cancelEdit = () => {
    setConfirmEditDialog(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const modifiedEmployerInfo = {
      id: employer.id,
      name: employerName,
      phone_number: employerPhoneNumber,
      fax: employerFax,
      email: employerEmail,
      website: employerWebsite,
      naics_code: employerNAICSCode,
      address: employerAddress,
    };

    try {
      const response = await modifyEmployerInfo(modifiedEmployerInfo);
      console.warn(employer);
      console.warn(response);
      if (response.ok) {
        setSnackBarMessage("Job lead updated successfully.");
        setEditable(false);
      } else {
        setSnackBarMessage("Failed to update job lead.");
      }
    } catch (error) {
      setErrorObj(error);
      setSnackBarMessage("An error occurred.");
    } finally {
      setIsLoading(false);
      setConfirmEditDialog(false);
    }
  };

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

  if (errorObj) return <ErrorScreenComponent message={errorObj.message} />;

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
        <IconButton onClick={toggleEditable}>
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
        <form onSubmit={commitEdit}>
          <BoxRowComponent
            leftSide="Name"
            rightSide={employerName}
            editable={editable}
            setRightSide={setEmployerName}
          />

          <BoxRowComponent
            leftSide="Phone Number"
            rightSideWrapper={phoneNumberWrapper}
            rightSide={employerPhoneNumber}
            setRightSide={setEmployerPhoneNumber}
            editable={editable}
          />
          <BoxRowComponent
            leftSide="Fax"
            rightSideWrapper={faxWrapper}
            rightSide={employerFax}
            setRightSide={setEmployerFax}
            editable={editable}
          />
          <BoxRowComponent
            leftSide="Email"
            rightSideWrapper={emailWrapper}
            rightSide={employerEmail}
            setRightSide={setEmployerEmail}
            editable={editable}
            copyable
          />
          <BoxRowComponent
            leftSide="Website"
            rightSideWrapper={websiteWrapper}
            rightSide={employerWebsite}
            setRightSide={setEmployerWebsite}
            editable={editable}
          />
          <BoxRowComponent
            leftSide="NAICS Code"
            rightSide={employerNAICSCode}
            setRightSide={setEmployerNAICSCode}
            editable={editable}
          />
          <BoxRowComponent
            leftSide="Address"
            rightSide={employerAddress}
            setRightSide={setEmployerAddress}
            editable={editable}
          />

          {editable && (
            <Grid container justifyContent="flex-end">
              <Grid item>
                {editable && (
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

          {editable ? (
            <ConfirmDialog
              open={confirmEditDialog}
              title="Confirm Edit"
              message="Are you sure you want to save these changes?"
              onConfirm={handleSubmit}
              onCancel={cancelEdit}
            />
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

EmployerInformationCard.propTypes = {
  employer: EmployerType.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default EmployerInformationCard;
