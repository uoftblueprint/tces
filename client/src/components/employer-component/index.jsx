// import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getEmployer, getEmployerContacts } from "../../utils/api";

import UserType from "../../prop-types/UserType";
import {
  EmployerContainer,
  ArrowContainer,
  MainContainer,
  Divider,
} from "./index.styles";

import EmployerInfoComponent from "./employer-info-component";
import EmployerInformationCard from "./employer-information-card";
import ContactsInformationCard from "./contacts-information-card";
import EmployerJobLeadsCard from "./employer-job-leads-card";

function EmployerComponent({ getUserById, managedUsers, setSnackBarMessage }) {
  const navigate = useNavigate();

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
    <div
      style={{
        marginTop: "20px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          marginRight: "40px",
        }}
      >
        <ArrowContainer>
          <ArrowBackIcon
            onClick={() => {
              navigate("/dashboard");
            }}
            sx={{
              color: "gray",
              marginRight: 2,
              marginLeft: 2,
              marginTop: 1,
              cursor: "pointer",
            }}
          />
        </ArrowContainer>
        <MainContainer>
          <EmployerContainer>
            <EmployerInfoComponent
              employer={employer}
              getUserById={getUserById}
              setSnackBarMessage={setSnackBarMessage}
              managedUsers={managedUsers}
            />

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

            <EmployerJobLeadsCard />
          </EmployerContainer>
        </MainContainer>
      </div>
    </div>
  );
}

EmployerComponent.propTypes = {
  getUserById: PropTypes.func.isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default EmployerComponent;
