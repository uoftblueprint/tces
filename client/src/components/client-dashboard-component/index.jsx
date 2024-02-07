import { Button, Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import FilterCard from "./client-dashboard-filter/FilterCard";
import ClientTable from "./client-dashboard-table/ClientTable";

function ClientDashboardComponent({ clientData }) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  // eslint-disable-next-line
  const [rowCount, setRowCount] = useState(clientData.length);

  const displayedRows = clientData.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ ml: 1 }}>Clients</Typography>
        </Box>
        <Box>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            EXPORT CURRENT FILTER VIEW ({clientData.length} CLIENTS)
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ ml: 2 }}>
            ADD NEW CLIENT
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ width: "25%", minWidth: "250px", padding: "20px" }}>
          <FilterCard />
        </Box>
        <Box sx={{ flexGrow: 1, maxWidth: "75%", padding: "20px" }}>
          <ClientTable
            clientData={displayedRows}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            totalRowCount={rowCount}
          />
        </Box>
      </Box>
    </Box>
  );
}

ClientDashboardComponent.propTypes = {
  // eslint-disable-next-line
  clientData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ClientDashboardComponent;
