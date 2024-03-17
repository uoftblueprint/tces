import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ErrorComponent from "../../../shared/error-screen-component";
import LoadingComponent from "../../../shared/loading-screen-component";
import { getFilteredClients } from "../../../../utils/api";
import { formatDateStr } from "../../../../utils/date";
import { cleanStatusString } from "../../../../utils/users";

function ClientsLoader({ setClients, children }) {
  const [loading, setLoading] = useState(true);
  const [errorDisplay, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getFilteredClients();
        if (response.ok) {
          const clientsData = await response.json();
          const formattedClients = clientsData.data.rows.map((client) => ({
            id: client.id,
            ownerID: client.owner,
            creatorID: client.creator,
            name: client.name,
            phone: client.phone_number,
            email: client.email,
            dateUpdated: formatDateStr(client.date_updated),
            dateAdded: formatDateStr(client.date_added),
            dateClosed: formatDateStr(client.closure_date),
            status: cleanStatusString(client.status),
            statusAt3Months: cleanStatusString(client.status_at_3_months),
            statusAt6Months: cleanStatusString(client.status_at_6_months),
            statusAt9Months: cleanStatusString(client.status_at_9_months),
            statusAt12Months: cleanStatusString(client.status_at_12_months),
            statusAtExit: cleanStatusString(client.status_at_exit),
          }));
          setClients(formattedClients);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Fetch failed.");
        }
      } catch (error) {
        setError("An error occurred: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <LoadingComponent isLoading={loading} />;
  if (errorDisplay) return <ErrorComponent message={errorDisplay} />;

  return children;
}

ClientsLoader.propTypes = {
  setClients: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default ClientsLoader;
