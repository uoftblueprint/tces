import PropTypes from "prop-types";
import { Box } from "@mui/material";
import JobLeadType from "../../prop-types/JobLeadType";
import { EditContainer } from "./index.styles";
import EditJobLeadHeaderComponent from "./edit-job-lead-header";
import EditJobLeadFormComponent from "./edit-job-lead-form";
import EditJobLeadTimelineComponent from "./edit-job-lead-timeline";
import UserType from "../../prop-types/UserType";
import ClientType from "../../prop-types/ClientType";

function EditJobLeadComponent({
  managedUsers,
  managedJobLeads,
  managedClients,
  jobLead,
  getUserById,
  getEmployerById,
  setLocalExitRoute,
  setSnackBarMessage,
}) {
  return (
    <EditContainer>
      <EditJobLeadHeaderComponent
        managedUsers={managedUsers}
        jobLead={jobLead}
        getUserById={getUserById}
        setLocalExitRoute={setLocalExitRoute}
        setSnackBarMessage={setSnackBarMessage}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gridColumnGap: "30px",
          width: "100%",
          maxHeight: "100vh",
        }}
      >
        <EditJobLeadFormComponent
          jobLead={jobLead}
          getEmployerById={getEmployerById}
          setSnackBarMessage={setSnackBarMessage}
        />
        <EditJobLeadTimelineComponent
          jobLead={jobLead}
          managedJobLeads={managedJobLeads}
          managedClients={managedClients}
        />
      </Box>
    </EditContainer>
  );
}

EditJobLeadComponent.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  jobLead: JobLeadType.isRequired,
  getUserById: PropTypes.func.isRequired,
  getEmployerById: PropTypes.func.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default EditJobLeadComponent;
