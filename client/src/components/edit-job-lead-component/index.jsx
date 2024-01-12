import * as React from "react";
import JobLeadType from "../../prop-types/JobLeadType";
import { EditContainer } from "./index.styles";
import EditJobLeadHeaderComponent from "./edit-job-lead-header";

function EditJobLeadComponent({ jobLead }) {
  const [isEditMode] = React.useState(false);
  console.log(isEditMode);
  console.log(jobLead);
  return (
    <EditContainer>
      <EditJobLeadHeaderComponent jobLead={jobLead} />
    </EditContainer>
  );
}

EditJobLeadComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
  // eslint-disable-next-line
};

export default EditJobLeadComponent;
