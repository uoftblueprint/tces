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

function LocationMenu({ locations, onSelectLocation }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState("all");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (value) => {
    setSelectedValue(value);
  };
  const handleApply = () => {
    console.log("Applying location filter:", selectedValue);
    console.log(locations)

    onSelectLocation(selectedValue);
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
        <MenuItem onClick={() => handleSelect(null)}>
          <ListItemIcon>
            <Radio checked={selectedValue === null} value={null} />
          </ListItemIcon>
          <ListItemText primary="All Locations" />
        </MenuItem>
        {locations.map((location) => (
          <MenuItem key={location} onClick={() => handleSelect(location)}>
            <ListItemIcon>
              <Radio checked={selectedValue === location} value={location} />
            </ListItemIcon>
            <ListItemText primary={location} />
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
    })
  ).isRequired,
  onSelectLocation: PropTypes.func.isRequired,
};

export default LocationMenu;
