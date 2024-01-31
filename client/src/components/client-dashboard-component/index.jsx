import { Button, Box } from "@mui/material";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
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
  const [rowCount, setRowCount] = useState(clientData.length)

  const displayedRows = clientData.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ width: "25%", minWidth: "250px", margin: "28px", mt: 18 }}>
        <FilterCard />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "75%",
          marginTop: "55px",
          marginRight: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            marginBottom: "55px",
          }}
        >
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            EXPORT CURRENT FILTER VIEW ({clientData.length} CLIENTS)
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            ADD NEW CLIENT
          </Button>
        </Box>
        <ClientTable
          clientData={displayedRows}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          totalRowCount={rowCount}
        />
      </Box>
    </Box>
  );
}

ClientDashboardComponent.propTypes = {
  // eslint-disable-next-line
  clientData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ClientDashboardComponent;
