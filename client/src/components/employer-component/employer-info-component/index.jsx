// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Menu, MenuItem, IconButton, Box } from "@mui/material";

import PropTypes from "prop-types";
import HeaderContainer from "./index.styles";
import EmployerType from "../../../prop-types/EmployerType";
import UserType from "../../../prop-types/UserType";

import UserChipComponent from "../../shared/user-chip-component";
import ChangeOwnerDialog from "../../shared/change-owner-dialog";
import ErrorScreenComponent from "../../shared/error-screen-component";

function EmployerInfoComponent({
  employer,
  getUserById,
  managedUsers,
  setSnackBarMessage,
}) {
  const vertButtonRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  let owner = getUserById(employer.owner);

  let creator = getUserById(employer.creator);

  useEffect(() => {
    owner = getUserById(employer.owner);
    creator = getUserById(employer.creator);
  }, [employer]);

  const handleClick = () => {
    setAnchorEl(vertButtonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [ownerChangeDialog, setOwnerChangeDialog] = React.useState(false);
  const [error, setError] = React.useState(null);

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
      <IconButton
        sx={{
          marginRight: 2,
          marginLeft: 2,
        }}
        onClick={() => {
          navigate("/employers");
        }}
        size="small"
      >
        <ArrowBackIcon
          sx={{
            color: "gray",
            cursor: "pointer",
          }}
        />
      </IconButton>
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
          {employer.name}
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
          Employer
        </Typography>
      </div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon
          sx={{
            color: "gray",
            cursor: "pointer",
          }}
          ref={vertButtonRef}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "split-button",
        }}
        PaperProps={{
          style: {
            width: vertButtonRef ? 190 : null,
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <IconButton>
            <DownloadIcon />
          </IconButton>{" "}
          Export as JSON
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          Delete
        </MenuItem>
      </Menu>

      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          boxShadow: 2,
          p: 3,
          mr: 10,
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
        type="employer"
        entity={employer}
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

EmployerInfoComponent.propTypes = {
  employer: EmployerType.isRequired,
  getUserById: PropTypes.func.isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default EmployerInfoComponent;
