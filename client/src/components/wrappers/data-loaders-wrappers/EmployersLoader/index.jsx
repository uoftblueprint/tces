import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ErrorComponent from "../../../shared/error-screen-component";
import LoadingComponent from "../../../shared/loading-screen-component";
import { getAllEmployers } from "../../../../utils/api";

function EmployersLoader({ setEmployers, children }) {
  const [loading, setLoading] = useState(true);
  const [errorDisplay, setError] = useState(null);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await getAllEmployers();
        if (response.ok) {
          const employersData = await response.json();

          // this was set up to get data for job leads (will populate rest of attributes in future ticket) but this will suffice for now
          const formattedEmployers = employersData.data.map((employer) => ({
            employerID: employer.id,
            name: employer.name,
          }));
          setEmployers(formattedEmployers);
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

    fetchEmployers();
  }, []);

  if (loading) return <LoadingComponent isLoading={loading} />;
  if (errorDisplay) return <ErrorComponent message={errorDisplay} />;

  return children;
}

EmployersLoader.propTypes = {
  setEmployers: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default EmployersLoader;
