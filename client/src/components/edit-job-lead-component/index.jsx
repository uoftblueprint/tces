import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import JobLeadType from "../../prop-types/JobLeadType";
import { EditContainer } from "./index.styles";
import EditJobLeadHeaderComponent from "./edit-job-lead-header";
import EditJobLeadFormComponent from "./edit-job-lead-form";
import EmployerType from "../../prop-types/EmployerType";

function EditJobLeadComponent({
  jobLead,
  getUserById,
  getEmployerById,
  employers,
}) {
  return (
    <EditContainer>
      <EditJobLeadHeaderComponent jobLead={jobLead} getUserById={getUserById} />
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
          employers={employers}
        />
      </Box>
    </EditContainer>
  );
}

EditJobLeadComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
  getUserById: PropTypes.func.isRequired,
  getEmployerById: PropTypes.func.isRequired,
  employers: PropTypes.arrayOf(EmployerType).isRequired,
  // eslint-disable-next-line
};

export default EditJobLeadComponent;
