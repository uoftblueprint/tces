import { useState, useRef } from "react";
import {useNavigate} from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Grid,
  ButtonGroup,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import UserType from "../../../prop-types/UserType";

function DashboardHeaderComponent({ currUser }) {
  const navigate = useNavigate();
  const buttonGroupRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(buttonGroupRef.current);
  };

  const handleClose = (route) => {
    setAnchorEl(null);
    navigate(route);
  };
  return (
    <Box my={4}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" gutterBottom align="left">
            {"Welcome Back, "} {currUser.firstName}!
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            Start a search, add a new entry using the button or browse through
            the timelines.
          </Typography>
        </Grid>
        <Grid item>
          <Grid item>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="split button"
              ref={buttonGroupRef}
            >
              <Button startIcon={<AddIcon />}>Add New Entry</Button>
              <Button onClick={handleClick}>
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "split-button",
              }}
              PaperProps={{
                style: {
                  width: buttonGroupRef
                    ? buttonGroupRef.current?.clientWidth
                    : null,
                },
              }}
            >
              <MenuItem onClick={() => handleClose("/employers")} sx={{ justifyContent: "center" }}>
                Add New Employer
              </MenuItem>
              <MenuItem onClick={() => handleClose("/job-leads")} sx={{ justifyContent: "center" }}>
                Add New Job Lead
              </MenuItem>
              <MenuItem onClick={() => handleClose("/clients")} sx={{ justifyContent: "center" }}>
                Add New Client
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

DashboardHeaderComponent.propTypes = {
  currUser: UserType.isRequired,
};

export default DashboardHeaderComponent;
