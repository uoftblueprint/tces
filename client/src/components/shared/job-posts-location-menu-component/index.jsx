import { useState } from "react";
import { Button, Menu, MenuItem, Radio, ListItemIcon, ListItemText } from "@mui/material";

function LocationMenu() {
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
            <MenuItem onClick={(event) => handleSelect(event, "all")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "all"}
                        value="all"
                    />
                </ListItemIcon>
                <ListItemText primary="All job locations" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "gta")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "gta"}
                        value="gta"
                    />
                </ListItemIcon>
                <ListItemText primary="Greater Toronto Area" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "spadina-adelaide")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "spadina-adelaide"}
                        value="spadina-adelaide"
                    />
                </ListItemIcon>
                <ListItemText primary="Spadina & Adelaide" />
            </MenuItem>
            <MenuItem onClick={(event) => handleSelect(event, "spadina-lakeshore")}>
                <ListItemIcon>
                    <Radio
                        checked={selectedValue === "spadina-lakeshore"}
                        value="spadina-lakeshore"
                    />
                </ListItemIcon>
                <ListItemText primary="Spadina & Lakeshore" />
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

export default LocationMenu;