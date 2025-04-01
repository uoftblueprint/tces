import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Menu,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

function SortMenu({ applySort, intialState }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState(intialState);

  const open = Boolean(anchorEl);
  const options = [
    {
      label: "Application date: Ascending",
      value: "asc",
    },
    {
      label: "Application date: Descending",
      value: "desc",
    },
  ];

  const handleClick = (e) => {
    setSelectedValue(intialState);
    setAnchorEl(e.currentTarget);
  };
  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
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
        startIcon={<FilterListIcon />}
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
      >
        <MenuItem
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            "&:hover": { backgroundColor: "transparent" },
          }}
          disableRipple
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="application-date-sort"
              onChange={handleSelect}
              value={selectedValue}
            >
              {options.map((option) => {
                return (
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    sx={{ marginRight: "4px" }}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <Button
            onClick={handleApply}
            variant="contained"
            color="primary"
            sx={{
              alignSelf: "end",
              width: "auto",
              borderRadius: "12px",
            }}
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
  intialState: PropTypes.bool.isRequired,
};

export default SortMenu;
