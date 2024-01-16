import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import JobLeadType from "../../prop-types/JobLeadType";
import { EditContainer } from "./index.styles";
import EditJobLeadHeaderComponent from "./edit-job-lead-header";
import EditJobLeadFormComponent from "./edit-job-lead-form";

function EditJobLeadComponent({
  jobLead,
  getUserById,
  getEmployerById,
  setLocalExitRoute,
  setSnackBarMessage,
}) {
  return (
    <EditContainer>
      <EditJobLeadHeaderComponent
        jobLead={jobLead}
        getUserById={getUserById}
        setLocalExitRoute={setLocalExitRoute}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gridColumnGap: "30px",
          width: "100%",
        }}
      >
        <EditJobLeadFormComponent
          jobLead={jobLead}
          getEmployerById={getEmployerById}
          setSnackBarMessage={setSnackBarMessage}
        />
        <Box
          sx={{
            width: "33%",
            borderRadius: 2,
            boxShadow: 3,
            mr: 9,
            mb: 9,
            p: 3,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Temp Timeline
          </Typography>
        </Box>
      </Box>
    </EditContainer>
  );
}

EditJobLeadComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
  getUserById: PropTypes.func.isRequired,
  getEmployerById: PropTypes.func.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default EditJobLeadComponent;
