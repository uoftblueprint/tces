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
          const formattedEmployers = employersData.data.map((employer) => ({
            employerID: employer.id,
            name: employer.name,
            creatorID: employer.creator,
            ownerID: employer.owner,
            address: employer.address,
            city: employer.city,
            postalCode: employer.postal_code,
            province: employer.province,
            secondaryAddress: employer.secondary_address,
            secondaryCity: employer.secondary_city,
            secondaryPostalCode: employer.secondary_postal_code,
            secondaryProvince: employer.secondary_province,
            dateAdded: employer.date_added,
            email: employer.email,
            fax: employer.fax,
            legalName: employer.legal_name,
            naicsCode: employer.naics_code,
            phoneNumber: employer.phone_number,
            website: employer.website,
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
