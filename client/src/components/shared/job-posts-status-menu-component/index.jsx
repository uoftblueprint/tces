import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Menu,
  MenuItem,
  Radio,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function StatusMenu({ applyStatus }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState("ascending");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleApply = () => {
    applyStatus(selectedValue);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="sort-button"
        aria-controls={open ? "sort-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        endIcon={
          <span
            style={{
              borderLeft: "1px solid #90bce4",
              height: "100%",
              marginLeft: "6px",
              paddingLeft: "14px",
              paddingRight: "6px",
              marginTop: "-6px",
              marginBottom: "-6px",
            }}
          >
            &#9662;
          </span>
        }
        sx={{ borderRadius: "8px" }}
      >
        Status
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "sort-button",
        }}
      >
        <MenuItem onClick={(event) => handleSelect(event, "inactive")}>
          <ListItemIcon>
            <Radio checked={selectedValue === "inactive"} value="inactive" />
          </ListItemIcon>
          <ListItemText primary="Inactive" />
        </MenuItem>
        <MenuItem onClick={(event) => handleSelect(event, "draft")}>
          <ListItemIcon>
            <Radio checked={selectedValue === "draft"} value="draft" />
          </ListItemIcon>
          <ListItemText primary="Draft" />
        </MenuItem>
        <MenuItem onClick={(event) => handleSelect(event, "active")}>
          <ListItemIcon>
            <Radio checked={selectedValue === "active"} value="active" />
          </ListItemIcon>
          <ListItemText primary="Active" />
        </MenuItem>
        <MenuItem style={{ justifyContent: "right" }}>
          <Button
            onClick={handleApply}
            variant="contained"
            color="primary"
            style={{ width: "auto", borderRadius: "12px" }}
          >
            Apply
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

StatusMenu.propTypes = {
  applyStatus: PropTypes.func.isRequired,
};

export default StatusMenu;
