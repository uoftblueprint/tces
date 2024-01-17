// eslint-disable-next-line no-unused-vars
import * as React from "react";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";
import { HeaderContainer } from "../index.styles";
import JobLeadType from "../../../prop-types/JobLeadType";
import UserType from "../../../prop-types/UserType";

import UserChipComponent from "../../shared/user-chip-component";
import ChangeOwnerDialog from "../../shared/change-owner-dialog";
import ErrorScreenComponent from "../../shared/error-screen-component";

function EditJobLeadHeaderComponent({
  managedUsers,
  jobLead,
  getUserById,
  setLocalExitRoute,
  setSnackBarMessage,
}) {
  const [ownerChangeDialog, setOwnerChangeDialog] = React.useState(false);
  const [error, setError] = React.useState(null);
  const owner = getUserById(jobLead.ownerID);
  const creator = getUserById(jobLead.creatorID);
  const handleBackClick = () => {
    setLocalExitRoute("/job-leads/");
  };

  const onEditOwnerClick = () => {
    setOwnerChangeDialog(true);
  };

  const onOwnerChangeConfirm = () => {
    setOwnerChangeDialog(false);
  };

  const onChangeOwnerCancel = () => {
    setOwnerChangeDialog(false);
  };

  if (error) return <ErrorScreenComponent message={error} />;

  return (
    <HeaderContainer>
      <ArrowBackIcon
        onClick={handleBackClick}
        sx={{
          color: "gray",
          marginRight: 2,
          marginLeft: 2,
          cursor: "pointer",
        }}
      />

      <div>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "34px",
            fontWeight: 500,
            lineHeight: "42px",
            letterSpacing: "0.25px",
            textAlign: "left",
          }}
        >
          {jobLead.jobTitle}
        </Typography>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "0.15px",
            textAlign: "left",
          }}
        >
          Job Listing
        </Typography>
      </div>

      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          boxShadow: 2,
          p: 3,
          mr: 6.5,
        }}
      >
        <Box sx={{ textAlign: "center", mr: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Owner
          </Typography>
          <UserChipComponent user={owner} onClick={onEditOwnerClick} edit />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Creator
          </Typography>
          <UserChipComponent user={creator} />
        </Box>
      </Box>
      <ChangeOwnerDialog
        type="job-lead"
        entity={jobLead}
        currOwner={owner}
        onCancel={onChangeOwnerCancel}
        onConfirm={onOwnerChangeConfirm}
        open={ownerChangeDialog}
        users={managedUsers}
        setSnackBarMessage={setSnackBarMessage}
        setError={setError}
      />
    </HeaderContainer>
  );
}

EditJobLeadHeaderComponent.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  jobLead: JobLeadType.isRequired,
  getUserById: PropTypes.func.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default EditJobLeadHeaderComponent;
