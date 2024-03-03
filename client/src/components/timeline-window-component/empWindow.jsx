import { useState, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Card,
  CardContent,
  Box,
  Tab,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Timeline() {
  const [value, setValue] = useState("1");
  const buttonGroupRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElDots, setAnchorElDots] = useState(null);
  const open = Boolean(anchorEl);
  const openDots = Boolean(anchorElDots);

  const handleClickDots = (event) => {
    setAnchorElDots(event.currentTarget);
  };

  const handleClick = () => {
    setAnchorEl(buttonGroupRef.current);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDots = () => {
    setAnchorElDots(null);
  };

  return (
    <Card style={{ width: "500px" }}>
      <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={11}>
            <Typography variant="h5" align="left">
              Activity Timeline
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClickDots}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElDots}
              open={openDots}
              onClose={handleCloseDots}
              MenuListProps={{
                "aria-labelledby": "split-button",
              }}
            >
              <MenuItem
                onClick={handleCloseDots}
                sx={{ justifyContent: "center" }}
              >
                <DownloadIcon sx={{ color: "grey", paddingRight: "10px" }} />
                Export as JSON
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>

      <CardContent>
        <ButtonGroup
          variant="contained"
          style={{ width: "100%", borderRadius: "8px" }}
          aria-label="split button"
          ref={buttonGroupRef}
          sx={{ "& .MuiButtonBase-root": { backgroundColor: "#3568E5" } }}
        >
          <Button
            fullWidth
            startIcon={<AddIcon />}
            sx={{ backgroundColor: "#3568E5" }}
          >
            Add New Entry
          </Button>
          <Button onClick={handleClick}>
            <ArrowDropDownIcon />
          </Button>
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
            <MenuItem onClick={handleClose} sx={{ justifyContent: "center" }}>
              Contacted Employer
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ justifyContent: "center" }}>
              Placed Job Seeker
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ justifyContent: "center" }}>
              Other Note
            </MenuItem>
          </Menu>
        </ButtonGroup>

        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            sx={{
              "& .MuiTabs-flexContainer": {
                display: "flex",
                justifyContent: "center",
                width: "100%",
              },
              "& .MuiButtonBase-root": { padding: 0 },
            }}
          >
            <Tab label="ALL" value="1" />
            <Tab label="CONTACTED" value="2" />
            <Tab label="JOBS" value="3" />
            <Tab label="PLACEMENTS" value="4" />
            <Tab label="NOTES" value="5" />
          </TabList>

          <Divider />
          <TabPanel value="1">ALL</TabPanel>
          <TabPanel value="2">CONTACTED</TabPanel>
          <TabPanel value="3">JOBS</TabPanel>
          <TabPanel value="4">PLACEMENTS</TabPanel>
          <TabPanel value="5">NOTES</TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
}
