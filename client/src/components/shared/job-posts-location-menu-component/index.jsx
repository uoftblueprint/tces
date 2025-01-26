import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Radio,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

function LocationMenu({ locations }) {
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
        style={{
          backgroundColor: "#3568E5",
          color: "white",
          borderColor: "#3568E5",
        }}
        endIcon={
          <span
            style={{
              borderLeft: "1px solid #28449c",
              height: "100%",
              marginLeft: "6px",
              paddingLeft: "16px",
              paddingRight: "6px",
              marginTop: "-6px",
              marginBottom: "-6px",
            }}
          >
            &#9662;
          </span>
        }
      >
        Location
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
        {locations.map((location) => (
          <MenuItem
            key={location.value}
            onClick={(event) => handleSelect(event, location.value)}
          >
            <ListItemIcon>
              <Radio
                checked={selectedValue === location.value}
                value={location.value}
              />
            </ListItemIcon>
            <ListItemText primary={location.label} />
          </MenuItem>
        ))}
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

LocationMenu.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default LocationMenu;
