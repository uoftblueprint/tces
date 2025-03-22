import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../components/shared/error-screen-component";
import EditJobPostComponent from "../../components/job-postings-dashboard-component/job-postings-dashboard-details";
import JobLeadType from "../../prop-types/JobLeadType";
import UserType from "../../prop-types/UserType";
import ClientType from "../../prop-types/ClientType";
import {  getOneJobPost } from "../../utils/job_posts_api";
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
  const { jobPostID } = useParams();
  const parsedjobLeadID = parseInt(jobPostID,10);

  const [jobPostToEdit, setJobPostToEdit] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    const fetchJobLead = async () => {
      const res = await  getOneJobPost(parsedjobLeadID);
      const json = await res.json();
      if (json.status === "success") {
        const jobPosting = json.jobPost;

        const jobPostBody = {
          id: jobPosting.id,
          jobLeadID: jobPosting.id,
          employerID: jobPosting.employer,
          employerDetails: jobPosting.employer_details,
          jobTitle: jobPosting.job_title,
          jobDescription: jobPosting.job_description,
          compensationMax: jobPosting.rate_of_pay_max,
          compensationMin: jobPosting.rate_of_pay_min,
          hoursPerWeek: jobPosting.hours_per_week,
          creationDate: formatDateStr(jobPosting.creation_date),
          expirationDate: formatDateStr(jobPosting.expiration_date),
          employmentType: jobPosting.employment_type,
          numOfPostions: jobPosting.num_of_positions,
          clientCount: jobPosting.client_count,
          ownerDetails: jobPosting.owner_details,
          creatorDetails: jobPosting.creator_details,
        };

        setJobPostToEdit(jobPostBody);
      } else {
        setError(errorMessage);
      }
    };

    fetchJobLead();
  }, []);

  if (!jobPostToEdit) return <LoadingScreenComponent isLoading />;

  if (error) return <ErrorComponent message={errorMessage} />;
  return (
    <EditJobPostComponent
      managedUsers={managedUsers}
      managedClients={managedClients}
      managedJobLeads={managedJobLeads}
      jobLead={jobPostToEdit}
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
