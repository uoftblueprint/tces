import { Button, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FilterCard from "./FilterCard";
import ClientTable from "./ClientTable";

function ClientTableComponent() {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* Sidebar / Filter Card */}
      <Box sx={{ width: "25%", minWidth: "250px", margin: "28px" }}>
        <FilterCard />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "75%",
          marginTop: "55px",
          marginRight: "50px",
        }}
      >
        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            marginBottom: "55px",
          }}
        >
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            EXPORT CURRENT FILTER VIEW (103 CLIENTS)
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            ADD NEW CLIENT
          </Button>
        </Box>

        {/* Client Table */}
        <ClientTable />
      </Box>
    </Box>
  );
}

export default ClientTableComponent;
