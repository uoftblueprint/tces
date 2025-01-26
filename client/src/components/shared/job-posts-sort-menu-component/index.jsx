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
  const [selectedValue, setSelectedValue] = useState("ascending");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleApply = () => {
    applySort(selectedValue);
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
        <MenuItem onClick={(event) => handleSelect(event, "ascending")}>
          <ListItemIcon>
            <Radio checked={selectedValue === "ascending"} value="ascending" />
          </ListItemIcon>
          <ListItemText primary="Close date: Ascending" />
        </MenuItem>
        <MenuItem onClick={(event) => handleSelect(event, "descending")}>
          <ListItemIcon>
            <Radio
              checked={selectedValue === "descending"}
              value="descending"
            />
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
