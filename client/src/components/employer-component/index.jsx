// import * as React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getEmployer, getEmployerContacts } from "../../utils/api";

import UserType from "../../prop-types/UserType";
import { EmployerContainer, MainContainer, Divider } from "./index.styles";

import EmployerInfoComponent from "./employer-info-component";
import EmployerInformationCard from "./employer-information-card";
import ContactsInformationCard from "./contacts-information-card";

function EmployerComponent({ getUserById, managedUsers, setSnackBarMessage }) {
  // default, this gets overriden once the useEffect() finishes. to avoid a not available error.
  const [employer, setEmployer] = useState({ owner: 1, creator: 1 });
  const [contacts, setContacts] = useState({});

  const { employerID } = useParams();

  useEffect(() => {
    const updateEmployer = async () => {
      const res = await getEmployer(employerID);
      const json = await res.json();
      if (json.status === "success") {
        const data = json.data.employer;

        await setEmployer(data);
      }
    };

    const updateContacts = async () => {
      const res = await getEmployerContacts(employerID);

      await setContacts(res);
    };

    updateEmployer();
    updateContacts();
  }, []);

  return (
    <>
      <EmployerInfoComponent
        employer={employer}
        getUserById={getUserById}
        setSnackBarMessage={setSnackBarMessage}
        managedUsers={managedUsers}
      />

      <MainContainer style={{ display: "flex" }}>
        <EmployerContainer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gridColumnGap: "30px",
              marginTop: "10px",
              width: "100%",
            }}
          >
            <EmployerInformationCard
              employer={employer}
              setSnackBarMessage={setSnackBarMessage}
            />

            <ContactsInformationCard
              contacts={contacts}
              setSnackBarMessage={setSnackBarMessage}
            />

            <Card style={{ width: "33%" }}>
              <CardContent>
                <Typography variant="h5" align="left" gutterBottom>
                  Activity Timeline (placeholder)
                </Typography>
              </CardContent>
              <Divider />
              <CardContent>
                <Typography sx={{ mb: 0.5 }} color="text.secondary">
                  Placeholder
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </EmployerContainer>
      </MainContainer>
    </>
  );
}

EmployerComponent.propTypes = {
  getUserById: PropTypes.func.isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default EmployerComponent;
