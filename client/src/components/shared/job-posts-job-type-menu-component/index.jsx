import { useState } from "react";
import { Button, Menu, MenuItem, Radio, ListItemIcon, ListItemText } from "@mui/material";

function JobTypeMenu() {
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
            style={{ backgroundColor: "#3568E5", color: "white", borderColor: "#3568E5" }}
            endIcon={
                <span style={{ borderLeft: "1px solid #28449c", height: "100%", marginLeft: "6px", paddingLeft: "16px", paddingRight: "6px", marginTop: "-6px", marginBottom: "-6px" }}>&#9662;</span>
            }
        >
            Job Type
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
            <MenuItem onClick={(event) => handleSelect(event, "all")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "all"}
                        value="all"
                    />
                </ListItemIcon>
                <ListItemText primary="All job types" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "full-time")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "full-time"}
                        value="full-time"
                    />
                </ListItemIcon>
                <ListItemText primary="Full-time" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "part-time")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "part-time"}
                        value="part-time"
                    />
                </ListItemIcon>
                <ListItemText primary="Part-time" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "permanent")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "permanent"}
                        value="permanent"
                    />
                </ListItemIcon>
                <ListItemText primary="Permanent" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "contract")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "contract"}
                        value="contract"
                    />
                </ListItemIcon>
                <ListItemText primary="Contract" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "seasonal")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "seasonal"}
                        value="seasonal"
                    />
                </ListItemIcon>
                <ListItemText primary="Seasonal" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "freelance")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "freelance"}
                        value="freelance"
                    />
                </ListItemIcon>
                <ListItemText primary="Freelance" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "internship")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "internship"}
                        value="internship"
                    />
                </ListItemIcon>
                <ListItemText primary="Internship" />
            </MenuItem>
            <MenuItem style={{ justifyContent: "right"}}>
                <Button onClick={handleApply} variant="contained" color="primary" style={{ width: "auto", borderRadius: "12px"}}>
                    Apply
                </Button>
            </MenuItem>
        </Menu>
    </div>
);
}

export default JobTypeMenu;