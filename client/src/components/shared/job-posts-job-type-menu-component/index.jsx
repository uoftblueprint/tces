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

function JobTypeMenu({ onSelectJobType }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState(""); // Default to all job types
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  const handleApply = () => {
    onSelectJobType(selectedValue); // Send selected job type to parent
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="job-type-button"
        aria-controls={open ? "job-type-menu" : undefined}
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
        Job Type
      </Button>
      <Menu
        id="job-type-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "job-type-button",
        }}
      >
        {[
          { value: "", label: "All Job Types" },
          { value: "Full-time", label: "Full-time" },
          { value: "Part-time", label: "Part-time" },
          { value: "Permanent", label: "Permanent" },
          { value: "Contract", label: "Contract" },
          { value: "Seasonal", label: "Seasonal" },
          { value: "Freelance", label: "Freelance" },
          { value: "Internship", label: "Internship" },
        ].map((jobType) => (
          <MenuItem
            key={jobType.value}
            onClick={() => handleSelect(jobType.value)}
          >
            <ListItemIcon>
              <Radio
                checked={selectedValue === jobType.value}
                value={jobType.value}
              />
            </ListItemIcon>
            <ListItemText primary={jobType.label} />
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

JobTypeMenu.propTypes = {
  onSelectJobType: PropTypes.func.isRequired,
};

export default JobTypeMenu;
