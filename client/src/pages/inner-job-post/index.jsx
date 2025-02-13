import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ErrorComponent from "../../components/shared/error-screen-component";
import EditJobPostComponent from "../../components/job-postings-dashboard-component/job-postings-dashboard-details";
import JobLeadType from "../../prop-types/JobLeadType";
import UserType from "../../prop-types/UserType";
import ClientType from "../../prop-types/ClientType";
import {  getJobPostInner } from "../../utils/job_posts_api";
import LoadingScreenComponent from "../../components/shared/loading-screen-component";
import { formatDateStr } from "../../utils/date";

function InnerJobPost({
  managedJobLeads,
  managedUsers,
  managedClients,
  getUserById,
  setLocalExitRoute,
  setSnackBarMessage,
  setManagedClients,
  setManagedJobLeads,
}) {
  const errorMessage = "Job Post not found.";
  const parsedjobLeadID = 70;

  const [jobLeadToEdit, setJobLeadToEdit] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    const fetchJobLead = async () => {
      const res = await  getJobPostInner(parsedjobLeadID);
      const json = await res.json();
      if (json.status === "success") {
        const jobLead = json.jobPost;

        const jobLeadBody = {
          id: jobLead.id,
          jobLeadID: jobLead.id,
          ownerID: jobLead.owner,
          creatorID: jobLead.creator,
          employerID: jobLead.employer,
          employerDetails: jobLead.employer_details,
          jobTitle: jobLead.job_title,
          jobDescription: jobLead.job_description,
          compensationMax: jobLead.rate_of_pay_max,
          compensationMin: jobLead.rate_of_pay_min,
          hoursPerWeek: jobLead.hours_per_week,
          noc: jobLead.national_occupation_code,
          creationDate: formatDateStr(jobLead.creation_date),
          expirationDate: formatDateStr(jobLead.expiration_date),
          employmentType: jobLead.employment_type,
          numOfPostions: jobLead.num_of_positions,
          clientCount: jobLead.client_count,
          ownerDetails: jobLead.owner_details,
          creatorDetails: jobLead.creator_details,
        };

        setJobLeadToEdit(jobLeadBody);
      } else {
        setError(errorMessage);
      }
    };

    fetchJobLead();
  }, []);

  if (!jobLeadToEdit) return <LoadingScreenComponent isLoading />;

  if (error) return <ErrorComponent message={errorMessage} />;
  return (
    <EditJobPostComponent
      managedUsers={managedUsers}
      managedClients={managedClients}
      managedJobLeads={managedJobLeads}
      jobLead={jobLeadToEdit}
      getUserById={getUserById}
      setLocalExitRoute={setLocalExitRoute}
      setSnackBarMessage={setSnackBarMessage}
      setManagedJobLeads={setManagedJobLeads}
      setManagedClients={setManagedClients}
    />
  );
}

InnerJobPost.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  getUserById: PropTypes.func.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  setManagedClients: PropTypes.func.isRequired,
  setManagedJobLeads: PropTypes.func.isRequired,
};

export default InnerJobPost;
