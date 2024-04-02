import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ErrorComponent from "../../../shared/error-screen-component";
import LoadingComponent from "../../../shared/loading-screen-component";
import { getFilteredJobLeads } from "../../../../utils/api";
import { formatDateStr } from "../../../../utils/date";

function ManagedJobLeadsLoader({ setManagedJobLeads, children }) {
  const [loading, setLoading] = useState(true);
  const [errorDisplay, setError] = useState(null);

  useEffect(() => {
    const fetchManagedJobLeads = async () => {
      try {
        // fetch all
        const response = await getFilteredJobLeads("");
        if (response.ok) {
          const jobLeadsData = await response.json();

          const formattedJobLeads = jobLeadsData.data.map((jobLead) => ({
            id: jobLead.id,
            jobLeadID: jobLead.id,
            ownerID: jobLead.owner,
            creatorID: jobLead.creator,
            employerID: jobLead.employer,
            jobTitle: jobLead.job_title,
            jobDescription: jobLead.job_description,
            compensationMax: jobLead.compensation_max,
            compensationMin: jobLead.compensation_min,
            hoursPerWeek: jobLead.hours_per_week,
            noc: jobLead.national_occupation_code,
            creationDate: formatDateStr(jobLead.creation_date),
            expirationDate: formatDateStr(jobLead.expiration_date),
            employmentType: jobLead.employment_type,
            numOfPostions: jobLead.num_of_positions,
            clientCount: jobLead.client_count,
          }));
          setManagedJobLeads(formattedJobLeads);
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

    fetchManagedJobLeads();
  }, []);

  if (loading) return <LoadingComponent isLoading={loading} />;
  if (errorDisplay) return <ErrorComponent message={errorDisplay} />;

  return children;
}

ManagedJobLeadsLoader.propTypes = {
  setManagedJobLeads: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default ManagedJobLeadsLoader;
