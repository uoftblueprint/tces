import { useState } from "react";
import { Typography, Box, Menu, MenuItem, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadIcon from "@mui/icons-material/Download";
import PropTypes from "prop-types";
import JobLeadType from "../../../prop-types/JobLeadType";
import NoteEntryComponent from "../../timeline-create-entry-components/note-entry-component";
import PlacedEntryComponent from "../../timeline-create-entry-components/placed-entry-component";
import { addEmployerTimelineEntry } from "../../../utils/api";
import ClientType from "../../../prop-types/ClientType";
import ContactedEntryComponent from "../../timeline-create-entry-components/contacted-entry-component";
import EmployerType from "../../../prop-types/EmployerType";
import EmployerTimelineViewComponent from "../../timeline-window-component/empWindow";
import ManagedJobLeadsLoader from "../../wrappers/data-loaders-wrappers/ManagedJobLeadsLoader";
import ClientsLoader from "../../wrappers/data-loaders-wrappers/ClientsLoader";
import EmployersLoader from "../../wrappers/data-loaders-wrappers/EmployersLoader";

function EmployerTimelineComponent({
  employer,
  managedJobLeads,
  managedClients,
  managedEmployers,
  setManagedClients,
  setManagedEmployers,
  setManagedJobLeads,
}) {
  const [componentType, setComponentType] = useState("default"); // "add-note" , "add-placement", "add-contact"
  const [postEntryLoading, setPostEntryLoading] = useState(true);
  const [errorObj, setErrorObj] = useState(null);
  const [anchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorElDots, setAnchorElDots] = useState(null);
  const openDots = Boolean(anchorElDots);

  const handleCloseDots = () => {
    setAnchorElDots(null);
  };

  const handleClickDots = (event) => {
    setAnchorElDots(event.currentTarget);
  };

  const addEntry = async (entryObject) => {
    setPostEntryLoading(true);
    const employerEntryObject = {
      ...entryObject,
      employer: entryObject.object,
    };
    try {
      const response = await addEmployerTimelineEntry(employerEntryObject);

      if (response.ok) {
        setComponentType("default");
      } else {
        setErrorObj(response);
      }
    } catch (error) {
      setErrorObj(error);
    } finally {
      setPostEntryLoading(false);
    }
  };

  const onAddEntry = (entryObject) => {
    addEntry(entryObject);
  };

  const filterJobLeadsByEmployer = new URLSearchParams({
    employer: employer.id,
  });

  return (
    <Box
      sx={{
        width: "33%",
        borderRadius: 2,
        boxShadow: 3,
        mr: 9,
        mb: 9,
        border: "1px solid #e0e0e0",
      }}
    >
      <Grid container direction="column" spacing={0} sx={{ m: 0, p: 0 }}>
        <Grid container direction="row" sx={{ pt: 3, mb: 2 }}>
          <Grid item xs={11}>
            <Typography variant="h5" align="left" sx={{ pl: 3 }}>
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
              <MoreVertIcon
                sx={{
                  fontSize: "1rem",
                }}
              />
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
        {componentType === "default" && (
          <EmployerTimelineViewComponent
            employer={employer}
            setComponentType={setComponentType}
            externalError={errorObj}
          />
        )}
        {componentType === "add-note" && (
          <NoteEntryComponent
            object={employer}
            isLoading={postEntryLoading}
            setComponentType={setComponentType}
            onAddEntry={onAddEntry}
          />
        )}
        {componentType === "add-placement" && (
          <ManagedJobLeadsLoader
            customQueryParams={filterJobLeadsByEmployer.toString()}
            setManagedJobLeads={setManagedJobLeads}
          >
            <ClientsLoader setClients={setManagedClients}>
              <PlacedEntryComponent
                employer={employer}
                isLoading={postEntryLoading}
                setComponentType={setComponentType}
                managedJobLeads={managedJobLeads}
                managedClients={managedClients}
                onAddEntry={onAddEntry}
              />
            </ClientsLoader>
          </ManagedJobLeadsLoader>
        )}
        {componentType === "add-contact" && (
          <ManagedJobLeadsLoader setManagedJobLeads={setManagedJobLeads}>
            <ClientsLoader setClients={setManagedClients}>
              <EmployersLoader setEmployers={setManagedEmployers}>
                <ContactedEntryComponent
                  object={employer}
                  contactType="Employer"
                  managedObjects={managedEmployers}
                  setComponentType={setComponentType}
                  onAddEntry={onAddEntry}
                />
              </EmployersLoader>
            </ClientsLoader>
          </ManagedJobLeadsLoader>
        )}
      </Grid>
    </Box>
  );
}

EmployerTimelineComponent.propTypes = {
  employer: EmployerType.isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  managedEmployers: PropTypes.arrayOf(EmployerType).isRequired,
  setManagedClients: PropTypes.func.isRequired,
  setManagedJobLeads: PropTypes.func.isRequired,
  setManagedEmployers: PropTypes.func.isRequired,
};

export default EmployerTimelineComponent;
