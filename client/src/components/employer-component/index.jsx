// import * as React from "react";

import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getEmployer, getEmployerContacts } from "../../utils/api";

import UserType from "../../prop-types/UserType";
import { EmployerContainer, MainContainer } from "./index.styles";

import EmployerInfoComponent from "./employer-info-component";
import EmployerInformationCard from "./employer-information-card";
import ContactsInformationCard from "./contacts-information-card";
import EmployerTimelineComponent from "./employer-timeline";
import EmployerType from "../../prop-types/EmployerType";
import JobLeadType from "../../prop-types/JobLeadType";
import ClientType from "../../prop-types/ClientType";
import LoadingComponent from "../shared/loading-screen-component";

function EmployerComponent({
  getUserById,
  managedUsers,
  setSnackBarMessage,
  managedJobLeads,
  managedClients,
  managedEmployers,
  setManagedEmployers,
  setManagedJobLeads,
  setManagedClients,
}) {
  // default, this gets overriden once the useEffect() finishes. to avoid a not available error.
  const [employer, setEmployer] = useState(null);
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
      const queryParams = {
        employer: employerID,
      };
      const queryString = new URLSearchParams(queryParams).toString();
      const res = await getEmployerContacts(queryString);

      const json = await res.json();
      if (json.status === "success") {
        const { data } = json;

        const processedContacts = data.map((contact) => ({
          id: contact.id,
          name: contact.name,
          jobTitle: contact.job_type,
          email: contact.email,
          phoneNumber: contact.phone_number,
          alternatePhoneNumber: contact.alt_phone_number,
        }));

        await setContacts(processedContacts);
      }
    };

    updateEmployer();
    updateContacts();
  }, []);

  if (employer === null || contacts === null) {
    return <LoadingComponent isLoading />;
  }

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
              alignItems: "flex-start",
            }}
          >
            <EmployerInformationCard
              employer={employer}
              setSnackBarMessage={setSnackBarMessage}
            />

            <ContactsInformationCard
              employer={employer}
              contacts={contacts}
              setContacts={setContacts}
              setSnackBarMessage={setSnackBarMessage}
            />

            <EmployerTimelineComponent
              employer={employer}
              managedJobLeads={managedJobLeads}
              managedClients={managedClients}
              managedEmployers={managedEmployers}
              setManagedEmployers={setManagedEmployers}
              setManagedClients={setManagedClients}
              setManagedJobLeads={setManagedJobLeads}
            />
          </Box>
        </EmployerContainer>
      </MainContainer>
    </>
  );
}

EmployerComponent.propTypes = {
  getUserById: PropTypes.func.isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  managedEmployers: PropTypes.arrayOf(EmployerType).isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  setManagedClients: PropTypes.func.isRequired,
  setManagedJobLeads: PropTypes.func.isRequired,
  setManagedEmployers: PropTypes.func.isRequired,
};

export default EmployerComponent;
