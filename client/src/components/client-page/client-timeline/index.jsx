import { useState } from "react";
import { Typography, Box, Menu, MenuItem, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadIcon from "@mui/icons-material/Download";
import PropTypes from "prop-types";
import NoteEntryComponent from "../../timeline-create-entry-components/note-entry-component";
import { addClientTimelineEntry } from "../../../utils/api";
import ClientType from "../../../prop-types/ClientType";
import ContactedEntryComponent from "../../timeline-create-entry-components/contacted-entry-component";
import ClientTimelineViewComponent from "../../timeline-window-component/clientWindow";

function ClientTimelineComponent({ client, managedClients }) {
  const [componentType, setComponentType] = useState("default"); // "add-contact" , "add-note"
  const [postEntryLoading, setPostEntryLoading] = useState(false);
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
    try {
      const response = await addClientTimelineEntry(entryObject);

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

  const onAddEntry = async (entryObject) => {
    const clientEntryObject = {
      ...entryObject,
      client: entryObject.object,
    };
    await addEntry(clientEntryObject);
  };

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
          <ClientTimelineViewComponent
            client={client}
            setComponentType={setComponentType}
            externalError={errorObj}
          />
        )}
        {componentType === "add-note" && (
          <NoteEntryComponent
            object={client}
            isLoading={postEntryLoading}
            setComponentType={setComponentType}
            onAddEntry={onAddEntry}
          />
        )}
        {componentType === "add-contact" && (
          <ContactedEntryComponent
            object={client}
            contactType="Client"
            managedObjects={managedClients}
            setComponentType={setComponentType}
            onAddEntry={onAddEntry}
          />
        )}
      </Grid>
    </Box>
  );
}

ClientTimelineComponent.propTypes = {
  client: ClientType.isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
};

export default ClientTimelineComponent;
