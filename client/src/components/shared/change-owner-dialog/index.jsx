import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import JobLeadType from "../../../prop-types/JobLeadType";
import UserType from "../../../prop-types/UserType";
import EmployerType from "../../../prop-types/EmployerType";
import {
  getInitialsAndDisplayName,
  getUserByIdHelper,
} from "../../../utils/users";
import { modifyClient, modifyEmployerInfo, modifyJobLead } from "../../../utils/api";

function ChangeOwnerDialog({
  type,
  entity,
  currOwner,
  users,
  open,
  onCancel,
  onConfirm,
  setSnackBarMessage,
  setError,
}) {
  const navigate = useNavigate();
  const [owner, setOwner] = React.useState(currOwner.userID);
  const [isLoading, setIsLoading] = React.useState(false);
  const getDisplayUserName = (userID) => {
    const user = getUserByIdHelper(users, userID);
    const { fullName } = getInitialsAndDisplayName(user);
    return fullName;
  };
  const handleInputChange = (e) => {
    setOwner(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let redirectUrl = "";
    try {
      let modifiedEntity;
      let response;

      if (type === "job-lead") {
        modifiedEntity = {
          jobLeadID: entity.jobLeadID,
          owner,
        };
        redirectUrl = "/job-leads/";
        response = await modifyJobLead(modifiedEntity);
      }

      if (type === "employer") {
        modifiedEntity = {
          id: entity.id,
          owner,
        };
        redirectUrl = "/employers/";
        response = await modifyEmployerInfo(modifiedEntity);
      }

      if (type === "client") {
        modifiedEntity = {
          clientID: entity.clientID,
          owner,
        };
        response = await modifyClient(modifiedEntity);
        redirectUrl = "/clients/";
      }

      if (response.ok) {
        setSnackBarMessage("Owner updated successfully.");
      } else {
        setSnackBarMessage("Failed to update owner.");
        setError(response);
      }
    } catch (error) {
      setSnackBarMessage("An error occurred.");
      setError(error);
    } finally {
      onConfirm();
      navigate(redirectUrl);
    }
  };

  React.useEffect(() => {
    setOwner(currOwner.userID);
  }, [currOwner]);

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        component: "form",
        onSubmit: (e) => {
          e.preventDefault();
          handleSubmit();
        },
      }}
    >
      <DialogTitle>Change Owner</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ m: 1, width: "300px" }}>
          <InputLabel id={`nameLabel-${currOwner.userID}`}>
            Owner Name
          </InputLabel>
          <Select
            sx={{ textAlign: "left" }}
            labelId={`nameLabel-${currOwner.id}`}
            id={`owner-${currOwner.id}`}
            value={owner}
            label="Owner Name"
            onChange={handleInputChange}
            required
          >
            {users.map((user) => (
              <MenuItem key={user.userID} value={user.userID}>
                {getDisplayUserName(user.userID)}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>*Required</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? `Confirming` : `Confirm`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChangeOwnerDialog.propTypes = {
  type: ("job-lead" || "client" || "employer").isRequired,
  entity: (JobLeadType || EmployerType).isRequired, // add ClientType when it's implemented
  currOwner: UserType.isRequired, // any entity that has EmployerID
  users: PropTypes.arrayOf(UserType).isRequired,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default ChangeOwnerDialog;
