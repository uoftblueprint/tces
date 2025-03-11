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

function SortMenu({ applySort }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState("desc"); // Default to descending
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (direction) => {
    setSelectedDirection(direction);
  };

  const handleApply = () => {
    // Now sends correct sortConfig with key: "close_date"
    console.log("TEST")
    applySort({ key: "close_date", direction: selectedDirection });
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
        startIcon={
          <img
            src="/img/sortIcon.svg"
            alt="sort icon"
            style={{ width: 20, height: 20 }}
          />
        }
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
      >
        Sort
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
        <MenuItem onClick={() => handleSelect("asc")}>
          <ListItemIcon>
            <Radio checked={selectedDirection === "asc"} value="asc" />
          </ListItemIcon>
          <ListItemText primary="Close date: Ascending" />
        </MenuItem>
        <MenuItem onClick={() => handleSelect("desc")}>
          <ListItemIcon>
            <Radio checked={selectedDirection === "desc"} value="desc" />
          </ListItemIcon>
          <ListItemText primary="Close date: Descending" />
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

SortMenu.propTypes = {
  applySort: PropTypes.func.isRequired,
};

export default SortMenu;
