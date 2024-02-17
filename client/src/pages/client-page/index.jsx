import * as React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Client from "../../components/client-page";
import ErrorComponent from "../../components/shared/error-screen-component";
import LoadingScreenComponent from "../../components/shared/loading-screen-component";
import { fetchClientById } from "../../utils/api";
import UserType from "../../prop-types/UserType";
import { capitalizeFirstLetter } from "../../utils/users";
// import { getUserByIdHelper } from "../../utils/users";

// const [managedUsers, setManagedUsers] = React.useState([]);

function ClientPage({ managedUsers, getUserById, setSnackBarMessage }) {
  const [clientLoaded, setClientLoaded] = React.useState(false);
  const [clientObject, setClientObject] = React.useState(null);

  const { clientID } = useParams();
  const parsedClientID = parseInt(clientID, 10);

  const today = new Date();
  today.setMonth(today.getMonth() - 3);
  const threeMonthsAgo = today.toLocaleDateString("en-US");
  const closureDate = new Date(threeMonthsAgo);
  const currentDate = new Date();
  const timeDifference = currentDate - closureDate;
  const monthsSinceClosure = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24 * 30.44),
  );

  const [errorDisplay, setError] = useState(null);

  useEffect(() => {
    const getClientById = async () => {
      try {
        // fetch all
        const response = await fetchClientById(parsedClientID);
        if (response.ok) {
          const clientData = await response.json();
          const initialClientInfo = {
            clientID: clientData.data.client.id,
            firstName: clientData.data.client.name,
            email: clientData.data.client.email,
            phone: clientData.data.client.phone_number,
            status: capitalizeFirstLetter(clientData.data.client.status),
            status_at_exit: clientData.data.client.status_at_exit,
            status_at_3: clientData.data.client.status_at_3_months,
            status_at_6: clientData.data.client.status_at_6_months,
            status_at_9: clientData.data.client.status_at_9_months,
            status_at_12: clientData.data.client.status_at_12_months,
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
          monthsSinceClosure={monthsSinceClosure}
          managedUsers={managedUsers}
          getUserById={getUserById}
          setSnackBarMessage={setSnackBarMessage}
        />
      )}
    </LoadingScreenComponent>
  );
}

ClientPage.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  getUserById: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default ClientPage;
