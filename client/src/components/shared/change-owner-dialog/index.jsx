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
import EmployerType from "../../../prop-types/EmployerType";
import JobLeadType from "../../../prop-types/JobLeadType";
import UserType from "../../../prop-types/UserType";
import { getUserByIdHelper } from "../../../utils/users";
import { modifyJobLead } from "../../../utils/api";

function ChangeOwnerDialog({
  jobLead,
  currEntity,
  owners,
  open,
  onCancel,
  onConfirm,
  setSnackBarMessage,
  redirect,
}) {
  const navigate = useNavigate();
  const [owner, setOwner] = React.useState(currEntity.userID);
  const getDisplayUserName = (userID) => {
    const user = getUserByIdHelper(owners, userID);
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
  };
  const handleInputChange = (e) => {
    setOwner(e.target.value);
  };

  const handleSubmit = async () => {
    const modifiedJobLead = {
      jobLeadID: jobLead.jobLeadID,
      owner,
    };

    try {
      const response = await modifyJobLead(modifiedJobLead);
      if (response.ok) {
        setSnackBarMessage("Job lead updated successfully.");
      } else {
        setSnackBarMessage("Failed to update job lead.");
      }
    } catch (error) {
      setSnackBarMessage("An error occurred.");
    } finally {
      onConfirm();
      navigate(0);
      navigate(redirect);
    }
  };

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
          <InputLabel id={`nameLabel-${currEntity.id}`}>Owner Name</InputLabel>
          <Select
            sx={{ textAlign: "left" }}
            labelId={`nameLabel-${currEntity.id}`}
            id={`owner-${currEntity.id}`}
            value={owner}
            label="Owner Name"
            onChange={handleInputChange}
            required
          >
            {owners.map((currOwner) => (
              <MenuItem key={currOwner.userID} value={currOwner.userID}>
                {getDisplayUserName(currOwner.userID)}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>*Required</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

ChangeOwnerDialog.propTypes = {
  jobLead: JobLeadType.isRequired,
  currEntity: PropTypes.arrayOf(EmployerType || JobLeadType || UserType)
    .isRequired, // any entity that has EmployerID
  owners: PropTypes.arrayOf(UserType).isRequired,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
  // eslint-disable-next-line
};

export default ChangeOwnerDialog;
