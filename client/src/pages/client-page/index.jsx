import * as React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Client from "../../components/client-page";
import ErrorComponent from "../../components/shared/error-screen-component";
import LoadingScreenComponent from "../../components/shared/loading-screen-component";
import { fetchClientById } from "../../utils/api";
import UserType from "../../prop-types/UserType";
import { cleanStatusString } from "../../utils/users";
import { formatDateStr, monthsSince } from "../../utils/date";
import ClientType from "../../prop-types/ClientType";
// import { getUserByIdHelper } from "../../utils/users";

// const [managedUsers, setManagedUsers] = React.useState([]);

function ClientPage({
  managedUsers,
  getUserById,
  setSnackBarMessage,
  managedClients,
}) {
  const [clientLoaded, setClientLoaded] = React.useState(false);
  const [clientObject, setClientObject] = React.useState(null);

  const { clientID } = useParams();
  const parsedClientID = parseInt(clientID, 10);

  const [errorDisplay, setError] = useState(null);

  useEffect(() => {
    const getClientById = async () => {
      try {
        // fetch all
        const response = await fetchClientById(parsedClientID);
        if (response.ok) {
          const clientData = await response.json();
          const initialClientInfo = {
            id: clientData.data.client.id,
            clientID: clientData.data.client.id,
            name: clientData.data.client.name,
            firstName: clientData.data.client.name,
            email: clientData.data.client.email,
            phone: clientData.data.client.phone_number,
            closure_date: formatDateStr(clientData.data.client.closure_date),
            status: cleanStatusString(clientData.data.client.status),
            time_since_closure: monthsSince(
              clientData.data.client.closure_date,
            ),
            status_at_exit: cleanStatusString(
              clientData.data.client.status_at_exit,
            ),
            status_at_3: cleanStatusString(
              clientData.data.client.status_at_3_months,
            ),
            status_at_6: cleanStatusString(
              clientData.data.client.status_at_6_months,
            ),
            status_at_9: cleanStatusString(
              clientData.data.client.status_at_9_months,
            ),
            status_at_12: cleanStatusString(
              clientData.data.client.status_at_12_months,
            ),
            owner: clientData.data.client.owner,
            creator: clientData.data.client.creator,
          };
          setClientObject(initialClientInfo);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Fetch failed.");
        }
      } catch (error) {
        setError("An error occurred: ", error.message);
      } finally {
        setClientLoaded(true);
      }
    };

    getClientById();
  }, []);

  if (errorDisplay) return <ErrorComponent message={errorDisplay} />;

  return (
    <LoadingScreenComponent isLoading={!clientLoaded}>
      {clientObject != null && (
        <Client
          clientInfo={clientObject}
          monthsSinceClosure={clientObject.time_since_closure}
          managedUsers={managedUsers}
          managedClients={managedClients}
          getUserById={getUserById}
          setSnackBarMessage={setSnackBarMessage}
        />
      )}
    </LoadingScreenComponent>
  );
}

ClientPage.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  getUserById: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default ClientPage;
