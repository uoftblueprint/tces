import { useRef, useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
  Grid,
  Tab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import JobLeadType from "../../prop-types/JobLeadType";
import {
  SearchField,
  SearchFieldContainer,
} from "../dashboard-component/index.styles";
import JobLeadTimelineEntriesComponent from "../edit-job-lead-component/edit-job-lead-timeline/job-lead-timeline-entries";

function EditJobLeadTimelineViewComponent({
  jobLead,
  setComponentType,
  externalError,
}) {
  const navigate = useNavigate();
  const buttonGroupRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subTab, setSubTab] = useState("all");
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [globalSearchQuery, setGlobalSearchQuery] = useState(localSearchQuery);

  const handleClick = () => {
    setIsMenuOpen(true);
  };

  const handleClose = (route) => {
    setIsMenuOpen(false);
    if (route) {
      navigate(route);
    }
  };

  const handleSubTabChange = (event, newTab) => {
    setSubTab(newTab);
  };

  const invokeSearch = () => {
    setGlobalSearchQuery(localSearchQuery);
  };

  return (
    <>
      <Grid item sx={{ pl: 3, pr: 3, width: "100%" }}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="split button"
          ref={buttonGroupRef}
          sx={{ mb: 2, width: "100%" }}
        >
          <Button
            startIcon={<AddIcon />}
            onClick={handleClick}
            sx={{ flexGrow: 1 }}
          >
            Add New Entry
          </Button>
          <Button onClick={handleClick}>
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Menu
          anchorEl={buttonGroupRef.current}
          open={isMenuOpen}
          onClose={() => handleClose(undefined)}
          MenuListProps={{
            "aria-labelledby": "split-button",
          }}
          PaperProps={{
            style: {
              width: buttonGroupRef
                ? buttonGroupRef.current?.clientWidth
                : undefined,
            },
          }}
        >
          <MenuItem
            onClick={() => setComponentType("add-placement")}
            sx={{ justifyContent: "center" }}
          >
            Add New Placement
          </MenuItem>
          <MenuItem
            onClick={() => setComponentType("add-note")}
            sx={{ justifyContent: "center" }}
          >
            Add New Note
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <TabContext value={subTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleSubTabChange}>
              <Tab label="All" value="all" />
              <Tab label="Placements" value="placements" />
              <Tab label="Notes" value="notes" />
            </TabList>
          </Box>
          <TabPanel value="all" sx={{ p: 0, height: "60vh" }}>
            <JobLeadTimelineEntriesComponent
              jobLead={jobLead}
              globalSearchQuery={globalSearchQuery}
              type="all"
              externalError={externalError}
            />
          </TabPanel>
          <TabPanel value="placements" sx={{ p: 0, height: "60vh" }}>
            <JobLeadTimelineEntriesComponent
              globalSearchQuery={globalSearchQuery}
              jobLead={jobLead}
              type="placement"
            />
          </TabPanel>
          <TabPanel value="notes" sx={{ p: 0, height: "60vh" }}>
            <JobLeadTimelineEntriesComponent
              jobLead={jobLead}
              type="note"
              globalSearchQuery={globalSearchQuery}
            />
          </TabPanel>
        </TabContext>
      </Grid>
      <Grid item>
        <SearchFieldContainer>
          <SearchField
            fullWidth
            placeholder="Search..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            variant="outlined"
            sx={{
              mt: 0,
              mb: 2,
              borderRadius: 0,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={invokeSearch}
                    aria-label="search"
                    edge="start"
                    sx={{
                      m: 0,
                      p: 0,
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setLocalSearchQuery("");
                      setGlobalSearchQuery("");
                    }}
                    aria-label="reset search"
                    edge="end"
                    sx={{
                      m: 0,
                      p: 0,
                      visibility: localSearchQuery ? "visible" : "hidden",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </SearchFieldContainer>
      </Grid>
    </>
  );
}

EditJobLeadTimelineViewComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
  setComponentType: PropTypes.func.isRequired,
  externalError: PropTypes.string.isRequired,
};

export default EditJobLeadTimelineViewComponent;
